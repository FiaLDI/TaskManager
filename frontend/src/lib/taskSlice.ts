import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { description, DescriptionItem, task } from '@/types/task'
import { taskService } from './taskService'
import type { WritableDraft } from 'immer';


interface initialStateType {
  tasks: task[],
  stage: 'idle' | 'add',
  open: string | null;
  preCreateTask: description[];
  form?: {number: string, name: string, id: string};
  search?: string;
}

const initialState: initialStateType = {
  tasks: [],
  stage: 'idle',
  open: null,
  preCreateTask: []
}


const taskReducer = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setStage: (state, action) => {
      state.stage = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setOpen: (state, action) => {
      state.open = action.payload
    },
    resetPre: (state) => {
      state.preCreateTask = []
    },
    setForm: (state, action) => {
      state.form = action.payload
    },
    addPreCreateTask: (state, action) => {
      state.preCreateTask.push(action.payload);
    },
    addItemPreCreateTask: (
      state, 
      action: PayloadAction<{ id: string; updates: string | DescriptionItem }>
    ) => {
      const pretask = state.preCreateTask.find(t => t.id === action.payload.id);

      if (!pretask) return;

      if (pretask.type === 'examples') {
        // updates должен быть DescriptionItem
        if (typeof action.payload.updates !== 'string') {
          (pretask.items as DescriptionItem[]).push(action.payload.updates);
        }
      } else {
        // updates должен быть string
        if (typeof action.payload.updates === 'string') {
          (pretask.items as string[]).push(action.payload.updates);
        }
      }
    },
    removePreCreateTask: (state, action) => {
      state.preCreateTask = state.preCreateTask.filter(val => val != action.payload);
    },
    removePreCreateTaskItem: (
      state,
      action: PayloadAction<{
        id: string;
        order: number;
      }>
    ) => {
      const task = state.preCreateTask.find(t => t.id === action.payload.id);
      if (!task || !Array.isArray(task.items)) return;

      task.items.splice(action.payload.order, 1);
    },
    setPreCreateTask: (state, action) => {
      state.preCreateTask = action.payload
    },
   changePreCreateTaskOrder: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      if (
        from < 0 || from >= state.preCreateTask.length ||
        to < 0 || to >= state.preCreateTask.length ||
        from === to
      ) return;

      const [moved] = state.preCreateTask.splice(from, 1);
      state.preCreateTask.splice(to, 0, moved);
    },

    removePreItem: (state, action) => {
      state.preCreateTask = state.preCreateTask.filter(val => val.id != action.payload)
    },

    updatePreDescriptionItems: (state, action: PayloadAction<{
      id: string;
      order: number;
      item: string | DescriptionItem;
    }>) => {
      const task = state.preCreateTask.find(t => t.id === action.payload.id);

      if (!task) return;

      // если не "examples", предполагаем string[]
      if (task.type !== "examples") {
        if (typeof action.payload.item === "string") {
          (task.items as string[])[action.payload.order] = action.payload.item;
        }
      } else {
        // если examples, предполагаем DescriptionItem[]
        const items = task.items as DescriptionItem[];
        const item = action.payload.item as DescriptionItem;

        // Заменяем весь объект
        items[action.payload.order] = item;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        taskService.endpoints.getTasks.matchFulfilled,
        (state, action) => {
          // ✅ action.payload is task[]
          console.log(action.payload)
          state.tasks = action.payload
        }
      )
      .addMatcher(
        taskService.endpoints.addTask.matchFulfilled,
        (state, action) => {
          // ✅ action.payload is task
          state.tasks.push(action.payload)
        }
      )
      .addMatcher(
        taskService.endpoints.removeTask.matchFulfilled,
        (state, action) => {
          state.tasks = state.tasks.filter(task => task.id !== action.payload)
        }
      )



  }
})

export const { 
  setOpen, 
  setForm,
  setSearch,
  setStage,
  addPreCreateTask,
  addItemPreCreateTask,
  updatePreDescriptionItems,
  changePreCreateTaskOrder,
  removePreCreateTaskItem,
  removePreItem,
  resetPre,
  removePreCreateTask,
  setPreCreateTask
} = taskReducer.actions
export default taskReducer.reducer

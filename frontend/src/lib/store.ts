// lib/store.ts
import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './taskSlice'
import { taskService } from './taskService'

export const store = configureStore({
  reducer: {
    task: taskReducer,
    [taskService.reducerPath]: taskService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat(
            taskService.middleware,
        ),
})

// 🔹 Добавляем типы:
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

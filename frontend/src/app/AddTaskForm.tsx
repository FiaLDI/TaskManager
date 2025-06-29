// app/AddTaskForm.tsx
'use client'

import CreateTask from "@/components/layout/CreateTask";
import Button from "@/components/ui/Button"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useAddTaskMutation, useEditTaskMutation, useLazyGetTasksQuery } from "@/lib/taskService";
import { addPreCreateTask, resetPre, setStage } from "@/lib/taskSlice";
import { description } from "@/types/task";
import { useEffect, useRef, useState } from "react"

export default function AddTaskForm() {
    const [open, setOpen] = useState(false);
    const [counter, setCounter] = useState(0);
    const formStore = useAppSelector(s => s.task.form)
    const [formData, setFormData] = useState<{
        id?: string,
        number: string,
        name: string,
        description: description[];
    }>({
        number: "",
        name: "",
        description: []
    });
    const [addtask] = useAddTaskMutation();
    const [edittask] = useEditTaskMutation();
    const [getTaks] = useLazyGetTasksQuery();

    const preCreate = useAppSelector(s => s.task.preCreateTask)

    const wrapperRef = useRef<HTMLUListElement>(null);
    const dispatch = useAppDispatch();

    useEffect(()=> {
        if (formStore) {
            setFormData({...formData, ...formStore})
        }
    }, [formStore])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setOpen(false);
                dispatch(resetPre())
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        }, []);


    const handleCreate = (event: React.MouseEvent<HTMLButtonElement>, type: string) => {
        event.preventDefault();
        event.stopPropagation();

        if (type == 'examples') {
            dispatch(addPreCreateTask({id: counter, type: type, items: [{input: '', output: '', description: ''}] }))
        } else {
            dispatch(addPreCreateTask({id: counter, type: type, items: [''] }))
        }
        
        setCounter(prev => prev += 1)

        setOpen(false);
    }

    const handleSubmit = async () => {
        try {
            if (formData.id) {
                await edittask({...formData, description: preCreate}).unwrap();
            } else {
                await addtask({...formData, description: preCreate}).unwrap();
            }

            dispatch(resetPre());
            dispatch(setStage("idle"));
            getTaks({ len: 10, skip: 0 });
        } catch (error) {
            console.error("Ошибка при сохранении задачи:", error);
        }
    };


    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'number') {
        // Проверка: только цифры (можно ввести пустую строку, чтобы позволить удаление)
        if (/^\d*$/.test(value)) {
            setFormData({ ...formData, [name]: value });
        }
    } else {
        setFormData({ ...formData, [name]: value });
    }
}


  return (
    <form className="flex flex-col max-h-svw p-5 bg-neutral-800 "  >
        <div className="flex gap-5">
            <input type="text" placeholder="Number" name='number' value={formData.number} onChange={(e) => {inputHandler(e)}} className="w-25 box-border outline-0 p-3 bg-neutral-900 "/>
            <input type="text" placeholder="Name" name='name' value={formData.name}  onChange={(e) => {inputHandler(e)}} className="w-full box-border outline-0 p-3 bg-neutral-900" />
        </div>

        
        <div className=" relative pt-5 pb-5">
            Choose item
            <input type="text" onFocus={()=>setOpen(true)} className="w-full box-border outline-0 p-3 bg-neutral-900 " value={"Text"} readOnly/>
            {open &&
                <ul ref={wrapperRef} className=" absolute w-full top-12 z-10" >
                    <li className="w-full p-3 bg-neutral-900"><button onClick={(e) => handleCreate(e, "text")} className=" cursor-pointer w-full h-full text-left">Text</button></li>
                    <li className="w-full p-3 bg-neutral-900"><button onClick={(e) => handleCreate(e, "examples")} className=" cursor-pointer w-full h-full text-left">Examples</button></li>
                    <li className="w-full p-3 bg-neutral-900"><button onClick={(e) => handleCreate(e, "list")} className=" cursor-pointer w-full h-full text-left">List</button></li>
                    <li className="w-full p-3 bg-neutral-900"><button onClick={(e) => handleCreate(e, "image")} className=" cursor-pointer w-full h-full text-left">Image</button></li>
                    <li className="w-full p-3 bg-neutral-900"><button onClick={(e) => handleCreate(e, "const")} className=" cursor-pointer w-full h-full text-left">Const</button></li>
                </ul>
            }
        </div>

        <div className="h-full overflow-scroll ">
            <CreateTask />
        </div>
        
        <div className=" flex gap-5 justify-end">
            <Button clickhandler={()=>{
                dispatch(resetPre());
                dispatch(setStage("idle"));
            }}>Cancel</Button>
            <Button clickhandler={handleSubmit}>Submit</Button>
        </div>
      
    </form>
  )
}

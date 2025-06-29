'use client'

import { useEffect, useState, } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import Button from "../ui/Button"
import { setOpen, setStage, setPreCreateTask, setForm, setSearch } from "@/lib/taskSlice"
import { useLazyGetTasksQuery, useRemoveTaskMutation } from "@/lib/taskService"

export default function TaskSection() {

    const tasks = useAppSelector(s => s.task.tasks);
    const openId = useAppSelector(s => s.task.open);
    const dispatch = useAppDispatch();
    const [removeTask] = useRemoveTaskMutation();
    const [getTask] = useLazyGetTasksQuery();
    const search = useAppSelector(s => s.task.search);
    const [inputSearch, setInputSearch] = useState("");
     
    useEffect(()=> {
        const closeHandlerEscape = (e: KeyboardEvent) => {
            if (e.key == 'Escape') {
                dispatch(setOpen(null));
            }
        }
        
        document.addEventListener('keydown', closeHandlerEscape)

        return () => {
            document.removeEventListener('keydown', closeHandlerEscape)
        }
    }, [tasks])

    const openHandler = (id: string) => {
        if (openId) {
            dispatch(setOpen(null));   
        } else {
            dispatch(setOpen(id));   
        }
    }

    useEffect(()=> {
        const timer = setTimeout(()=> {
            dispatch(setSearch(inputSearch))
        }, 500)

        return (()=> {
            clearTimeout(timer)
        })
    }, [inputSearch])

    useEffect(()=> {
        getTask({ len: 10, skip: 0, filter: search })
    }, [search])
    
  return (
    <section className="w-auto p-4 shadow-2xl shadow-neutral-800 bg-neutral-900 flex flex-col flex-wrap">
        <div className="">
            <input 
                type="text" 
                className="w-full box-border outline-0 p-1 bg-neutral-900 border-b-1" 
                value={inputSearch} 
                onChange={(e)=> setInputSearch(e.target.value)}
            />
        </div>
        {tasks.map((val, id)=> (
            <article key={`task-item-${val.id}-${id}`} className="bg-neutral-800 m-2" >
                
                <div className="flex">
                    <div className=" p-2 pl-4 pr-4 font-normal bg-stone-900 text-center">
                    {val.number}
                </div>
                <div className=" bg-stone-600 p-2 text-center w-full"><button className=" cursor-pointer w-full" onClick={() => openHandler(val.id)}>{val.name}</button></div>
                <div className="flex">
                    <Button clickhandler={async()=>{
                        await removeTask(val.id).unwrap()

                        getTask({ len: 10, skip: 0 });
                    }}>
                        <svg width="20" height="20" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.4871 17.5159C16.5108 18.4922 16.5108 20.0751 17.4871 21.0515L26.45 30.0143L17.4871 38.9773C16.5108 39.9535 16.5108 41.5365 17.4871 42.5128C18.4634 43.489 20.0464 43.489 21.0227 42.5128L29.9855 33.5498L38.9485 42.5128C39.9247 43.489 41.5077 43.489 42.484 42.5128C43.4602 41.5365 43.4602 39.9535 42.484 38.9773L33.521 30.0143L42.484 21.0515C43.4602 20.0752 43.4602 18.4923 42.484 17.516C41.5075 16.5396 39.9247 16.5396 38.9485 17.516L29.9855 26.4788L21.0227 17.5159C20.0464 16.5396 18.4634 16.5396 17.4871 17.5159Z" fill="#FFF"/>
                        </svg>
                    </Button>
                    <Button clickhandler={async()=> {
                        dispatch(setForm({number: val.number, name: val.name, id: val.id}))
                        dispatch(setPreCreateTask(val.description))
                        dispatch(setStage('add'))
                    }} >
                        <svg width="20" height="20" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50.3743 19.8499L20.6993 49.525C18.0493 52.2 10.1243 53.4247 8.19928 51.6497C6.27428 49.8747 7.67423 41.95 10.3242 39.275L39.9993 9.59998C41.3695 8.295 43.1958 7.5774 45.0878 7.60045C46.9798 7.62353 48.7878 8.38543 50.1258 9.72343C51.4638 11.0614 52.2258 12.8695 52.2488 14.7616C52.272 16.6536 51.5543 18.4797 50.2493 19.8499H50.3743Z" stroke="#FFF" strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M52.5 52.5H30" stroke="#FFF" strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Button>
                </div>
                </div>
                
                {openId && openId == val.id && <div className="h-fit p-2 overflow-clip">
                    {val.description.map((descItem, idx) => {
                        if (descItem.type === 'examples') {
                        return (
                            <div key={`examples-${idx}`}>
                                {Array.isArray(descItem.items) && descItem.items.map((example, exIdx) => {
                                    if (typeof example !== 'string') {
                                    return (
                                        <ul key={`example-items-${val.id}-${idx}-${exIdx}`} className=" border-l-1 m-4">
                                            <li className="pl-2" key={`input-${val.id}-${idx}-${exIdx}`}>Input: <span className=" bg-neutral-900 p-1">{example.input}</span></li>
                                            <li className="pl-2" key={`output-${val.id}-${idx}-${exIdx}`}>Output: <span className=" bg-neutral-900 p-1">{example.output}</span></li>
                                            <li className="pl-2" key={`desc-${val.id}-${idx}-${exIdx}`}>Description: {example.description}</li>
                                        </ul>
                                    );
                                    }
                                    return null;
                                })}
                            </div>
                        );
                        }

                        if (descItem.type == "image") {
                            return (
                            <div key={`images-items-${val.id}-${idx}`} className="pl-5">
                                {Array.isArray(descItem.items) && descItem.items.map((url, urlsidx) => {
                                if (typeof url === 'string') {
                                    
                                    return (
                                        <div className="">
                                            <img key={`image-${val.id}-desc-${idx}-item-${urlsidx}`} className="p-1" src={url} alt="none" />
                                        </div>
                                        
                                    );
                                    
                                }
                                return null;
                                })}
                            </div>
                            );
                        }

                        if (descItem.type == "list") {
                            return (
                            <ul key={`text-list-${val.id}-${idx}`} className="list-disc pl-5">
                                {Array.isArray(descItem.items) && descItem.items.map((text, textIdx) => {
                                if (typeof text === 'string') {
                                    
                                    return (
                                        <li className="p-1" key={`task-${val.id}-desc-${idx}-item-${textIdx}`}>{text}</li>
                                    );
                                    
                                }
                                return null;
                                })}
                            </ul>
                            );
                        }

                        if (descItem.type == "const") {
                            return (
                            <ul key={`text-const-${val.id}-${idx}`} className="list-disc pl-5 bg-neutral-900 text-sm">
                                {Array.isArray(descItem.items) && descItem.items.map((text, textIdx) => {
                                if (typeof text === 'string') {
                                    
                                    return (
                                        <li className="p-1" key={`textidx-${val.id}-${idx}-${textIdx}`}>{text}</li>
                                    );
                                    
                                }
                                return null;
                                })}
                            </ul>
                            );
                        }

                        // Обработка других типов (например, type === 'text')
                        return (
                            <div key={`text-${val.id}-${idx}`}>
                                {Array.isArray(descItem.items) && descItem.items.map((text, textIdx) => {
                                if (typeof text === 'string') {
                                    return (
                                        <div key={`textidx-${val.id}-${idx}-${textIdx}`}>{text}</div>
                                    );
                                }
                                return null;
                                })}
                            </div>
                            );
                    })}
                    </div>} 
                


                
                
                
            </article>
        ))}
        
    </section>
  )
}
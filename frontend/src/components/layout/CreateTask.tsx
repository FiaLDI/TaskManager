'use client'

import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import Button from "../ui/Button"
import { addItemPreCreateTask, addPreCreateTask, setStage, updatePreDescriptionItems, removePreCreateTaskItem, changePreCreateTaskOrder, removePreItem } from "@/lib/taskSlice"
import { useEffect } from "react";
import { DescriptionItem } from "@/types/task";

export default function CreateTask() {
  const dispatch = useAppDispatch();
  const preCreate = useAppSelector(s => s.task.preCreateTask);
  
  const upHandler = (index: number) => {
    if (index === 0) return; // нельзя поднять выше
        dispatch(changePreCreateTaskOrder({
            from: index,
            to: index - 1,
        }));
    };

    const downHandler = (index: number) => {
        if (index === preCreate.length - 1) return; // нельзя опустить последний элемент ниже
        dispatch(changePreCreateTaskOrder({
            from: index,
            to: index + 1,
        }));
    }
  return (
    <>
        {preCreate.map((val, id) => {
            return (
                <div key={`pre-create-${id}`} className=" max-w-[98%]">
                    <h3 className=" text-2xl pl-2">{val.type.toLocaleUpperCase()}</h3>
                    <div className=" flex flex-col  items-end">
                    <div className="flex flex-col w-full gap-2">
                        
                        
                        
                        {val.items && val.items.map((text, idx) => {

                            if (val.type == 'examples') {
                                const currentItem = val.items[idx] as DescriptionItem;
                                    return (
                                        <>     
                                            <div className="relative">
                                                <input 
                                                className=" w-full box-border outline-0 p-1 bg-neutral-900" 
                                                key={`${id}-create-text-${idx}-input`} 
                                                type="text" 
                                                value={currentItem.input}
                                                placeholder="Enter input"
                                                onChange={(e)=> dispatch(updatePreDescriptionItems({
                                                    id: val.id,
                                                    order: idx,
                                                    item: {
                                                        ...currentItem,
                                                        input: e.target.value
                                                    }
                                                }))}
                                            />
                                            <input 
                                                className=" w-full box-border outline-0 p-1 bg-neutral-900" 
                                                key={`${id}-create-text-${idx}-output`} 
                                                type="text" 
                                                value={currentItem.output}
                                                placeholder="Enter output"
                                                onChange={(e)=> dispatch(updatePreDescriptionItems({
                                                    id: val.id,
                                                    order: idx,
                                                    item: {
                                                        ...currentItem,
                                                        output: e.target.value
                                                    }
                                                }))}
                                            />
                                            <input 
                                                className=" w-full box-border outline-0 p-1 bg-neutral-900" 
                                                key={`${id}-create-text-${idx}-description`} 
                                                type="text" 
                                                value={currentItem.description}
                                                placeholder="Enter description"
                                                onChange={(e)=> dispatch(updatePreDescriptionItems({
                                                    id: val.id,
                                                    order: idx,
                                                    item: {
                                                        ...currentItem,
                                                        description: e.target.value
                                                    }
                                                }))}
                                            />
                                            <div className=" absolute right-0 top-0 h-full">
                                                <Button clickhandler={()=> {()=> {dispatch(removePreCreateTaskItem({id: val.id, order: idx}))}}}>
                                                <svg width="20" height="20" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.4871 17.5159C16.5108 18.4922 16.5108 20.0751 17.4871 21.0515L26.45 30.0143L17.4871 38.9773C16.5108 39.9535 16.5108 41.5365 17.4871 42.5128C18.4634 43.489 20.0464 43.489 21.0227 42.5128L29.9855 33.5498L38.9485 42.5128C39.9247 43.489 41.5077 43.489 42.484 42.5128C43.4602 41.5365 43.4602 39.9535 42.484 38.9773L33.521 30.0143L42.484 21.0515C43.4602 20.0752 43.4602 18.4923 42.484 17.516C41.5075 16.5396 39.9247 16.5396 38.9485 17.516L29.9855 26.4788L21.0227 17.5159C20.0464 16.5396 18.4634 16.5396 17.4871 17.5159Z" fill="#FFF"/>
                                                </svg>
                                            </Button>
                                            </div>
                                            </div>                                       
                                            
                                            
                                            
                                        </>
                                    )
                                }
                            
                            if (typeof text == "string"){
                                if (val.type == 'image') {
                                    return (
                                        <>
                                            <div className="p-5">
                                                <h4 >Preview</h4>
                                                <img className="w-30" src={text} alt="none" />
                                            </div>
                                            <div className="relative">
                                                <input 
                                                className=" w-full box-border outline-0 p-1 bg-neutral-900" 
                                                key={`${id}-create-text-${idx}`} 
                                                type="text" 
                                                value={text}
                                                placeholder="Enter url"
                                                onChange={(e)=> dispatch(updatePreDescriptionItems({id: val.id, order: idx, item: e.target.value}))}
                                            />
                                            <div className=" absolute right-0 top-0 h-full">
                                                <Button clickhandler={()=> {dispatch(removePreCreateTaskItem({id: val.id, order: idx}))}}>
                                                    <svg width="24" height="24" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17.4871 17.5159C16.5108 18.4922 16.5108 20.0751 17.4871 21.0515L26.45 30.0143L17.4871 38.9773C16.5108 39.9535 16.5108 41.5365 17.4871 42.5128C18.4634 43.489 20.0464 43.489 21.0227 42.5128L29.9855 33.5498L38.9485 42.5128C39.9247 43.489 41.5077 43.489 42.484 42.5128C43.4602 41.5365 43.4602 39.9535 42.484 38.9773L33.521 30.0143L42.484 21.0515C43.4602 20.0752 43.4602 18.4923 42.484 17.516C41.5075 16.5396 39.9247 16.5396 38.9485 17.516L29.9855 26.4788L21.0227 17.5159C20.0464 16.5396 18.4634 16.5396 17.4871 17.5159Z" fill="#FFF"/>
                                                    </svg>
                                                </Button>
                                            </div>
                                            </div>
                                            
                                        </>
                                    )
                                }
                                
                            return(
                                <div key={`${id}-create-text-${idx}`} className=" relative" >
                                    
                                    <input 
                                        className=" w-full box-border outline-0 p-1 bg-neutral-900" 
                                        
                                        type="text" 
                                        value={text}
                                        onChange={(e)=> dispatch(updatePreDescriptionItems({id: val.id, order: idx, item: e.target.value}))}
                                    />
                                    <div className=" absolute right-0 top-0 h-full">
                                    <Button clickhandler={()=> {dispatch(removePreCreateTaskItem({id: val.id, order: idx}))}}>
                                        <svg width="24" height="24" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.4871 17.5159C16.5108 18.4922 16.5108 20.0751 17.4871 21.0515L26.45 30.0143L17.4871 38.9773C16.5108 39.9535 16.5108 41.5365 17.4871 42.5128C18.4634 43.489 20.0464 43.489 21.0227 42.5128L29.9855 33.5498L38.9485 42.5128C39.9247 43.489 41.5077 43.489 42.484 42.5128C43.4602 41.5365 43.4602 39.9535 42.484 38.9773L33.521 30.0143L42.484 21.0515C43.4602 20.0752 43.4602 18.4923 42.484 17.516C41.5075 16.5396 39.9247 16.5396 38.9485 17.516L29.9855 26.4788L21.0227 17.5159C20.0464 16.5396 18.4634 16.5396 17.4871 17.5159Z" fill="#FFF"/>
                                        </svg>
                                    </Button>
                                    </div>
                                </div>
                            )}}) }
                            </div>
                            <div className="flex justify-between w-full">
                                <div className="flex">
                                    { preCreate.length > 1 &&
                                        <>
                                            <Button clickhandler={()=>{upHandler(id)}}>Up</Button>
                                            <Button clickhandler={()=>{downHandler(id)}}>Down</Button>
                                        </>
                                        
                                    }
                                    <Button
                                        clickhandler={() => {
                                            dispatch(
                                            addItemPreCreateTask({
                                                id: val.id,
                                                updates: val.type === 'examples'
                                                ? { input: '', output: '', description: '' }
                                                : ''
                                            })
                                            )
                                        }}
                                        >
                                        Add
                                    </Button>
                                    <Button clickhandler={()=> {dispatch(removePreItem(val.id))}}>
                                        <svg width="39" height="24" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.4871 17.5159C16.5108 18.4922 16.5108 20.0751 17.4871 21.0515L26.45 30.0143L17.4871 38.9773C16.5108 39.9535 16.5108 41.5365 17.4871 42.5128C18.4634 43.489 20.0464 43.489 21.0227 42.5128L29.9855 33.5498L38.9485 42.5128C39.9247 43.489 41.5077 43.489 42.484 42.5128C43.4602 41.5365 43.4602 39.9535 42.484 38.9773L33.521 30.0143L42.484 21.0515C43.4602 20.0752 43.4602 18.4923 42.484 17.516C41.5075 16.5396 39.9247 16.5396 38.9485 17.516L29.9855 26.4788L21.0227 17.5159C20.0464 16.5396 18.4634 16.5396 17.4871 17.5159Z" fill="#FFF"/>
                                        </svg>
                                    </Button>
                                    
                                </div>
                        <div className="">
                        
                        </div>
                            </div>
                            
                    </div>
                </div>
            )
        })}
    </>
  )
}

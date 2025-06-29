'use client'

import { useAppDispatch } from "@/lib/hooks"
import { setStage } from "@/lib/taskSlice";
import { useEffect, useRef } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {    
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(()=> {
    ref.current?.addEventListener('click', (event) => {
        const isClickInside = (ref.current == event.target)

        if (isClickInside) {
          dispatch(setStage('idle'))
        } 
    })

    document.addEventListener('keydown', (e) => {
      if (e.key == "Escape") {
        dispatch(setStage('idle'))
      }
    })

    return ()=>{}
  }, [])

  return (
    <div ref={ref} className="fixed inset-0  bg-[rgba(0,0,0,0.5)] overflow-auto w-full h-full flex items-center justify-center">
        <div  className="bg-neutral-800 w-3xl max-h-[80vh]">
            {children}
        </div>
        
    </div>
  )
}
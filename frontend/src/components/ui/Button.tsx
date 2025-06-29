'use client'

import { useEffect, useState } from "react"

export default function Button({ children, clickhandler, customClasses }: { children: React.ReactNode, clickhandler: () => void, customClasses?: string }) {

    const [clicked, setClicked] = useState(false);

    useEffect(()=> {
        if (clicked) {
            clickhandler()
            const timer = setTimeout(()=> {
                setClicked(false);
            }, 1000);
            return () => {
                clearTimeout(timer);
            }
        }
    }, [clicked]);

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      setClicked(true);
    }
    
  return (
    <button className={`px-2 py-1 bg-blue-500 text-white transition w-fit cursor-pointer ${
        clicked ? "animate-ping" : "hover:bg-blue-600"
      } ${customClasses}`} onClick={(e) => clickHandler(e)}>
      {children}
    </button>
  )
}
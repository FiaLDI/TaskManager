'use client'

import { useAppDispatch } from "@/lib/hooks"
import Button from "../ui/Button"
import { setStage } from "@/lib/taskSlice"

export default function Navbar() {
  const dispatch = useAppDispatch()

  return (
    <nav className="bg-neutral-900 shadow p-4 flex justify-between items-center w-screen">
      <h1 className="text-xl font-bold">TaskCode</h1>
      <ul className="flex gap-4 text-gray-300 items-center">
        <li><a href="/" className="hover:text-blue-500">Home</a></li>
        <li><a href="/about" className="hover:text-blue-500">About</a></li>
        <li><Button clickhandler={()=>{dispatch(setStage('add'))}}>Add Task</Button></li>
      </ul>
    </nav>
  )
}

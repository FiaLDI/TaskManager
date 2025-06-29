'use client'

import TaskSection from '@/components/section/TaskSection'
import Modal from '@/components/ui/Modal';
import { useLazyGetTasksQuery } from '@/lib/taskService'
import { useEffect } from 'react'
import AddTaskForm from './AddTaskForm';
import { useAppSelector } from '@/lib/hooks';

export default function Home() {
  // const count = useAppSelector((state) => state.counter.value)
  // const dispatch = useAppDispatch()
  const [getTaks] = useLazyGetTasksQuery();
  const status = useAppSelector(s => s.task.stage)

  useEffect(() => {
    getTaks({ len: 10, skip: 0 });
  }, []);

  return (
    <main className="flex flex-col max-w-10/12 w-screen p-8 ">
      {status === 'add' && <Modal>
        <h2 className='text-center text-3xl p-4'>Add task</h2>
        <AddTaskForm />
      </Modal>}
      
      <TaskSection />
    </main>
  )
}

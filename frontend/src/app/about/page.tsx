'use client'

export default function Home() {
    return (
    <main className="flex flex-col max-w-10/12 w-screen p-8 gap-5">
      <h1 className="text-4xl font-bold">About app </h1>
      
      <section className='shadow-2xl shadow-neutral-800 bg-neutral-900 p-5'>
        <h2 className='text-2xl'>Frontend</h2>
        Stack: Next.js (15), React, Redux, Tailwind, Typescript
        <p>Implements the user interface for interaction with the JSON-file on the backend and transforms it into a format convenient for reading using styles</p>
        <article className="whitespace-pre-wrap font-mono">
{`
Structure:
-src
  -app
    AddTaskForm.tsx
    globals.css
    layout.tsx
    page.tsx

  -components
    -ui
      Button.tsx
      Modal.tsx
      
    -section
      TaskSectiob.tsx

    -shared
    -layout
      CreateTask.tsx
      NavBar.tsx

  -lib
    hooks.ts
    providers.jsx
    store.ts
    taskService.ts
    taskSlice.ts

  -types
    tasks.ts

next.config.ts
package.json
taiwind.config.json
tsconfig.json`}
</article>

<article>
  <h3 className='text-2xl'>Add Task Interface</h3>
  
  <img src="/add.png" alt="" />
  <h3 className='text-2xl'>Show Task Interface</h3>
  <img src="/read.png" alt="" />
</article>

<p className="whitespace-pre-wrap">
{`
launch dev: npm run dev
launch build: npm run build
launch linter: npm run lint
`}

</p>


      </section>
      <section className='shadow-2xl shadow-neutral-800 bg-neutral-900 p-5'>
        <h2 className='text-2xl'>Backend</h2>
        Stack: Express.js, Typescript
        <p>This service implements the simplest CRUD operations, stores data in a single JSON file, and also implements server pagination. </p>
<article className="whitespace-pre-wrap font-mono">
{`
Structure:
-src
  -controllers
    TaskControllers.ts
  -data
    tasks.json
  -routes
    taskRoutes.ts
  -types
    tasks.ts
  server.ts
package.json
tsconfig.json

`}
</article>

Available queries:
<article className="whitespace-pre-wrap font-mono">
{`
GET /api/task?len=&skip=&filter=
POST /api/task
PUT /api/task
DELETE /api/task?id=
`}
</article>
<p className="whitespace-pre-wrap">
{`
launch: npm run start
linter: npm run lint
fixlinter: npm run lint:fix
`}

</p>
      

      </section>
    </main>
  )
}

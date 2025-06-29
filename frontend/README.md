# Frontend
### Stack: Next.js (15), React, Redux, Tailwind, Typescript

Implements the user interface for interaction with the JSON-file on the backend and transforms it into a format convenient for reading using styles

Structure:
```
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
tsconfig.json
Add Task Interface
Show Task Interface
```
```
launch dev: npm run dev
launch build: npm run build
launch linter: npm run lint
```
# Backend
### Stack: Express.js, Typescript

This service implements the simplest CRUD operations, stores data in a single JSON file, and also implements server pagination.
```
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
```
Available queries:
```
GET /api/task?len=&skip=&filter=
POST /api/task
PUT /api/task
DELETE /api/task?id=
```
```
launch: npm run start
linter: npm run lint
fixlinter: npm run lint:fix
```
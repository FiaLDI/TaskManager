import express from "express";

import {
    getTask,
    addTask,
    deleteTask,
    putTask,
} from "../controllers/taskController";

export const taskRouter = express.Router();

taskRouter.get("/task/", getTask);
taskRouter.post("/task/", addTask);
taskRouter.put("/task/", putTask);
taskRouter.delete("/task/", deleteTask);

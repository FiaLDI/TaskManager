import { Request, Response } from "express";
import { v7 as uuidv4 } from "uuid";
import { promises as fs } from "fs";
import path from "path";
import { task } from "../types/task"

const pathToData = path.resolve(__dirname, "..", "data", "tasks.json");

const getTask = async (req: Request, res: Response) => {
    let { len, skip, filter } = req.query;

    // Приводим к числам и задаём значения по умолчанию
    const length = len ? parseInt(len as string, 10) : 10;
    const offset = skip ? parseInt(skip as string, 10) : 0;

    try {
        const data = await fs.readFile(pathToData, "utf-8");
        const tasks = JSON.parse(data);

        let filteredTasks = tasks;

        if (filter && typeof filter === "string") {
            const lowerFilter = filter.toLowerCase();
            filteredTasks = tasks.filter((task: any) => {
                const name = typeof task.name === "string" ? task.name.toLowerCase() : "";
                const numberStr = task.number !== undefined && task.number !== null
                    ? String(task.number).toLowerCase()
                    : "";
                return (
                    name.startsWith(lowerFilter) ||
                    numberStr.startsWith(lowerFilter)
                );
            });
        }


        // Берём срез с учётом skip и len
        const result = filteredTasks.slice(offset, offset + length);

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

const addTask = async (req: Request, res: Response) => {
    const { number, name, description } = req.body;

    if (!name || !description || !number) {
        return res.status(400).json({
            error: "All fields (number, name, description) are required.",
        });
    }

    try {
        const data = await fs.readFile(pathToData, "utf-8");
        const tasks: task[] = JSON.parse(data);

        const newTask: task = {
            id: uuidv4(),
            number: Number(number),
            name,
            description,
        };

        tasks.push(newTask);
        await fs.writeFile(pathToData, JSON.stringify(tasks, null, 2));

        res.status(201).json(newTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add task." });
    }
};

// Удалить задачу по id
const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
        return res.status(400).json({ error: "Valid task id is required." });
    }

    try {
        const data = await fs.readFile(pathToData, "utf-8");
        let tasks: task[] = JSON.parse(data);

        const initialLength = tasks.length;
        tasks = tasks.filter((task) => task.id !== id);

        if (tasks.length === initialLength) {
            return res.status(404).json({ error: "Task not found." });
        }

        // Обновим номера (опционально)
        tasks = tasks.map((task, index) => ({ ...task, number: index + 1 }));

        await fs.writeFile(pathToData, JSON.stringify(tasks, null, 2));
        res.status(200).json({ message: "Task deleted." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete task." });
    }
};

// который обновляет задачу по id и перезаписывает её поля
const putTask = async (req: Request, res: Response) => {
    const { id, number, name, description } = req.body;

    if (!name || !description || !id || !number) {
        return res.status(400).json({
            error: "All fields (id, number, name, description) are required.",
        });
    }

    try {
        const data = await fs.readFile(pathToData, "utf-8");
        let tasks: task[] = JSON.parse(data);

        const index = tasks.findIndex((task) => task.id === id);

        if (index === -1) {
            return res.status(404).json({ error: "Task not found." });
        }

        // Обновляем задачу
        tasks[index] = {
            ...tasks[index],
            number,
            name,
            description,
        };

        await fs.writeFile(pathToData, JSON.stringify(tasks, null, 2));

        res.status(200).json({ message: "Task updated successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update task." });
    }
};

export { getTask, addTask, deleteTask, putTask };

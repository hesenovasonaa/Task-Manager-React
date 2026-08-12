import { createContext, useContext, useEffect, useState } from "react";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} from "./api"; 

const TaskContext = createContext();
export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    getTasks()
        .then((data) => {
        setTasks(data);
        })
        .catch((error) => {
        console.error(error);
    })
        .finally(() => {
        setLoading(false);
    });
}, []);
    const addTask = async (title) => {
    if (!title.trim()) return;
    const newTask = {
        title: title.trim(),
    };
    const task = await createTask(newTask);
    setTasks((prev) => [...prev, task]);
};
    const editTask = async (id, title) => {
    const updatedTask = await updateTask(id, {
        title: title.trim(),
    });
    setTasks((prev) =>
    prev.map((task) =>
        task.id === id ? updatedTask : task
    )
    );
};
    const removeTask = async (id) => {
        const oldTasks = tasks;
    setTasks((prev) =>
        prev.filter((task) => task.id !== id)
    );
    try {
        await deleteTask(id);
    } catch (error) {
        setTasks(oldTasks);
        console.error(error);
    }
};
    return (
    <TaskContext.Provider
        value={{
        tasks,
        loading,
        addTask,
        editTask,
        removeTask,
    }}
    >
    {children}
    </TaskContext.Provider>
);
}

export function useTasks() {
    return useContext(TaskContext);
}
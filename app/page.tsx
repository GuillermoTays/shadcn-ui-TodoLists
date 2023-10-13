"use client";

import { z } from "zod";

import { UserNav } from "@/components/user-nav/user-nav";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import { taskSchema } from "@/data/schema";
import { Task } from "../data/schema";
import { useEffect, useState } from "react";
import { TasksContext } from "./context/tasksContext";

// Simulate a database read for tasks.
async function getTasks() {
  // const data = await fs.readFile(path.join(process.cwd(), "data/tasks.json"));

  // const tasks = JSON.parse(data.toString());

  const todoData = await fetch("https://dummyjson.com/todos");

  const response = await todoData.json();

  const todos = response.todos.map((item: any) => {
    return {
      id: item.id.toString(),
      title: item.todo,
      status: item.completed ? "done" : "todo",
      label: "bug",
      priority: "medium",
    };
  });

  return z.array(taskSchema).parse(todos);
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const todoData = await fetch("https://dummyjson.com/todos");

      const response = await todoData.json();

      const todos = response.todos.map((item: any) => {
        return {
          id: item.id.toString(),
          title: item.todo,
          status: item.completed ? "done" : "todo",
          label: "bug",
          priority: "medium",
        };
      });

      const tasks = z.array(taskSchema).parse(todos);
      setTasks(tasks);
    };

    fetchData();
  }, []);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <DataTable data={tasks} columns={columns} />
      </TasksContext.Provider>
    </div>
  );
}

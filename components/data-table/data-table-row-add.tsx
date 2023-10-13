"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { PlusCircleIcon } from "lucide-react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useContext, useState } from "react";
import { TasksContext } from "@/app/context/tasksContext";

interface DataTableRowAddProps<TData> {
  table: Table<TData>;
}

export function DataTableRowAdd<TData>({ table }: DataTableRowAddProps<TData>) {
  const [status, setStatus] = useState(false);
  const [id, setId] = useState("");
  const [todo, setTodo] = useState("");

  const { tasks, setTasks } = useContext(TasksContext);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          type="number"
          placeholder="Id"
          className="h-8 w-[150px] lg:w-[150px]"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <Input
          placeholder="Todo"
          className="h-8 w-[150px] lg:w-[800px]"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" onClick={() => setStatus(!status)} />
          <Label htmlFor="airplane-mode">{status ? "done" : "todo"}</Label>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed"
          onClick={() => {
            console.log(id, todo, status);
            const newItem = {
              id: id.toString(),
              title: todo,
              status: status ? "done" : "todo",
              label: "bug",
              priority: "medium",
            };
            const newTasks = [...tasks, newItem];

            setTasks(newTasks);

            setId("");
            setTodo("");
            setStatus(false);
          }}
        >
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Create
        </Button>
      </div>
    </div>
  );
}

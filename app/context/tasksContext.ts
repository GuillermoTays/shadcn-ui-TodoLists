import { Task } from "@/data/schema";
import { createContext } from "react";

interface TasksContextValue {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TasksContext = createContext<TasksContextValue>(
  {} as TasksContextValue
);

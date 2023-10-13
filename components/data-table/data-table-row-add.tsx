"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { PlusCircleIcon } from "lucide-react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useState } from "react";

interface DataTableRowAddProps<TData> {
  table: Table<TData>;
}

export function DataTableRowAdd<TData>({ table }: DataTableRowAddProps<TData>) {
  const [status, setStatus] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input placeholder="Id" className="h-8 w-[150px] lg:w-[150px]" />
        <Input placeholder="Todo" className="h-8 w-[150px] lg:w-[800px]" />
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" onClick={() => setStatus(!status)} />
          <Label htmlFor="airplane-mode">{status ? "done" : "todo"}</Label>
        </div>

        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Create
        </Button>
      </div>
    </div>
  );
}

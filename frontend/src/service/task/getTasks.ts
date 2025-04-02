import type { IGetTasksFilters } from "@/type/task/getTasksFilters";
import { api } from "../api";
import type { ITask } from "@/type/task/task";

export async function getTasks(filters?:IGetTasksFilters){
    const {data}=await api.get<ITask[]>('/tasks',{params:filters})
    return data
}
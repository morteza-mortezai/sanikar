import { api } from "../api";
import type { ITask } from "@/type/task/task";

export async function getTasks(){
    const {data}=await api.get<ITask[]>('/tasks')
    return data
}
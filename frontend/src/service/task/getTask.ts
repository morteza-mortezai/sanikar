import { api } from "../api";
import type { ITask } from "@/type/task/task";

export async function getTask(taskId:number){
    const {data}=await api.get<ITask>(`/tasks/${taskId}`)
    return data
}
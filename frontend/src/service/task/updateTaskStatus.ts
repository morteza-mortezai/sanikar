import { api } from "../api";
import type { ITask } from "@/type/task/task";

export async function updateTaskStatus({taskId,status}:{taskId:number,status:'pending'|'completed'}){
    const {data}=await api.patch<ITask>(`/tasks/${taskId}/status`,{status})
    return data
}
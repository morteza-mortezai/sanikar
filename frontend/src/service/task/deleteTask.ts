import { api } from "../api";
import type { ITask } from "@/type/task/task";

export async function deleteTask(taskId:number){
    return api.delete<ITask[]>(`/tasks/${taskId}`)
}
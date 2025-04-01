import type { ICreateTaskBody } from "@/type/task/createTaskBody";
import { api } from "../api";

export function createTask(body:ICreateTaskBody){
    return api.post('/tasks',body)
}
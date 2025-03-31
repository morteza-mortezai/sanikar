import type { ILoginbody } from "@/type/loginBody";
import { api } from "../api";
import type { ILoginResponse } from "@/type/loginResponse";

export function getTasks(){
    return api.get<ILoginResponse>('/tasks')
}
import type { ILoginbody } from "@/type/loginBody";
import { api } from "../api";
import type { ILoginResponse } from "@/type/loginResponse";

export function login(body:ILoginbody){
    return api.post<ILoginResponse>('/login',body)
}
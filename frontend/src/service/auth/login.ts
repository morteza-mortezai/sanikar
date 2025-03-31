import type { ILoginbody } from "@/type/loginBody";
import { api } from "../api";

export function login(body:ILoginbody){
    return api.post('/auth/login',body)
}
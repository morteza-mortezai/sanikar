import type { ILoginResponse } from "@/type/loginResponse";
import { api } from "../api";
import type { IRegisterbody } from "@/type/registerBody";

export function register(body:IRegisterbody){
    return api.post<ILoginResponse>('/register',body)
}
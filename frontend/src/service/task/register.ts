import { api } from "../api";
import type { IRegisterbody } from "@/type/registerBody";

export function register(body:IRegisterbody){
    return api.post('/register',body)
}
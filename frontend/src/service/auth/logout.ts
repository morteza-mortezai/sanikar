import { api } from "../api";

export function logout(){
    return api.get('/logout')
}
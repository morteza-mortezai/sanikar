export interface ICreateTaskBody{
    title:string
    description:string
    start_date?:string|null
    end_date?:string|null
    status?:string
}
export interface ITask{
    title:string
    description:string
    status:'pending'| 'completed'
    start_date:string
    end_date:string
}
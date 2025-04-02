export interface IGetTasksFilters {
  search?: string | null
  status?: string | null
  sort_by?: null | 'created_at' |'start_date' | 'end_date'|'status'
  sort_type: null | 'ASC' | 'DESC'
}

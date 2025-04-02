import type { IGetTasksFilters } from '@/type/task/getTasksFilters'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { getTasks } from '@/service/task/getTasks'

// init

export const useTaskStore = defineStore('task', () => {
  const filters = ref<IGetTasksFilters>({
    search: null,
    status: null,
    sort_type: null,
    sort_by: null,
  })

  const { data: tasks } = useQuery({
    queryKey: ['getTasks', filters.value],
    queryFn: () => getTasks(filters.value),
  })

  function clear() {
    filters.value.search = null
    filters.value.status = null
    filters.value.sort_by = null
    filters.value.sort_type = null
  }

  return { filters, tasks, clear }
})

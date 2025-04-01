import type { ICreateTaskBody } from '@/type/task/createTaskBody'
import { api } from '../api'

export function editTask({ taskId, body }: { taskId: number; body: ICreateTaskBody }) {
  return api.put(`/tasks/${taskId}`, body)
}

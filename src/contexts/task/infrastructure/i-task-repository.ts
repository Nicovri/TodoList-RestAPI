import { Task, TaskCreate, TaskUpdate } from '../domains/types'

export type TaskRaw = Task
export type TaskCreateRaw = TaskCreate
export type TaskUpdateRaw = TaskUpdate

export interface ITaskRepository {
  getTasks(page: string): Promise<TaskRaw[]>
  addTask(task: TaskCreate): Promise<TaskRaw>
  getTask(id: string): Promise<TaskRaw | null>
  deleteTask(id: string): Promise<void>
  updateTask(task: TaskUpdate): Promise<TaskRaw>
  addTagToTask(id: string, tagId: string): Promise<TaskRaw>
  removeTagOfTask(id: string, tagId: string): Promise<TaskRaw>
}

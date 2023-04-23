import { Task, TaskUpdate } from '../../domains/types'
import { ITaskRepository } from '../../infrastructure'

export class UpdateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string, task: Omit<TaskUpdate, 'id'>): Promise<Task> {
    return this.taskRepository.updateTask({ ...task, id })
  }
}

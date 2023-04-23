import { Task } from '../../domains/types'
import { ITaskRepository } from '../../infrastructure'

export class DeleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string): Promise<void> {
    return this.taskRepository.deleteTask(id)
  }
}

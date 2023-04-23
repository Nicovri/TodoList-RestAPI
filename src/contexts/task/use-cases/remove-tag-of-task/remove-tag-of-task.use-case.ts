import { TaskNotFoundError } from '../../domains'
import { Task } from '../../domains/types'
import { ITaskRepository } from '../../infrastructure'

export class RemoveTagOfTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string, tagId: string): Promise<Task> {
    const task = await this.taskRepository.removeTagOfTask(id, tagId)
    if (!task) {
      throw new TaskNotFoundError(id)
    } else {
      return task
    }
  }
}

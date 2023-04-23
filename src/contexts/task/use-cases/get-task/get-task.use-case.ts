import { Task } from '../../domains'
import { TaskNotFoundError } from '../../domains/errors'
import { ITaskRepository } from '../../infrastructure'

export class GetTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string): Promise<Task> {
    const task = await this.taskRepository.getTask(id)
    if (!task) {
      throw new TaskNotFoundError(id)
    } else {
      return task
    }
  }
}

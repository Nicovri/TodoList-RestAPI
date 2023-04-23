import { ITaskRepository } from '../../infrastructure'
import { Task } from '../../domains'

export class GetTasksUseCase {
  constructor(private TaskRepository: ITaskRepository) {}

  async execute(page: string): Promise<Task[]> {
    return await this.TaskRepository.getTasks(page)
  }
}

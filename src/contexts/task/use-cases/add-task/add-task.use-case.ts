import { Task, TaskCreate } from '../../domains/types'
import { ITaskRepository } from '../../infrastructure'

export class AddTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(task: TaskCreate): Promise<Task> {
    return this.taskRepository.addTask(task)
  }
}

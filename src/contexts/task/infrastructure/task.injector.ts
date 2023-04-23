import { Router } from 'express'
import { TaskRepository, RelationalDatabase } from '../../../infrastructure/database'
import { taskRoutes } from './task.routes'
import { TaskController } from './controller'
import { GetTasksUseCase, RemoveTagOfTaskUseCase } from '../use-cases'
import { AddTaskUseCase } from '../use-cases/add-task'
import { GetTaskUseCase } from '../use-cases/get-task'
import { DeleteTaskUseCase } from '../use-cases/delete-task'
import { UpdateTaskUseCase } from '../use-cases/update-task'
import { AddTagToTaskUseCase } from '../use-cases/add-tag-to-task'

export type TaskExternalDependencies = {
  database: RelationalDatabase
}

export const taskInjector = (externalDependencies: TaskExternalDependencies): Router => {
  const taskRepository = new TaskRepository(externalDependencies.database)

  const getTasksUseCase = new GetTasksUseCase(taskRepository)
  const addTaskUseCase = new AddTaskUseCase(taskRepository)
  const getTaskUseCase = new GetTaskUseCase(taskRepository)
  const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository)
  const updateTaskUseCase = new UpdateTaskUseCase(taskRepository)
  const addTagToTaskUseCase = new AddTagToTaskUseCase(taskRepository)
  const removeTagOfTaskUseCase = new RemoveTagOfTaskUseCase(taskRepository)

  const taskController = new TaskController(
    getTasksUseCase,
    addTaskUseCase,
    getTaskUseCase,
    deleteTaskUseCase,
    updateTaskUseCase,
    addTagToTaskUseCase,
    removeTagOfTaskUseCase
  )

  return taskRoutes(taskController)
}

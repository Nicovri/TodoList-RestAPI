import { Request, Response } from 'express'
import { ValidationError, validate } from 'jsonschema'
import {
  GetTasksUseCase,
  GetTaskUseCase,
  AddTaskUseCase,
  DeleteTaskUseCase,
  UpdateTaskUseCase,
  AddTagToTaskUseCase,
  RemoveTagOfTaskUseCase
} from '../../use-cases'
import { TaskNotFoundError } from '../../domains'
import { internal, notFound } from '../../../../infrastructure'

const taskCreateSchema = {
  id: '/Task',
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    isFinished: {
      type: 'boolean'
    },
    priority: {
      type: 'number'
    },
    tags: {
      type: 'array'
    }
  },
  required: ['title', 'isFinished', 'priority']
}

export class TaskController {
  constructor(
    private readonly getTasksUseCase: GetTasksUseCase,
    private readonly addTaskUseCase: AddTaskUseCase,
    private readonly getTaskUseCase: GetTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly addTagToTaskUseCase: AddTagToTaskUseCase,
    private readonly removeTagOfTaskUseCase: RemoveTagOfTaskUseCase
  ) {}

  async getTasks(req: Request, res: Response) {
    const tasks = await this.getTasksUseCase.execute(req.params.n)
    res.status(200).json(tasks)
  }

  async addTask(req: Request, res: Response) {
    const result = validate(req.body, taskCreateSchema)
    if (!result.valid) {
      const errors = result.errors.map((error: ValidationError) => {
        return {
          message: error.message
        }
      })
      res.status(400).json(errors)
    }

    const task = await this.addTaskUseCase.execute(req.body)
    res.status(200).json(task)
  }

  async getTask(req: Request, res: Response) {
    try {
      const task = await this.getTaskUseCase.execute(req.params.id)
      res.status(200).json(task)
    } catch (error) {
      const httpResponse = convertErrorsToHttpResponse(error)
      res.status(httpResponse.status).json(httpResponse.body)
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const task = await this.deleteTaskUseCase.execute(req.params.id)
      res.status(200).json(task)
    } catch (error) {
      const httpResponse = convertErrorsToHttpResponse(error)
      res.status(httpResponse.status).json(httpResponse.body)
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const task = await this.updateTaskUseCase.execute(req.params.id, req.body)
      res.status(200).json(task)
    } catch (error) {
      const httpResponse = convertErrorsToHttpResponse(error)
      res.status(httpResponse.status).json(httpResponse.body)
    }
  }

  async addTagToTask(req: Request, res: Response) {
    const task = await this.addTagToTaskUseCase.execute(req.params.id, req.params.tagId)
    res.status(200).json(task)
  }

  async removeTagOfTask(req: Request, res: Response) {
    const task = await this.removeTagOfTaskUseCase.execute(req.params.id, req.params.tagId)
    res.status(200).json(task)
  }
}

function convertErrorsToHttpResponse(error: unknown) {
  if (error instanceof TaskNotFoundError) {
    return notFound({ message: error.message, code: 'task-not-found', data: { id: error.id } })
  }
  return internal()
}

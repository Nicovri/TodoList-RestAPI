import { ITaskRepository, TaskCreateRaw, TaskRaw } from '../../../../contexts/task'
import { RelationalDatabase } from '../../database'
import { Task, TaskNotFoundError, TaskUpdate } from '../../../../contexts/task/domains'
import { toTaskRaw } from './task.mapper'
import { Prisma } from '@prisma/client'

export class TaskRepository implements ITaskRepository {
  constructor(private readonly database: RelationalDatabase) {}

  async getTasks(page: string): Promise<TaskRaw[]> {
    const tasks = await this.database.client.task.findMany({
      include: { tags: true },
      orderBy: { priority: 'asc' },
      skip: (parseInt(page) - 1) * 10,
      take: 10
    })
    return tasks.map(toTaskRaw)
  }

  async addTask(task: TaskCreateRaw): Promise<TaskRaw> {
    const newTask = await this.database.client.task.create({
      data: task,
      include: { tags: true }
    })
    return toTaskRaw(newTask)
  }

  async getTask(id: string): Promise<TaskRaw | null> {
    const task = await this.database.client.task.findUnique({ where: { id }, include: { tags: true } })
    return task ? toTaskRaw(task) : null
  }

  async deleteTask(id: string): Promise<void> {
    try {
      await this.database.client.task.delete({ where: { id } })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new TaskNotFoundError(id)
        }
      } else {
        throw error
      }
    }
  }

  async updateTask(task: TaskUpdate): Promise<Task> {
    const taskUpdated = await this.database.client.task.update({
      where: { id: task.id },
      data: task,
      include: { tags: true }
    })
    return toTaskRaw(taskUpdated)
  }

  async addTagToTask(id: string, tagId: string): Promise<Task> {
    const taskUpdated = await this.database.client.task.update({
      where: { id: id },
      data: {
        tags: {
          connect: [{ id: tagId }]
        }
      },
      include: { tags: true }
    })
    return toTaskRaw(taskUpdated)
  }

  async removeTagOfTask(id: string, tagId: string): Promise<Task> {
    const taskUpdated = await this.database.client.task.update({
      where: { id: id },
      data: {
        tags: {
          disconnect: [{ id: tagId }]
        }
      },
      include: { tags: true }
    })
    return toTaskRaw(taskUpdated)
  }
}

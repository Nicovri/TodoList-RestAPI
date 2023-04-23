import { Task } from '@prisma/client'
import { TaskRaw } from '../../../../contexts/task'
import { Tag } from '../../../../contexts/task/domains'

export function toTaskRaw(task: Task & { tags: Tag[] }): TaskRaw {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    isFinished: task.isFinished,
    priority: task.priority,
    tags: task.tags.map((tag: Tag) => ({
      id: tag.id,
      title: tag.title
    }))
  }
}

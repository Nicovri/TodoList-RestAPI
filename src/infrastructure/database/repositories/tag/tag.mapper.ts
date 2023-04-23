import { Tag, Task } from '@prisma/client'
import { TagRaw } from '../../../../contexts/tag'

export function toTagRaw(tag: Tag & { tasks: Task[] }): TagRaw {
  return {
    id: tag.id,
    title: tag.title,
    tasks: tag.tasks.map((task: Task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      isFinished: task.isFinished,
      priority: task.priority
    }))
  }
}

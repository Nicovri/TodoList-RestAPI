export type Tag = {
  id: string
  title: string
}

export type Task = {
  id: string
  title: string
  description: string
  isFinished: boolean
  priority: number
  tags: Tag[]
}

export type TaskCreate = Omit<Task, 'id' | 'tags'>

export type TaskUpdate = Omit<Tag, 'tags'>

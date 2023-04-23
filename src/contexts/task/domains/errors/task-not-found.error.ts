import { DomainError } from './domain.error'

export class TaskNotFoundError extends DomainError {
  constructor(public id: string) {
    super(`Task ${id} not found`)
  }
}

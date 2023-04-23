import { Router } from 'express'
import { TagRepository, RelationalDatabase } from '../../../infrastructure/database'
import { AddTagUseCase, GetTagUseCase, GetTagsUseCase } from '../use-cases'
import { tagRoutes } from './tag.routes'
import { TagController } from './controller'

export type TagExternalDependencies = {
  database: RelationalDatabase
}

export const tagInjector = (externalDependencies: TagExternalDependencies): Router => {
  const tagRepository = new TagRepository(externalDependencies.database)

  const getTagsUseCase = new GetTagsUseCase(tagRepository)
  const addTagUseCase = new AddTagUseCase(tagRepository)
  const getTagUseCase = new GetTagUseCase(tagRepository)

  const tagController = new TagController(getTagsUseCase, addTagUseCase, getTagUseCase)

  return tagRoutes(tagController)
}

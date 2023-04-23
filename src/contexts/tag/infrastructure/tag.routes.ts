import { Router } from 'express'
import { TagController } from './controller'

export function tagRoutes(controller: TagController): Router {
  const router = Router()
  router.get('/', controller.getTags.bind(controller))
  router.post('/', controller.addTag.bind(controller))
  router.get('/:id', controller.getTag.bind(controller))
  return router
}

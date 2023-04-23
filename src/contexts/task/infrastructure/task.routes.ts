import { Router } from 'express'
import { TaskController } from './controller'

export function taskRoutes(controller: TaskController): Router {
  const router = Router()
  router.get('/', (req, res) => {
    res.redirect('task/page/1')
  })

  router.post('/', controller.addTask.bind(controller))
  router.get('/:id', controller.getTask.bind(controller))
  router.delete('/:id', controller.deleteTask.bind(controller))
  router.put('/:id', controller.updateTask.bind(controller))

  router.get('/page/:n', controller.getTasks.bind(controller))

  router.put('/:id/tag/:tagId', controller.addTagToTask.bind(controller))
  router.put('/:id/-tag/:tagId', controller.removeTagOfTask.bind(controller))
  return router
}

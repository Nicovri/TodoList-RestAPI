import { Router } from 'express'
import { TaskExternalDependencies, taskInjector } from '../contexts/task/infrastructure/task.injector'
import { tagInjector } from '../contexts/tag'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'TP Final',
//       version: '1.0.0',
//       description: 'Tasks - Tags Rest API',
//       license: {
//         name: 'Apache 2.0',
//         url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
//       },
//       contact: {
//         email: 'nocompany@gmail.com'
//       }
//     },
//     servers: [
//       {
//         url: 'http://localhost:3002'
//       }
//     ]
//   },
//   apis: [
//     '../contexts/task/infrastructure/task.routes.ts',
//     '../contexts/tag/infrastructure/tag.routes.ts',
//     '../infrastructure/routes.js'
//   ]
// }

// const specs = swaggerJSDoc(options)
// Router().use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

export type ExternalDependencies = TaskExternalDependencies

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getRoutes: GetRoutes = (externalDependencies: ExternalDependencies): Router[] => {
  // Main routes
  return [
    Router().use('/task', taskInjector(externalDependencies)),
    Router().use('/tag', tagInjector(externalDependencies))
  ]
}

export type GetRoutes = (externalDependencies: ExternalDependencies) => Router[]

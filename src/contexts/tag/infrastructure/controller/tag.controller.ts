import { Request, Response } from 'express'
import { ValidationError, validate } from 'jsonschema'
import { AddTagUseCase, GetTagUseCase, GetTagsUseCase } from '../../use-cases'
import { TagNotFoundError } from '../../domains/errors'
import { internal, notFound } from '../../../../infrastructure'

const tagCreateSchema = {
  id: '/Tag',
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    tasks: {
      type: 'array'
    }
  },
  required: ['title']
}

export class TagController {
  constructor(
    private readonly getTagsUseCase: GetTagsUseCase,
    private readonly addTagUseCase: AddTagUseCase,
    private readonly getTagUseCase: GetTagUseCase
  ) {}

  async getTags(req: Request, res: Response) {
    const tags = await this.getTagsUseCase.execute()
    res.status(200).json(tags)
  }

  async addTag(req: Request, res: Response) {
    const result = validate(req.body, tagCreateSchema)
    if (!result.valid) {
      const errors = result.errors.map((error: ValidationError) => {
        return {
          message: error.message
        }
      })
      res.status(400).json(errors)
    }

    const tag = await this.addTagUseCase.execute(req.body)
    res.status(200).json(tag)
  }

  async getTag(req: Request, res: Response) {
    try {
      const tag = await this.getTagUseCase.execute(req.params.id)
      res.status(200).json(tag)
    } catch (error) {
      const httpResponse = convertErrorsToHttpResponse(error)
      res.status(httpResponse.status).json(httpResponse.body)
    }
  }
}

function convertErrorsToHttpResponse(error: unknown) {
  if (error instanceof TagNotFoundError) {
    return notFound({ message: error.message, code: 'tag-not-found', data: { id: error.id } })
  }
  return internal()
}

import { Tag } from '../../domains'
import { TagNotFoundError } from '../../domains/errors'
import { ITagRepository } from '../../infrastructure'

export class GetTagUseCase {
  constructor(private tagRepository: ITagRepository) {}

  async execute(id: string): Promise<Tag> {
    const tag = await this.tagRepository.getTag(id)
    if (!tag) {
      throw new TagNotFoundError(id)
    } else {
      return tag
    }
  }
}

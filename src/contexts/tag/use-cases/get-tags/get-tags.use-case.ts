import { Tag } from '../../domains/types'
import { ITagRepository } from '../../infrastructure'

export class GetTagsUseCase {
  constructor(private tagRepository: ITagRepository) {}

  async execute(): Promise<Tag[]> {
    return this.tagRepository.getAllTags()
  }
}

import { TagCreateRaw, TagRaw, ITagRepository } from '../../../../contexts/tag'
import { Tag } from '../../../../contexts/tag/domains'
import { RelationalDatabase } from '../../database'
import { toTagRaw } from './tag.mapper'

export class TagRepository implements ITagRepository {
  constructor(private readonly database: RelationalDatabase) {}

  async addTag(tag: TagCreateRaw): Promise<TagRaw> {
    const newTag = await this.database.client.tag.create({ data: tag, include: { tasks: true } })
    return toTagRaw(newTag)
  }

  async getAllTags(): Promise<TagRaw[]> {
    const tags = await this.database.client.tag.findMany({ include: { tasks: true } })
    return tags.map(toTagRaw)
  }

  async getTag(id: string): Promise<Tag | null> {
    const tag = await this.database.client.tag.findUnique({ where: { id }, include: { tasks: true } })
    return tag ? toTagRaw(tag) : null
  }
}

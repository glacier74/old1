import { isValid, isValidArray } from '@nily/utils'
import Airtable from 'airtable'

import { RedisService } from '~/service/redis'

const NEXT_AIRTABLE_API_KEY = process.env.NEXT_AIRTABLE_API_KEY as string
const NEXT_AIRTABLE_BASE_ID = process.env.NEXT_AIRTABLE_BASE_ID as string
const NEXT_AIRTABLE_COLLECTION_ID = process.env.NEXT_AIRTABLE_COLLECTION_ID as string
const COLLECTIONS_REDIS_KEY = 'collections'
const REDIS_DURATION = '30s'

export class AirtableService {
  private readonly redisService: RedisService
  private readonly airtable: Airtable

  constructor() {
    this.airtable = new Airtable({
      apiKey: NEXT_AIRTABLE_API_KEY
    })
    this.redisService = new RedisService()
  }

  static init() {
    return new AirtableService()
  }

  async collections() {
    let result = await this.redisService.get<CollectionRecord[]>(COLLECTIONS_REDIS_KEY)

    if (!result) {
      result = await this._records<CollectionRecord>(
        NEXT_AIRTABLE_BASE_ID,
        NEXT_AIRTABLE_COLLECTION_ID,
        1,
        100
      )

      if (isValidArray(result)) {
        await this.redisService.set(COLLECTIONS_REDIS_KEY, result!, REDIS_DURATION)
      }
    }

    return (result || []).filter(r => isValid(r.Slug))
  }

  private async _records<T>(baseId: string, tableId: string, page = 1, limit = 10): Promise<T[]> {
    const result = await this.airtable
      .base(baseId)
      .table(tableId)
      .select({
        pageSize: limit,
        offset: (page - 1) * limit
      })
      .all()

    return result.map(
      r =>
        ({
          id: r.getId(),
          ...r.fields
        } as T)
    )
  }
}

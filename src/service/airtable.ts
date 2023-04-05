import { RedisService } from '~/service/redis'

const redisService = new RedisService()

export class AirtableService {
  static async records<T>(baseId: string, tableId: string) {
    return redisService.get<T[]>(`airtable:${baseId}:${tableId}`, []) as unknown as T[]
  }
}

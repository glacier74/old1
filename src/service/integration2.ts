import { isEmpty, isValidArray } from '@nily/utils'

import { RedisService } from '~/service/redis'
import { BudiBase } from '~/utils/budibase'

const redisService = new RedisService()

const TABLE_ID = 'ta_4d56e915f2f7408795e8716e60e63923'
const CACHE_EXPIRES = process.env.NEXT_BUDIBASE_CACHE_EXPIRES as string
const HOME_URL = process.env.NEXT_BUDIBASE_HOME_URL as string

export class Integration2Service {
  static async categories() {
    const key = 'int:cats'
    let cache = await redisService.get<string[]>(key)

    if (isEmpty(cache)) {
      const res = await BudiBase.get<AnyMap<any>>(`/tables/${TABLE_ID}`)

      cache = res.data.schema.Category.constraints.inclusion
      await redisService.set(key, cache, CACHE_EXPIRES)
    }

    return cache || []
  }

  static async records(category?: string) {
    const key = 'int:records'
    let cache = (await redisService.get<IntegrationRecord[]>(key)) as IntegrationRecord[]

    if (isEmpty(cache)) {
      const res = await BudiBase.post<any>(`/tables/${TABLE_ID}/rows/search`, {
        json: {
          sort: {
            column: 'createdAt',
            order: 'descending',
            type: 'string'
          },
          limit: 9_999
        }
      })

      cache = (res.data as IntegrationRecord[]).map(c => {
        c.LowerCaseCategory = c.Category.toLowerCase()
        c.Logo = isValidArray(c.Logo) ? `${HOME_URL}${(c as any).Logo[0].url}` : undefined

        return c
      })

      await redisService.set(key, cache, CACHE_EXPIRES)
    }

    if (category) {
      return cache.filter(c => c.Category.toLowerCase() === category.toLowerCase())
    }

    return cache
  }

  static async findBySlug(slug: string) {
    const key = `int:slug:${slug}`
    let cache = await redisService.get<IntegrationRecord>(key)

    if (isEmpty(cache)) {
      const res = await BudiBase.post<any>(`/tables/${TABLE_ID}/rows/search`, {
        json: {
          query: {
            equal: {
              slug
            }
          },
          limit: 1
        }
      })

      cache = (res.data as IntegrationRecord[])[0]

      if (cache) {
        cache.LowerCaseCategory = cache.Category.toLowerCase()
        cache.Logo = isValidArray(cache.Logo)
          ? `${HOME_URL}${(cache as any).Logo[0].url}`
          : undefined

        await redisService.set(key, cache, '1h')
      }
    }

    return cache
  }
}

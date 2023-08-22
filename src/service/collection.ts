import { isEmpty } from '@nily/utils'

import { RedisService } from '~/service/redis'
import { BudiBase } from '~/utils/budibase'

const redisService = new RedisService()

const TABLE_ID = 'ta_0c2d8850186d4891ab20fd78e5558706'
const CACHE_EXPIRES = process.env.NEXT_BUDIBASE_CACHE_EXPIRES as string
const STORAGE_URI = process.env.NEXT_PUBLIC_STORAGE_URI as string

export class CollectionService {
  static async records(category?: string) {
    const key = 'col:records'
    let cache = (await redisService.get<CollectionRecord[]>(key)) as CollectionRecord[]

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

      cache = (res.data as CollectionRecord[]).map(c => {
        c.LowerCaseCategory = c.Category.toLowerCase()
        c.Thumbnail = `${STORAGE_URI}/screenshots/${c.Slug}_thumbnail.jpg`

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
    const key = `col:slug:${slug}`
    let cache = await redisService.get<CollectionRecord>(key)

    if (isEmpty(cache)) {
      const res = await BudiBase.post<any>(`/tables/${TABLE_ID}/rows/search`, {
        json: {
          query: {
            equal: {
              Slug: slug
            }
          },
          limit: 1
        }
      })

      cache = (res.data as CollectionRecord[])[0]

      if (cache) {
        cache.LowerCaseCategory = cache.Category.toLocaleLowerCase()
        cache.Screenshot = `${STORAGE_URI}/screenshots/${cache.Slug}.jpg`

        await redisService.set(key, cache, CACHE_EXPIRES)
      }
    }

    return cache
  }
}

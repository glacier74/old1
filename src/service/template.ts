import { isEmpty } from '@nily/utils'

import { RedisService } from '~/service/redis'
import { BudiBase } from '~/utils/budibase'

const redisService = new RedisService()

const TABLE_ID = 'ta_c361b01502004d35965819e0a3a514f9'
const STORAGE_URI = process.env.NEXT_PUBLIC_STORAGE_URI as string

export class TemplateService {
  static async records(category?: string) {
    const key = 'tmpl:records'
    let cache = (await redisService.get<TemplateRecord[]>(key)) as TemplateRecord[]

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

      cache = (res.data as TemplateRecord[]).map(c => {
        c.LowerCaseCategory = c.Category.toLowerCase()
        c.Thumbnail = `${STORAGE_URI}/template/${c.slug}.jpg`

        return c
      })

      await redisService.set(key, cache, '1h')
    }

    if (category) {
      return cache.filter(c => c.Category.toLowerCase() === category.toLowerCase())
    }

    return cache
  }

  static async findBySlug(slug: string) {
    const key = `tmpl:slug:${slug}`
    let cache = await redisService.get<TemplateRecord>(key)

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

      cache = (res.data as TemplateRecord[])[0]

      if (cache) {
        cache.LowerCaseCategory = cache.Category.toLocaleLowerCase()
        cache.Thumbnail = `${STORAGE_URI}/template/${cache.slug}.jpg`

        await redisService.set(key, cache, '1h')
      }
    }

    return cache
  }
}

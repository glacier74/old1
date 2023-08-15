import { isEmpty, isValidArray } from '@nily/utils'

import { RedisService } from '~/service/redis'
import { BudiBase } from '~/utils/budibase'

const redisService = new RedisService()

const TABLE_ID = 'ta_a37de311c55c49a7a7f29dd9cf2e6cd8'
const CACHE_EXPIRES = process.env.NEXT_BUDIBASE_CACHE_EXPIRES as string
const HOME_URL = process.env.NEXT_BUDIBASE_HOME_URL as string

export class TestimonialService {
  static async records() {
    const key = 'tes:records'
    let cache = (await redisService.get<TestimonialRecord[]>(key)) as TestimonialRecord[]

    if (isEmpty(cache)) {
      const res = await BudiBase.post<any>(`/tables/${TABLE_ID}/rows/search`, {
        json: {
          sort: {
            column: 'Date',
            order: 'descending',
            type: 'string'
          },
          limit: 9_999
        }
      })

      cache = (res.data as TestimonialRecord[]).map(c => {
        c.Avatar = isValidArray(c.Avatar) ? `${HOME_URL}${(c as any).Avatar[0].url}` : undefined

        return c
      })

      await redisService.set(key, cache, CACHE_EXPIRES)
    }

    return cache
  }
}

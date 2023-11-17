import { isEmpty } from '@nily/utils'

import { PublicApiService } from './public-api'
import { RedisService } from './redis'

const redisService = new RedisService()

export class JingleBioService {
  static async metadata(productId: number, urls: string[]) {
    const cacheKey = `${productId}:metadata`
    let result: any = await redisService.get(cacheKey)

    if (isEmpty(result)) {
      result = await PublicApiService.metadata(urls)
      await redisService.set(cacheKey, result, '20min')
    }

    return result
  }
}

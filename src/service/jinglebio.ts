import { isEmpty } from '@nily/utils'
import ky from 'ky'

import { RedisService } from '~/service/redis'

const redisService = new RedisService()

const METADATA_API_URL = process.env.NEXT_PUBLIC_METADATA_API_URL as string
const METADATA_API_SECRET = process.env.NEXT_METADATA_API_SECRET as string

export class JingleBioService {
  static async metadata(productId: number, urls: string[]) {
    const cacheKey = `${productId}:metadata`
    let result: any = await redisService.get(cacheKey)

    if (isEmpty(result)) {
      result = await ky
        .post(`${METADATA_API_URL}/v1/website/multiple/metadata`, {
          json: {
            urls
          },
          headers: {
            Authorization: `Bearer ${METADATA_API_SECRET}`
          }
        })
        .json<any[]>()

      await redisService.set(cacheKey, result, '20min')
    }

    return result
  }
}

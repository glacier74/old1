import { date } from '@nily/utils'
import Ioredis from 'ioredis'

const redis = new Ioredis()

export class RedisService {
  public async get<T extends object>(key: string, defaultValue?: T): Promise<T | undefined> {
    const result = await redis.get(key)

    try {
      if (result) {
        return JSON.parse(result)
      }
    } catch {}

    return defaultValue
  }

  public async set(key: string, value: object, duration: string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return redis.set(key, JSON.stringify(value), 'EX', date.seconds(duration))
  }
}

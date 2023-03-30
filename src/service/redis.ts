import { date } from '@nily/utils'
import Ioredis from 'ioredis'

export class RedisService {
  private readonly redis: Ioredis

  constructor() {
    this.redis = new Ioredis()
  }

  public async get<T extends object>(key: string): Promise<T | undefined> {
    const result = await this.redis.get(key)

    try {
      if (result) {
        return JSON.parse(result)
      }
    } catch {}
  }

  public async set(key: string, value: object, duration: string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.redis.set(key, JSON.stringify(value), 'EX', date.seconds(duration))
  }
}

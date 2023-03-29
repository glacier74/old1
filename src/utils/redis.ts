import { date } from '@nily/utils'
import $Redis from 'ioredis'

class Redis {
  private readonly redis: $Redis

  constructor() {
    this.redis = new $Redis({
      host: '127.0.0.1',
      port: 6379
    })
  }

  public async get<T extends object>(key: string) {
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

export const redis = new Redis()

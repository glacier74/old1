export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function timeout(ms: number) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
}

export interface RequestOptions extends RequestInit {
  timeout?: number
  maxRetries?: number
  interval?: number
}

export class RequestError extends Error {
  public data: any

  constructor(data: any) {
    super()
    this.data = data
  }
}

async function $fetch(url: string, options: Omit<RequestOptions, 'maxRetries' | 'interval'>) {
  const response: any = await Promise.race([fetch(url, options), timeout(options.timeout || 5_000)])

  const json = await response.json()

  if (response.status >= 200 && response.status < 301) {
    return json
  } else {
    throw new RequestError(json)
  }
}

export async function request(url: string, options: RequestOptions) {
  let retriesLeft = options.maxRetries || 2
  const interval = retriesLeft * (options.interval || 100)

  while (retriesLeft > 0) {
    try {
      return await $fetch(url, options)
    } catch (error) {
      retriesLeft--

      if (retriesLeft > 0) {
        await sleep(interval)
      } else {
        throw error
      }
    }
  }
}

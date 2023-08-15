import ky, { Options } from 'ky'

const NEXT_BUDIBASE_API_BASE_URL = process.env.NEXT_BUDIBASE_API_BASE_URL as string
const NEXT_BUDIBASE_APP_ID = process.env.NEXT_BUDIBASE_APP_ID as string
const NEXT_BUDIBASE_API_KEY = process.env.NEXT_BUDIBASE_API_KEY as string

const api = ky.extend({
  prefixUrl: NEXT_BUDIBASE_API_BASE_URL,
  headers: {
    'x-budibase-app-id': NEXT_BUDIBASE_APP_ID,
    'x-budibase-api-key': NEXT_BUDIBASE_API_KEY
  }
})

export class BudiBase {
  static get<T>(url: string, options?: Options): Promise<T> {
    return api.get(url.replace(/^\//, ''), options).json()
  }

  static post<T>(url: string, options?: Options): Promise<T> {
    return api.post(url.replace(/^\//, ''), options).json()
  }
}

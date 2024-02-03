import { isValid } from '@nily/utils'

import { axios } from '~/utils/axios'

const DEFAULT_SEARCH_QUERY = 'wallpaper'

export class UnsplashService {
  static async search(
    query?: string,
    page = 1
  ): Promise<{ total: number; totalPages: number; results: UnsplashImage[] }> {
    const _query = isValid(query) ? query : DEFAULT_SEARCH_QUERY

    return axios.get('/unsplash/search', {
      params: {
        query: _query,
        page
      }
    })
  }

  static async trackDownload(downloadUrl: string) {
    return axios.post('/unsplash/track-download', { downloadUrl })
  }
}

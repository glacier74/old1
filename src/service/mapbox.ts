import { axios } from '~/utils'

export interface MapboxPlace {
  placeName: string
  longitude: number
  latitude: number
}

export class MapboxService {
  static async search(query: string): Promise<MapboxPlace[]> {
    return axios.post('/places/search', {
      query
    })
  }
}

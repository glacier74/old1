import { axios } from '~/utils'

const METADATA_API_URL = process.env.NEXT_PUBLIC_METADATA_API_URL as string

export class MetadataService {
  static async fetch(url: string) {
    return axios.get(`${METADATA_API_URL}/v1/website/metadata`, {
      params: {
        url
      }
    })
  }
}

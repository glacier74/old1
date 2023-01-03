import { axios } from '~/utils/axios'

export class ProducthuntService {
  static async badge(slug: string): Promise<ProducthuntBadgeInfo> {
    return axios.get(`/producthunt/${slug}/badge`)
  }
}

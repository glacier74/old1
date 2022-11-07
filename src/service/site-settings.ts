import { axios } from '@/utils'

export class SiteSettingsService {
  static async detail(productId: number): Promise<SiteSettings> {
    return axios.get(`/products/${productId}/site-settings`)
  }

  static async update(productId: number, updates: Partial<SiteSettings>): Promise<void> {
    return axios.patch(`/products/${productId}/site-settings`, updates)
  }
}

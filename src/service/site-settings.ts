import { axios } from '~/utils'

export class SiteSettingsService {
  static async detail(productId: number): Promise<SiteSettings> {
    return axios.get(`/products/${productId}/site-settings`)
  }

  static async updateDraft(
    productId: number,
    updates: Pick<SiteSettings, 'draft' | 'version'>
  ): Promise<Partial<SiteSettings>> {
    return axios.put(`/products/${productId}/site-settings/draft`, updates)
  }

  static async publish(
    productId: number,
    updates: Pick<SiteSettings, 'draft' | 'version'>
  ): Promise<void> {
    return axios.post(`/products/${productId}/site-settings/publish`, updates)
  }

  static async updateSettings(productId: number, updates: Partial<SiteSettings>): Promise<void> {
    return axios.patch(`/products/${productId}/site-settings`, updates)
  }

  static async upgradeSchema(productId: number): Promise<void> {
    return axios.post(`/products/${productId}/site-settings/upgrade`)
  }
}

import { axios } from '~/utils'

export class WebhookService {
  static async create(
    productId: number,
    updates: { type: string; url: string }
  ): Promise<{ webhookId: number }> {
    return axios.post(`/products/${productId}/webhooks`, {
      ...updates,
      type: 'lead_capture'
    })
  }

  static async update(
    productId: number,
    webhookId: number,
    updates: { url?: string; isEnabled?: boolean }
  ) {
    return axios.patch(`/products/${productId}/webhooks/${webhookId}`, updates)
  }

  static async delete(productId: number, webhookId: number) {
    return axios.delete(`/products/${productId}/webhooks/${webhookId}`)
  }

  static async logs(
    productId: number,
    webhookId: number,
    page: number
  ): Promise<{ count: number; logs: WebhookLog[] }> {
    return axios.get(`/products/${productId}/webhooks/${webhookId}`, {
      params: {
        type: 'lead_capture',
        page
      }
    })
  }
}

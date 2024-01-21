import { axios } from '~/utils/axios'

export class SubscriptionService {
  static async checkout(planId: string, interval: string): Promise<{ sessionUrl?: string }> {
    return axios.post('/subscription/checkout', {
      planId,
      interval
    })
  }

  static async cancel() {
    return axios.post('/subscription/cancel')
  }

  static async usage(): Promise<SubscriptionUsage> {
    return axios.get('/subscription/usage')
  }

  static redeem(code: string) {
    return axios.post('/redeem', {
      code
    })
  }
}

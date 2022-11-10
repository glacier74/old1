import { axios } from '~/utils/axios'

export class StripeService {
  static async authorizeUrl(): Promise<{ authorizeUrl: string }> {
    return axios.get('/payment/stripe/authorize-url')
  }

  static async connect(state: string, code: string): Promise<{ accountId: string; email: string }> {
    return axios.post('/payment/stripe/connect', {
      state,
      code
    })
  }

  static async product(stripeProduct: string, stripeAccount: string): Promise<StripeProduct> {
    return axios.post('/payment/stripe/product', {
      stripeProduct,
      stripeAccount
    })
  }
}

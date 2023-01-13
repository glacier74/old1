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

  static async checkout(input: {
    productId: number
    blockId: string
    name?: string
    email: string
    productUrl: string
  }): Promise<{ sessionUrl: string }> {
    return axios.post('/payment/stripe/checkout', input)
  }

  static async createContact(productId: number, blockId: string, name: string, email: string) {
    return axios.put(`/product/${productId}/contacts`, {
      blockId,
      name,
      email
    })
  }
}

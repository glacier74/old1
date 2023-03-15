import { axios } from '~/utils'

interface BaseInput {
  blockId: string
  settingId: string
}

interface CreateContactInput extends BaseInput {
  name: string
  email: string
}

interface CheckoutInput extends BaseInput {
  productUrl: string
  emailCapture?: Pick<CreateContactInput, 'name' | 'email'>
}

export class PublicApiService {
  static async createContact(productId: number, input: CreateContactInput) {
    return axios.put(`/product/${productId}/contacts`, input)
  }

  static async checkout(productId: number, input: CheckoutInput): Promise<{ sessionUrl: string }> {
    return axios.post('/payment/stripe/checkout', {
      productId,
      ...input
    })
  }
}

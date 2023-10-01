import ky from 'ky'

import { axios } from '~/utils/axios'

interface BaseInput {
  blockId: string
  settingId?: string
}

interface CreateEmailCaptureInput extends BaseInput {
  name: string
  email: string
}

interface CreateContactInput extends CreateEmailCaptureInput {
  subject: string
  message: string
}

interface CheckoutInput extends BaseInput {
  productUrl: string
  emailCapture?: Pick<CreateContactInput, 'name' | 'email'>
}

const NEXT_PUBLIC_API_URI = process.env.NEXT_PUBLIC_API_URI as string
const NEXT_API_VERIFICATION_KEY = process.env.NEXT_API_VERIFICATION_KEY as string

export class PublicApiService {
  static async createEmailCapture(productId: number, input: CreateEmailCaptureInput) {
    return axios.put(`/product/${productId}/email-captures`, input)
  }

  static async createContact(productId: number, input: CreateContactInput) {
    return axios.put(`/product/${productId}/contacts`, input)
  }

  static async checkout(productId: number, input: CheckoutInput): Promise<{ sessionUrl: string }> {
    return axios.post('/payment/stripe/checkout', {
      productId,
      ...input
    })
  }

  static async userCount(): Promise<{ count: number }> {
    return ky
      .get(`${NEXT_PUBLIC_API_URI}/users-count`, {
        searchParams: {
          key: NEXT_API_VERIFICATION_KEY
        }
      })
      .json()
  }

  static async user(headers: Headers) {
    return ky
      .get(`${NEXT_PUBLIC_API_URI}/user`, {
        headers
      })
      .json()
  }

  static async product(domain: string): Promise<Product> {
    return ky.get(`${NEXT_PUBLIC_API_URI}/product/${domain}`).json()
  }

  static async verifyToken(productId: number, token: string): Promise<{ verified: boolean }> {
    return ky
      .post(`/product/${productId}/token`, {
        json: {
          token
        }
      })
      .json()
  }
}

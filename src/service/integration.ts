import { axios } from '~/utils'

export class IntegrationService {
  static async list(productId: number): Promise<Integration[]> {
    return axios.get(`/products/${productId}/integrations`)
  }

  static async update(
    productId: number,
    type: string,
    updates: Pick<Integration, 'settings' | 'isEnabled'>
  ) {
    return axios.patch(`/products/${productId}/integrations/${type}`, updates)
  }

  static async delete(productId: number, type: string) {
    return axios.delete(`/products/${productId}/integrations/${type}`)
  }
}

export class MailchimpService {
  static async authorizeUrl(): Promise<{ authorizeUrl: string }> {
    return axios.get('/apps/mailchimp/authorize-url')
  }

  static async connect(productId: number, code: string) {
    return axios.post('/apps/mailchimp/connect', {
      productId,
      code
    })
  }

  static async audiences(productId: number): Promise<MailchimpAudience[]> {
    return axios.post('/apps/mailchimp/audiences', {
      productId
    })
  }
}

export class SendyService {
  static async brands(serverUri: string, apiKey: string): Promise<SendyBrand[]> {
    return axios.post('/apps/sendy/brands', {
      serverUri,
      apiKey
    })
  }

  static async lists(serverUri: string, apiKey: string, brandId: string): Promise<SendyBrand[]> {
    return axios.post('/apps/sendy/lists', {
      serverUri,
      apiKey,
      brandId
    })
  }
}

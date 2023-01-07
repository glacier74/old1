import { axios } from '~/utils'

export class CustomDomainService {
  static async create(productId: number, domain: string): Promise<CustomDomain> {
    return axios.post(`/products/${productId}/domains`, {
      domain
    })
  }

  static async update(productId: number, domainId: number) {
    return axios.patch(`/products/${productId}/domains/${domainId}`)
  }

  static async delete(productId: number, domainId: number) {
    return axios.delete(`/products/${productId}/domains/${domainId}`)
  }
}

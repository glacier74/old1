import { AxiosRequestConfig } from 'axios'
import { axios } from '@/utils/axios'

export class ProductService {
  static async products(config?: AxiosRequestConfig): Promise<Product[]> {
    return axios.get('/products', config)
  }

  static async create(product: Partial<Product>): Promise<number> {
    const result = await axios.post('/products', product)
    return (result as unknown as Product).id
  }

  static async update(productId: number, updates: Partial<Product>): Promise<void> {
    return axios.patch(`/products/${productId}`, updates)
  }

  static async sendInvitation(productId: number, email: string) {
    return axios.post(`/products/${productId}/invitations`, {
      email
    })
  }
}

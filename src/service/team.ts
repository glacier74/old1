import { axios } from '@/utils'
import { AxiosRequestConfig } from 'axios'
import { User } from './user'
import { Product } from './product'

export interface Team {
  id: number
  name: string
  users: User[]
  products: Product[]
  createdAt: string
  updatedAt: string
}

export class TeamService {
  static async teams(config?: AxiosRequestConfig): Promise<Team[]> {
    return axios.get('/teams', config)
  }
}

import { axios } from '@/utils'

export interface User {
  id: number
  name: string
  email: string
  emailVerifiedAt: number
  isEmailVerified: boolean
  avatar: string
  role: string
  createdAt: string
  updatedAt: string
}

export class UserService {
  static async user(): Promise<User> {
    return axios.get('/user')
  }
}

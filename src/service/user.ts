import { axios } from '@/utils/axios'

export class UserService {
  static async user(): Promise<User> {
    return axios.get('/user')
  }
}

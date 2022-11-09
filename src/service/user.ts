import { axios } from '~/utils/axios'

export class UserService {
  static async user(): Promise<User> {
    return axios.get('/user')
  }

  static async update(updates: Partial<User>) {
    return axios.patch('/user', updates)
  }

  static async changeEmail(email: string) {
    return axios.post('/user/email', {
      email
    })
  }

  static async verifyEmail(email: string, code: string) {
    return axios.patch('/user/email', {
      email,
      code
    })
  }

  static async updatePassword(currentPassword: string, password: string) {
    return axios.patch('/user/password', {
      currentPassword,
      password
    })
  }

  static async requestDeletion() {
    return axios.post('/user/deletion')
  }

  static async verifyDeletion(code: string) {
    return axios.put('/user/deletion', {
      code
    })
  }

  static async cancelDeletion() {
    return axios.delete('/user/deletion')
  }
}

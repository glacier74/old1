import { axios } from '@/utils'

export class AuthService {
  static async login(email: string, password: string) {
    await axios.post('/login', {
      email,
      password
    })
  }

  static async signUp(name: string, email: string, password: string) {
    await axios.post('/sign-up', {
      name,
      email,
      password
    })
  }

  static async verify(email: string, code: string) {
    await axios.post('/verify', {
      email,
      code
    })
  }

  static async forgotPassword(email: string) {
    await axios.post('/forgot-password', {
      email
    })
  }

  static async resetPassword(email: string, code: string, password: string) {
    await axios.post('/reset-password', {
      email,
      code,
      password
    })
  }
}

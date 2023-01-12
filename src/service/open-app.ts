import { axios } from '~/utils/axios'

export class OpenAppService {
  static async detail(clientId: string): Promise<OpenApp> {
    return axios.get('/open/app', {
      params: {
        clientId
      }
    })
  }

  static async authorize(
    clientId: string,
    redirectUri: string,
    state?: string
  ): Promise<{ authorizeUrl: string }> {
    return axios.get('/open/oauth/authorize', {
      params: {
        clientId,
        redirectUri,
        state
      }
    })
  }
}

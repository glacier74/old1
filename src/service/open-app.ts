import { axios } from '~/utils/axios'

export class OpenAppService {
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

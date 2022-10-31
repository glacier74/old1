import { AxiosRequestConfig } from 'axios'
import { axios } from '@/utils/axios'

export class TeamService {
  static async teams(config?: AxiosRequestConfig): Promise<Team[]> {
    return axios.get('/teams', config)
  }

  static async sendInvitation(teamId: string, email: string) {
    return axios.post(`/teams/${teamId}/invitations`, {
      email
    })
  }
}

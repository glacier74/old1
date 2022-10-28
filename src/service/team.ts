import { AxiosRequestConfig } from 'axios'
import { axios } from '@/utils/axios'

export class TeamService {
  static async teams(config?: AxiosRequestConfig): Promise<Team[]> {
    return axios.get('/teams', config)
  }
}

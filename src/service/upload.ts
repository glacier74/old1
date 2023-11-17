import { axios } from '~/utils/axios'

export class UploadService {
  static async upload(file: File): Promise<{ downloadURL: string }> {
    const formData = new FormData()
    formData.append('file', file)

    return axios.post('/upload', formData)
  }
}

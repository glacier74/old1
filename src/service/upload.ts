import { axios } from '~/utils/axios'

const uri = process.env.NEXT_PUBLIC_UPLOAD_URI
const bucket = process.env.NEXT_PUBLIC_UPLOAD_BUCKET

export class UploadService {
  static async token(
    filename: string,
    mimeType: string,
    size: number
  ): Promise<{ key: string; token: string }> {
    return axios.post('/upload/token', {
      filename,
      mimeType,
      size
    })
  }

  static async upload(file: File, key: string, token: string) {
    const formData = new FormData()

    formData.append('key', key)
    formData.append('token', token)
    formData.append('file', file)

    return axios.post(`${uri}/v1/upload`, formData)
  }

  static getDownloadURL(key: string) {
    return [uri, bucket, key].join('/')
  }
}

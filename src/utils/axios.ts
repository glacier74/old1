import { isValidArray } from '@nily/utils'
import Axios from 'axios'

const instance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  validateStatus: status => status >= 200 && status < 300,
  withCredentials: true
})

class AxiosError extends Error {
  response: any

  constructor(response: any) {
    const message = isValidArray(response.message)
      ? response.message[0]
      : response.message.toString()

    super(message)
    this.response = response
  }
}

instance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (err) {
    return Promise.reject(err?.response?.data ? new AxiosError(err.response.data) : err)
  }
)

export const axios = instance

export function isResponseError(err: any, errorCode: string) {
  return err.error === errorCode || err.response?.error === errorCode
}

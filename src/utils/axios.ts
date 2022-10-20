import Axios from 'axios'

const instance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  withCredentials: true
})

instance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error?.response?.data || error)
  }
)

export const axios = instance

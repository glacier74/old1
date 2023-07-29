import { EventStreamContentType, fetchEventSource } from '@fortaine/fetch-event-source'
import { AxiosRequestConfig } from 'axios'
import * as dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import * as process from 'process'
import YAML from 'yaml'

import { AuthService } from '~/service/auth'
import { axios } from '~/utils/axios'

dayjs.extend(utc)
dayjs.extend(timezone)

interface CompletionsOptions {
  timeout?: number
  onMessage: (data: AnyMap<any>) => void
  onFinish: (error?: string) => void
}

export class ProductService {
  static async products(config?: AxiosRequestConfig): Promise<Product[]> {
    return axios.get('/products', config)
  }

  static async validateSubdomain(domain: string, productId?: number) {
    return axios.post('/products/subdomain/validate', {
      domain,
      productId
    })
  }

  static async updateSubdomain(productId: number, domain: string) {
    return axios.patch(`/products/${productId}/subdomain`, {
      domain
    })
  }

  static async templates(): Promise<Template[]> {
    return axios.get('/products/templates')
  }

  static async create(product: Partial<Product> & { blocks: any }): Promise<number> {
    const result = await axios.post('/products', {
      ...product,
      // eslint-disable-next-line import/namespace
      timezone: dayjs.tz.guess()
    })
    return (result as unknown as Product).id
  }

  static async update(productId: number, updates: Partial<Product>): Promise<void> {
    return axios.patch(`/products/${productId}`, updates)
  }

  static async sendInvitation(productId: number, email: string) {
    return axios.post(`/products/${productId}/invitations`, {
      email
    })
  }

  static async removeMember(productId: number, memberId: number) {
    return axios.delete(`/products/${productId}/members/${memberId}`)
  }

  static async totalStats(productId: number, date: string, period: string) {
    return axios.get(`/products/${productId}/stats/total-stats`, {
      params: {
        date,
        period
      }
    })
  }

  static async timeseries(productId: number, date: string, period: string): Promise<any[]> {
    return axios.get(`/products/${productId}/stats/timeseries`, {
      params: {
        date,
        period
      }
    })
  }

  static async breakdown(productId: number, params: AnyMap<any>): Promise<any[]> {
    return axios.get(`/products/${productId}/stats/breakdown`, {
      params
    })
  }

  static async requestDeletion(productId: number) {
    return axios.post(`/products/${productId}/deletion`)
  }

  static async verifyDeletion(productId: number, code: string) {
    return axios.put(`/products/${productId}/deletion`, {
      code
    })
  }

  static async invitation(inviteCode: string): Promise<Invitation> {
    return axios.get(`/products/invitations/${inviteCode}`)
  }

  static async join(productId: number, inviteCode: string) {
    return axios.put(`/products/${productId}/members`, {
      inviteCode
    })
  }

  static async payments(
    productId: number,
    page = 1,
    limit = 20
  ): Promise<{ count: number; payments: Payment[] }> {
    return axios.get(`/products/${productId}/payments`, {
      params: {
        page,
        limit
      }
    })
  }

  static async contacts(
    productId: number,
    page = 1,
    limit = 20
  ): Promise<{ count: number; contacts: Contact[] }> {
    return axios.get(`/products/${productId}/contacts`, {
      params: {
        page,
        limit
      }
    })
  }

  static async verifyPassword(productId: number, password: string): Promise<{ token: string }> {
    return axios.post(`/product/${productId}/password`, {
      password
    })
  }

  static async completions(
    productId: number,
    completion: any,
    { timeout = 10_000, onMessage, onFinish }: CompletionsOptions
  ) {
    const controller = new AbortController()
    const requestTimeoutId = setTimeout(() => controller.abort(), timeout)
    let responseText = ''

    await fetchEventSource(`${process.env.NEXT_PUBLIC_API_URI}/products/${productId}/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        completion
      }),
      signal: controller.signal,
      credentials: 'include',

      async onopen(res) {
        clearTimeout(requestTimeoutId)

        if (res.status === 401) {
          await AuthService.logout()
          window.location.href = '/login'
          return
        }

        const contentType = res.headers.get('content-type')

        if (!res.ok || res.status !== 200 || !contentType?.startsWith(EventStreamContentType)) {
          const json = await res.clone().json()

          controller.abort()
          onFinish(json.message)
        }
      },

      onmessage(msg) {
        if (msg.event === 'error') {
          return onFinish(msg.data)
        }

        responseText += msg.data

        try {
          onMessage(YAML.parse(responseText))
        } catch {}
      },

      onclose() {
        controller.abort()
        onFinish()
      },

      onerror(err) {
        onFinish(err.message)
      },

      openWhenHidden: true
    })
  }
}

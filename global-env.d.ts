export {}

declare global {
  import type { NextSeoProps } from 'next-seo'
  import type { ReactNode } from 'react'
  import type { NextPageContext } from 'next'

  type AnyMap<V, K = string> = Record<K, T>
  type StringMap = AnyMap<string>

  interface LayoutProps {
    seo: NextSeoProps
    children: ReactNode
  }

  type NextPageFunction = (context: NextPageContext) => Promise<{ props: AnyMap<any> }>

  interface User {
    id: number
    name: string
    email: string
    emailVerifiedAt: number
    isEmailVerified: boolean
    avatar: string
    role: string
    isDeletionScheduled: boolean
    deletionScheduledAt: any
    isSocialAccount: boolean
    createdAt: string
    updatedAt: string
  }

  interface Team {
    id: number
    name: string
    users: User[]
    products: Product[]
    inviteCode: string
    inviteExpiredAt: string
    createdAt: string
    updatedAt: string
  }

  interface Product {
    id: number
    name: string
    domain: string
    logo: string
    tagline: string
    description: string
    createdAt: string
    updatedAt: string
  }
}

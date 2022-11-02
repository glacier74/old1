import { createContext, useCallback, useContext, useState } from 'react'
import { useVisible } from '@/utils'

interface Store {
  isReady: boolean
  isMemberListShow: boolean
  isAccountSettingsShow: boolean
  isDeletionAlertShow: boolean
  email: string | undefined
  user: User
  products: Product[]
  setIsReady: (value: boolean) => void
  setEmail: (value?: string) => void
  setUser: (value?: any) => void
  updateUser: (updates: Partial<User>) => void
  setProducts: (value?: any) => void
  updateProduct: (productId: number, updates: Partial<Product>) => void
  openMemberList: () => void
  closeMemberList: () => void
  openAccountSettings: () => void
  closeAccountSettings: () => void
  openDeletionAlert: () => void
  closeDeletionAlert: () => void
}

const context = createContext<Store>({} as Store)

export function useStore() {
  return useContext(context)
}

export function StoreProvider({ children }: Omit<LayoutProps, 'seo'>) {
  const [isReady, setIsReady] = useState(false)
  const [email, setEmail] = useState<string | undefined>()
  const [user, setUser] = useState<User>({} as User)
  const [products, setProducts] = useState<Product[]>([])
  const [isMemberListShow, openMemberList, closeMemberList] = useVisible()
  const [isAccountSettingsShow, openAccountSettings, closeAccountSettings] = useVisible()
  const [isDeletionAlertShow, openDeletionAlert, closeDeletionAlert] = useVisible()

  const updateUser = useCallback(
    (updates: Partial<User>) => {
      setUser({ ...user, ...updates })
    },
    [user]
  )

  const updateProduct = useCallback(
    (productId: number, updates: Partial<Product>) => {
      const newValue = products.map(p => {
        if (p.id === productId) {
          return { ...p, ...updates }
        }
        return p
      })

      setProducts(newValue)
    },
    [products]
  )

  const value: Store = {
    isReady,
    isMemberListShow,
    isAccountSettingsShow,
    isDeletionAlertShow,
    email,
    user,
    products,
    setIsReady,
    setEmail,
    setUser,
    updateUser,
    setProducts,
    updateProduct,
    openMemberList,
    closeMemberList,
    openAccountSettings,
    closeAccountSettings,
    openDeletionAlert,
    closeDeletionAlert
  }

  return <context.Provider value={value}>{children}</context.Provider>
}

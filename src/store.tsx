import { createContext, useCallback, useContext, useState } from 'react'

import { useVisible } from '~/utils'

interface Store {
  isReady: boolean
  isMemberListShow: boolean
  isAccountSettingsShow: boolean
  isDeletionAlertShow: boolean
  isSidebarOpen: boolean
  email: string | undefined
  user: User
  products: Product[]
  siteSettings: SiteSettings
  step: number
  setStep: (step: number) => void
  product?: Partial<Product>
  setProduct: (product?: Partial<Product>) => void
  setIsReady: (value: boolean) => void
  setEmail: (value?: string) => void
  setUser: (value?: any) => void
  updateUser: (updates: Partial<User>) => void
  setProducts: (value?: any) => void
  updateProduct: (productId: number, updates: Partial<Product>) => void
  removeProduct: (productId: number) => void
  setSiteSettings: (value: SiteSettings) => void
  updateSiteSettings: (updates: Partial<SiteSettings>) => void
  removeMember: (productId: number, memberId: number) => void
  openMemberList: () => void
  closeMemberList: () => void
  openSidebar: () => void
  closeSidebar: () => void
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
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({} as SiteSettings)
  const [isMemberListShow, openMemberList, closeMemberList] = useVisible()
  const [isAccountSettingsShow, openAccountSettings, closeAccountSettings] = useVisible()
  const [isDeletionAlertShow, openDeletionAlert, closeDeletionAlert] = useVisible()
  const [isSidebarOpen, openSidebar, closeSidebar] = useVisible()
  const [step, setStep] = useState(1)
  const [product, setProduct] = useState<Partial<Product>>()

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

  const removeProduct = useCallback(
    (productId: number) => {
      setProducts(products.filter(p => p.id !== productId))
    },
    [products]
  )

  const updateSiteSettings = useCallback(
    (updates: Partial<SiteSettings>) => setSiteSettings({ ...siteSettings, ...updates }),
    [siteSettings]
  )

  const removeMember = useCallback(
    (productId: number, memberId: number) => {
      const newValue = products.map(p => {
        if (p.id === productId) {
          return { ...p, users: p.users.filter(u => u.id !== memberId) }
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
    isSidebarOpen,
    email,
    user,
    products,
    siteSettings,
    step,
    product,
    setStep,
    setProduct,
    setIsReady,
    setEmail,
    setUser,
    updateUser,
    setProducts,
    updateProduct,
    removeProduct,
    setSiteSettings,
    updateSiteSettings,
    removeMember,
    openMemberList,
    closeMemberList,
    openAccountSettings,
    closeAccountSettings,
    openSidebar,
    closeSidebar,
    openDeletionAlert,
    closeDeletionAlert
  }

  return <context.Provider value={value}>{children}</context.Provider>
}

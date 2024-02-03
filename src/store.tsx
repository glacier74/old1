import { createContext, useCallback, useContext, useState } from 'react'

import { isMobile } from '~/layout/builder3/utils'
import { useVisible } from '~/utils'

interface Store {
  isReady: boolean
  isMemberListShow: boolean
  isAccountSettingsShow: boolean
  isDeletionAlertShow: boolean
  isSidebarOpen: boolean
  isBuilderSidebarOpen: boolean
  email: string | undefined
  user: User
  products: Product[]
  siteSettings: SiteSettings
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
  openBuilderSidebar: () => void
  closeBuilderSidebar: () => void
  isAIModalOpen: boolean
  isAIModalClosable: boolean
  openAIModal: () => void
  closeAIModal: () => void
  setAIModalClosable: (isAIModalClosable: boolean) => void
  isCodeInjectionModalOpen: boolean
  openCodeInjectionModal: () => void
  closeCodeInjectionModal: () => void
  updateMember: (productId: number, members: Partial<User>[]) => void
  isThemeModalOpen: boolean
  openThemeModal: () => void
  closeThemeModal: () => void
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
  const [product, setProduct] = useState<Partial<Product>>()
  const [isBuilderSidebarOpen, openBuilderSidebar, closeBuilderSidebar] = useVisible(!isMobile())
  const [isAIModalOpen, openAIModal, closeAIModal] = useVisible()
  const [isAIModalClosable, setAIModalClosable] = useState(true)
  const [isCodeInjectionModalOpen, openCodeInjectionModal, closeCodeInjectionModal] = useVisible()
  const [isThemeModalOpen, openThemeModal, closeThemeModal] = useVisible()

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

  function updateSiteSettings(updates: Partial<SiteSettings>) {
    setSiteSettings(s => ({ ...s, ...updates }))
  }

  const updateMember = useCallback(
    (productId: number, members: Partial<User>[]) => {
      const newValue = products.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            users: p.users?.map(u => {
              const member = members.find(m => m.id === u.id)

              if (member) {
                return {
                  ...u,
                  ...member
                }
              }

              return u
            })
          }
        }

        return p
      })

      setProducts(newValue)
    },
    [products]
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
    isBuilderSidebarOpen,
    email,
    user,
    products,
    siteSettings,
    product,
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
    closeDeletionAlert,
    openBuilderSidebar,
    closeBuilderSidebar,
    isAIModalOpen,
    openAIModal,
    closeAIModal,
    isAIModalClosable,
    setAIModalClosable,
    isCodeInjectionModalOpen,
    openCodeInjectionModal,
    closeCodeInjectionModal,
    isThemeModalOpen,
    openThemeModal,
    closeThemeModal,
    updateMember
  }

  return <context.Provider value={value}>{children}</context.Provider>
}

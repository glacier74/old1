import { createContext, useContext, useState } from 'react'
import { useVisible } from '@/utils'

interface Store {
  isReady: boolean
  isMemberListShow: boolean
  isAccountSettingsShow: boolean
  email: string | undefined
  user: User
  teams: Team[]
  setIsReady: (value: boolean) => void
  setEmail: (value?: string) => void
  setUser: (value?: any) => void
  setTeams: (value?: any) => void
  openMemberList: () => void
  closeMemberList: () => void
  openAccountSettings: () => void
  closeAccountSettings: () => void
}

const context = createContext<Store>({} as Store)

export function useStore() {
  return useContext(context)
}

export function StoreProvider({ children }: Omit<LayoutProps, 'seo'>) {
  const [isReady, setIsReady] = useState(false)
  const [email, setEmail] = useState<string | undefined>()
  const [user, setUser] = useState<User>({} as User)
  const [teams, setTeams] = useState<Team[]>([])
  const [isMemberListShow, openMemberList, closeMemberList] = useVisible()
  const [isAccountSettingsShow, openAccountSettings, closeAccountSettings] = useVisible()

  const value: Store = {
    isReady,
    isMemberListShow,
    isAccountSettingsShow,
    email,
    user,
    teams,
    setIsReady,
    setEmail,
    setUser,
    setTeams,
    openMemberList,
    closeMemberList,
    openAccountSettings,
    closeAccountSettings
  }

  return <context.Provider value={value}>{children}</context.Provider>
}

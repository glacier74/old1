import { createContext, useContext, useState } from 'react'

interface Store {
  isReady: boolean
  email: string | undefined
  user: User
  teams: Team[]
  setIsReady: (value: boolean) => void
  setEmail: (value?: string) => void
  setUser: (value?: any) => void
  setTeams: (value?: any) => void
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

  const value: Store = {
    isReady,
    email,
    user,
    teams,
    setIsReady,
    setEmail,
    setUser,
    setTeams
  }

  return <context.Provider value={value}>{children}</context.Provider>
}

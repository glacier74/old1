import { ReactNode, createContext, useContext } from 'react'

interface IState {
  reload: () => void
}

interface IntegrationsProviderProps {
  reload: () => void
  children: ReactNode
}

const context = createContext<IState>({} as IState)

export function useIntegrationsContext() {
  return useContext(context)
}

export function IntegrationsProvider({ reload, children }: IntegrationsProviderProps) {
  const value: IState = {
    reload
  }

  return <context.Provider value={value}>{children}</context.Provider>
}

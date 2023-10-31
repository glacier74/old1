import { createContext, useContext } from 'react'

interface IState {
  productId: number
  isPreview?: boolean
  widgetId?: string
  songId?: string
}

export const GlobalContext = createContext<IState>({} as IState)

export function useGlobalContext(): IState {
  return useContext(GlobalContext)
}

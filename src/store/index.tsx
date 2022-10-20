import { enableStaticRendering } from 'mobx-react-lite'
import { AuthStore } from './auth'
import { createContext, ReactNode, useContext } from 'react'

enableStaticRendering(typeof window === 'undefined')

export interface Store {
  authStore: AuthStore
}

function initialStore() {
  return Object.freeze({
    authStore: new AuthStore()
  })
}

let store: Store
export const StoreContext = createContext({} as Store)

interface StoreProviderProps {
  children: ReactNode
  initialState?: AnyMap<any>
}

function initializeStore(initialState?: AnyMap<any>) {
  const _store = store ?? initialStore()

  // If your page has Next.js data fetching methods that use a Mobx store, it will get hydrated here
  if (initialState) {
    Object.values(_store).forEach((s: any) => {
      s.hydrate?.(initialState)
    })
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') {
    return _store
  }

  // Create the store once in the client
  if (!store) {
    store = _store
  }

  return _store
}

export function StoreProvider({ children, initialState }: StoreProviderProps) {
  const store = initializeStore(initialState)

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export function useStore<T extends keyof Store>(storeName: T): typeof store[T] {
  const stores = useStoreContext

  return stores[storeName]
}

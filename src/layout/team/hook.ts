import { useStore } from '@/store'
import { useParam } from '@/utils'
import { isEqual, isValidArray } from '@nily/utils'
import { useMemo } from 'react'

export function useProductId() {
  return useParam('id') as string
}

export function useTeams() {
  const store = useStore()
  const productId = useProductId()

  const teams = useMemo(() => store.teams.filter(t => isValidArray(t.products)), [store.teams])
  const team = useMemo(
    () => teams.find(t => t.products.some(p => isEqual(p.id, productId))),
    [productId, teams]
  )

  return {
    team,
    teams
  }
}

export function useProduct() {
  const { team } = useTeams()
  return team?.products[0]
}

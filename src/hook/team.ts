import { useStoreContext } from '@/store'
import { useMemo } from 'react'
import { isEqual, isValidArray } from '@nily/utils'
import { useParam } from '@/hook/param'

export function useTeam() {
  const { state } = useStoreContext()
  const productId = useParam('id')

  const teams = useMemo(() => state.teams.filter(t => isValidArray(t.products)), [state.teams])
  const current = useMemo(
    () => state.teams.find(t => t.products.some(p => isEqual(p.id, productId))),
    [productId, state.teams]
  )

  return {
    current,
    teams
  }
}

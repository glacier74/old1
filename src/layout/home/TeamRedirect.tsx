import { useRouter } from 'next/router'
import { Loading } from '@/components'
import { TeamService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect } from '@/utils'

export function TeamRedirect() {
  const router = useRouter()
  const { setTeams } = useStore()

  useAsyncEffect(async () => {
    try {
      const teams = await TeamService.teams()
      setTeams(teams)

      if (teams.length > 0) {
        router.replace(`/product/${teams[0].products[0].id}`)
      } else {
        router.replace('/onboarding')
      }
    } catch (err: any) {
      if (err.statusCode === 401) {
        // TODO 调用 logout 接口
        router.replace('/login')
      }
    }
  }, [])

  return <Loading />
}

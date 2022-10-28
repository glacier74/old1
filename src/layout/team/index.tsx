import { useStore } from '@/store'
import { useAsyncEffect } from '@/utils'
import { BaseLayout } from '../BaseLayout'
import { Sidebar } from './sidebar'
import { TeamService, UserService } from '@/service'

export function TeamLayout({ seo, children }: LayoutProps) {
  const { setIsReady, setUser, setTeams } = useStore()

  useAsyncEffect(async () => {
    const [user, teams] = await Promise.all([UserService.user(), TeamService.teams()])

    setUser(user)
    setTeams(teams)
    setIsReady(true)
  }, [])

  return (
    <BaseLayout seo={seo}>
      <div className="w-full min-h-screen bg-white">
        <Sidebar />

        <div className="container min-h-screen">
          <main className="relative z-0 focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 md:px-8">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </BaseLayout>
  )
}

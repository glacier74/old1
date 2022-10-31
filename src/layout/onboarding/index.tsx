import { AuthLayout } from '@/layout'
import { LoggedAccount } from './LoggedAccount'
import { useStore } from '@/store'
import { useAsyncEffect } from '@/utils'
import { UserService } from '@/service'

export function OnboardingLayout({ seo, children }: LayoutProps) {
  const { setUser } = useStore()

  useAsyncEffect(async () => {
    setUser(await UserService.user())
  }, [])

  return (
    <AuthLayout seo={seo}>
      <LoggedAccount />
      {children}
    </AuthLayout>
  )
}

import { AuthorizedLayout } from '@/layout'
import { LoggedAccount } from './LoggedAccount'

export function OnboardingLayout({ seo, children }: LayoutProps) {
  return (
    <AuthorizedLayout seo={seo}>
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <LoggedAccount />
          {children}
        </div>
      </div>
    </AuthorizedLayout>
  )
}

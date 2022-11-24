import { BaseLayout } from '~/layout'

export function LoginLayout({ seo, children }: LayoutProps) {
  return (
    <BaseLayout seo={seo}>
      <div className="min-h-screen bg-amber-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">{children}</div>
      </div>
    </BaseLayout>
  )
}

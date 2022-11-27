import { BaseLayout } from '~/layout'

export function HomeLayout({ seo, children }: LayoutProps): JSX.Element {
  return (
    <BaseLayout seo={seo}>
      <div className="home-container">{children}</div>
    </BaseLayout>
  )
}

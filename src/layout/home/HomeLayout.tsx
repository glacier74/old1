import Head from 'next/head'

import { HelpFloatButton } from '~/components'
import { BaseLayout } from '~/layout'

export function HomeLayout({
  seo,
  isHelpButtonShow = true,
  children
}: LayoutProps & { isHelpButtonShow?: boolean }): JSX.Element {
  return (
    <BaseLayout
      seo={{
        ...seo,
        noindex: false,
        nofollow: false
      }}
    >
      <Head>
        <meta name="theme-color" content="#09092f" />
      </Head>
      <div className="home-container">{children}</div>

      {isHelpButtonShow && <HelpFloatButton />}
    </BaseLayout>
  )
}

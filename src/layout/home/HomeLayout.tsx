import Head from 'next/head'

import { BaseLayout } from '~/layout'

export function HomeLayout({ seo, children }: LayoutProps): JSX.Element {
  return (
    <BaseLayout seo={seo}>
      <Head>
        <meta name="theme-color" content="#09092f" />
      </Head>
      <div className="home-container">{children}</div>
    </BaseLayout>
  )
}

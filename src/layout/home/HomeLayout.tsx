import Head from 'next/head'

import { IconDiscord } from '~/components'
import { BaseLayout } from '~/layout'

export function HomeLayout({ seo, children }: LayoutProps): JSX.Element {
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

      <div className="fixed bottom-4 right-4 z-10">
        <a
          href="https://vue.mx/discord"
          target="_blank"
          rel="noreferrer"
          aria-label="Join Discord server"
        >
          <IconDiscord />
        </a>
      </div>
    </BaseLayout>
  )
}

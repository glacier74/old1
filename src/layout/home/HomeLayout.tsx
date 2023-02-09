import Head from 'next/head'

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
        <a href="https://discord.gg/ZCwzSnnkDZ" target="_blank" aria-label="Join Discord server">
          <img src="/static/discord.svg" alt="Join Discord server" />
        </a>
      </div>
    </BaseLayout>
  )
}

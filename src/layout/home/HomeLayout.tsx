import Head from 'next/head'
import Script from 'next/script'

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

      <Script
        dangerouslySetInnerHTML={{
          __html: `
          window.$crisp=[];window.CRISP_WEBSITE_ID="d57ec6f7-1ed8-4b02-bd44-add83a2eff72";(function(){ d=document;s=d.createElement("script"); s.src="https://client.crisp.chat/l.js"; s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`
        }}
      />
    </BaseLayout>
  )
}

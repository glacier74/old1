import Head from 'next/head'
import Script from 'next/script'

import { BaseLayout } from '~/layout'

export function HomeLayout({ seo, children }: LayoutProps): JSX.Element {
  return (
    <BaseLayout seo={seo}>
      <Head>
        <meta name="theme-color" content="#09092f" />
      </Head>
      <div className="home-container">{children}</div>

      <Script
        dangerouslySetInnerHTML={{
          __html: `
          (function(d,t) {
            var BASE_URL="https://chat.earlybird.im";
            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=BASE_URL+"/packs/js/sdk.js";
            g.defer = true;
            g.async = true;
            s.parentNode.insertBefore(g,s);
            g.onload=function(){
              window.chatwootSDK.run({
                websiteToken: 'jiVN6eVixD2uwhy5ac8yKqGH',
                baseUrl: BASE_URL
              })
            }
          })(document,"script");`
        }}
      />
    </BaseLayout>
  )
}

import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Suspense } from 'react'

import '~/globals.scss'
import { StoreProvider } from '~/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Suspense fallback={<></>}>
        <Head>
          <meta httpEquiv="x-dns-prefetch-control" content="on" />
          <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_STORAGE_URI} />
          <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_URI} />
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
          <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
          <meta content="width=device-width,initial-scale=1" name="viewport" />
          <meta content="yes" name="mobile-web-app-capable" />
          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta content="white" name="apple-mobile-web-app-status-bar-style" />
          <meta content="telephone=no,email=no" name="format-detection" />
        </Head>
        <Component {...pageProps} />
      </Suspense>
    </StoreProvider>
  )
}

export default appWithTranslation(MyApp)

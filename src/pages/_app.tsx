import { Inter } from '@next/font/google'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Suspense } from 'react'

import '~/globals.scss'
import { StoreProvider } from '~/store'

const inter = Inter()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Suspense fallback={<></>}>
        <Head>
          <meta httpEquiv="x-dns-prefetch-control" content="on" />
          <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
          <meta content="width=device-width,initial-scale=1" name="viewport" />
          <meta name="theme-color" content="#fff" />
          <meta content="yes" name="mobile-web-app-capable" />
          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta content="EarlyBird" name="application-name" />
          <meta content="EarlyBird" name="apple-mobile-web-app-title" />
          <meta content="white" name="apple-mobile-web-app-status-bar-style" />
          <meta content="telephone=no,email=no" name="format-detection" />
        </Head>
        <div className={inter.className}>
          <Component {...pageProps} />
        </div>
      </Suspense>
    </StoreProvider>
  )
}

export default appWithTranslation(MyApp)

import '@/styles/globals.scss'
import { AppProps } from 'next/app'
import { Suspense, useMemo, useReducer } from 'react'
import Head from 'next/head'
import '@/locales'
import { StoreReducer, StoreContext } from '@/store'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [state, dispatch] = useReducer(StoreReducer, {
    isReady: false,
    teams: []
  })
  const storeValue = useMemo(() => ({ state, dispatch }), [state])

  return (
    <StoreContext.Provider value={storeValue}>
      <Suspense fallback={<></>}>
        <Head>
          <meta httpEquiv="x-dns-prefetch-control" content="on" />
          <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
          <meta content="width=device-width,initial-scale=1" name="viewport" />
          <meta name="theme-color" content="#fff" />
          <meta content="yes" name="mobile-web-app-capable" />
          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta content="EarlyBird" name="application-name" />
          <meta content="white" name="apple-mobile-web-app-status-bar-style" />
          <meta content="HeyForm" name="apple-mobile-web-app-title" />
          <meta content="telephone=no,email=no" name="format-detection" />
        </Head>
        <Component {...pageProps} />
      </Suspense>
    </StoreContext.Provider>
  )
}

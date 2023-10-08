import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { Suspense } from 'react'

import { StoreProvider } from '~/store'
import '~/styles/components.scss'
import '~/styles/globals.scss'

const inter = Inter({ subsets: ['latin'] })

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
          <style
            dangerouslySetInnerHTML={{
              __html: `:root { --font-inter: ${inter.style.fontFamily} }`
            }}
          />
        </Head>
        <Component {...pageProps} />
      </Suspense>
    </StoreProvider>
  )
}

export default appWithTranslation(MyApp)

import '@/styles/globals.css'
import { AppProps } from 'next/app'
import { Suspense } from 'react'
import '@/locales'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Suspense fallback={<></>}>
      <Component {...pageProps} />
    </Suspense>
  )
}

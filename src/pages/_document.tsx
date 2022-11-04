import { type DocumentProps, Head, Html, Main, NextScript } from 'next/document'
import i18nextConfig from '../../next-i18next.config'

export default function MyDocument(props: DocumentProps) {
  const currentLocale = props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale

  return (
    <Html lang={currentLocale}>
      <Head>
        <link type="image/x-icon" href="/static/favicon.png" rel="icon" />
        <link type="image/x-icon" href="/static/favicon.png" rel="bookmark" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

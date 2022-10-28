import { type DocumentProps, Head, Html, Main, NextScript } from 'next/document'
import i18nextConfig from '../../next-i18next.config'

export default function MyDocument(props: DocumentProps) {
  const currentLocale = props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale

  return (
    <Html lang={currentLocale}>
      <Head>
        <link type="image/x-icon" href="/static/favicon.png" rel="icon" />
        <link type="image/x-icon" href="/static/favicon.png" rel="bookmark" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

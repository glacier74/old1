import { type DocumentProps, Head, Html, Main, NextScript } from 'next/document'

import i18nextConfig from '../../next-i18next.config'

export default function MyDocument(props: DocumentProps) {
  const lang =
    props.__NEXT_DATA__.props.pageProps.locale ||
    props.__NEXT_DATA__.locale ||
    i18nextConfig.i18n.defaultLocale

  return (
    <Html lang={lang}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

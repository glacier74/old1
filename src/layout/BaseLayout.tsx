import { isEmpty } from '@nily/utils'
import JsCookie from 'js-cookie'
import { useTranslation } from 'next-i18next'
import { NextSeo, NextSeoProps } from 'next-seo'
import Head from 'next/head'
import { useEffect } from 'react'

import { getBrowserId, setBrowserId } from '~/utils'

export function BaseLayout({
  favicon,
  shortName = 'EarlyBird',
  seo,
  children
}: LayoutProps): JSX.Element {
  const { t } = useTranslation()

  const seoProps: NextSeoProps = {
    title: t('common.name'),
    description: t('common.description'),
    ...seo
  }

  // Make sure that there is a browser id cookie to prevent login errors.
  useEffect(() => {
    const browserId = getBrowserId(JsCookie)

    if (isEmpty(browserId)) {
      setBrowserId(JsCookie)
    }
  }, [])

  return (
    <>
      <Head>
        <meta content={shortName} name="application-name" />
        <meta content={shortName} name="apple-mobile-web-app-title" />
        {favicon ? (
          <>
            <link rel="icon" type="image/png" href={favicon} />
          </>
        ) : (
          <>
            <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
            <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
          </>
        )}
      </Head>

      {/* SEO */}
      <NextSeo {...seoProps} />

      {/* HTML */}
      {children}
    </>
  )
}

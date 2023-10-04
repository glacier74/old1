import { isEmpty } from '@nily/utils'
import JsCookie from 'js-cookie'
import { useTranslation } from 'next-i18next'
import { NextSeo, NextSeoProps } from 'next-seo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'

import { getBrowserId, getHomeURL, getPageURL, setBrowserId } from '~/utils'
import { i18n } from '~i18next-config'

const OG_IMAGE_URL = 'https://storage.earlybird.im/static/og.png'

export function BaseLayout({ seo, children }: LayoutProps): JSX.Element {
  const { t } = useTranslation()
  const router = useRouter()

  const locale = router.locale || i18n.defaultLocale
  const url = getPageURL(seo?.url || '/', locale)

  const seoProps: NextSeoProps = {
    title: t('appName'),
    description: t('appDescription'),
    noindex: true,
    nofollow: true,
    ...seo,
    canonical: url,
    openGraph: {
      type: 'website',
      title: seo?.title || t('appName'),
      description: seo?.description || t('appDescription'),
      ...seo?.openGraph,
      url,
      images: [
        {
          url: OG_IMAGE_URL
        }
      ]
    },
    twitter: {
      site: '@EarlyBirdIM',
      cardType: 'summary_large_image'
    }
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
        <meta content={t('appName')} name="application-name" />
        <meta content={t('appName')} name="apple-mobile-web-app-title" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />

        <meta httpEquiv="Content-Language" content={locale} />

        {i18n.locales.map(row => (
          <link key={row} href={getHomeURL(row)} hrefLang={row} rel="alternate" />
        ))}

        {/* Twitter missing meta for next-seo */}
        <meta property="twitter:title" content={t('appName')} />
        <meta property="twitter:description" content={t('appDescription')} />
        <meta property="twitter:image" content={OG_IMAGE_URL} />
      </Head>

      {/* SEO */}
      <NextSeo {...seoProps} />

      {/* HTML */}
      <div>{children}</div>

      <Script data-domain="earlybird.im" src="https://analytics.heyform.net/js/plausible.js" />
    </>
  )
}

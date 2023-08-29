import { isEmpty } from '@nily/utils'
import JsCookie from 'js-cookie'
import { useTranslation } from 'next-i18next'
import { NextSeo, NextSeoProps } from 'next-seo'
import Head from 'next/head'
import Script from 'next/script'
import { useEffect } from 'react'

import { getBrowserId, setBrowserId } from '~/utils'

const NEXT_PUBLIC_HOMEPAGE = process.env.NEXT_PUBLIC_HOMEPAGE!

export function BaseLayout({ seo, children }: LayoutProps): JSX.Element {
  const { t } = useTranslation()
  const url = seo?.url ? NEXT_PUBLIC_HOMEPAGE.replace(/\/$/, '') + seo.url : undefined

  const seoProps: NextSeoProps = {
    title: t('common.name'),
    description: t('common.description'),
    noindex: true,
    nofollow: true,
    ...seo,
    openGraph: {
      type: 'website',
      title: seo?.title || t('common.name'),
      description: seo?.description || t('common.description'),
      ...seo?.openGraph,
      url,
      images: [
        {
          url: 'https://storage.earlybird.im/static/og-image.png'
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
        <meta content={t('common.shortName')} name="application-name" />
        <meta content={t('common.shortName')} name="apple-mobile-web-app-title" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
      </Head>

      {/* SEO */}
      <NextSeo {...seoProps} />

      {/* HTML */}
      <div>{children}</div>

      <Script data-domain="earlybird.im" src="https://analytics.heyform.net/js/plausible.js" />
    </>
  )
}

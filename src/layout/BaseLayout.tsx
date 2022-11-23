import { useTranslation } from 'next-i18next'
import { NextSeo, NextSeoProps } from 'next-seo'
import Head from 'next/head'

export function BaseLayout({
  favicon = '/static/favicon.png',
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

  return (
    <>
      <Head>
        <meta content={shortName} name="application-name" />
        <meta content={shortName} name="apple-mobile-web-app-title" />
        <link type="image/x-icon" href={favicon} rel="icon" />
        <link type="image/x-icon" href={favicon} rel="bookmark" />
      </Head>

      {/* SEO */}
      <NextSeo {...seoProps} />

      {/* HTML */}
      {children}
    </>
  )
}

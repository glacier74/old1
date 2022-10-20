import { ReactNode } from 'react'
import Head from 'next/head'
import { NextSeo, NextSeoProps } from 'next-seo'
import { useTranslation } from 'react-i18next'

interface PageProps {
  seo: NextSeoProps
  children: ReactNode
}

export const Page = ({ seo, children }: PageProps): JSX.Element => {
  const { t } = useTranslation()

  const seoProps: NextSeoProps = {
    title: t('app.name'),
    description: t('app.description'),
    ...seo
  }

  return (
    <>
      <Head>
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link type="image/x-icon" href="/static/favicon.png" rel="icon" />
        <link type="image/x-icon" href="/static/favicon.png" rel="bookmark" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <meta name="theme-color" content="#fff" />
        <meta content="yes" name="mobile-web-app-capable" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="EarlyBird" name="application-name" />
        <meta content="white" name="apple-mobile-web-app-status-bar-style" />
        <meta content="HeyForm" name="apple-mobile-web-app-title" />
        <meta content="telephone=no,email=no" name="format-detection" />
      </Head>

      {/* SEO */}
      <NextSeo {...seoProps} />

      {/* HTML */}
      {children}
    </>
  )
}

export const AuthPage = ({ seo, children }: PageProps): JSX.Element => {
  return (
    <Page seo={seo}>
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">{children}</div>
      </div>
    </Page>
  )
}

import { isValid } from '@nily/utils'
import { useTranslation } from 'next-i18next'
import { NextSeo, NextSeoProps } from 'next-seo'
import Head from 'next/head'

import { THEMES } from '~/constants'
import { fontLink, themeToStyle } from '~/layout/builder/utils'

import { PublicSiteIntegration } from './PublicSiteIntegration'

export function PublicSiteLayout({
  favicon,
  shortName,
  seo,
  theme: rawTheme,
  integrations = [],
  children
}: PublicSiteLayoutProps): JSX.Element {
  const { t } = useTranslation()

  const seoProps: NextSeoProps = {
    title: t('common.name'),
    description: t('common.description'),
    ...seo
  }
  const theme = isValid(rawTheme) ? rawTheme! : THEMES[0]

  return (
    <>
      <Head>
        <meta content={shortName} name="application-name" />
        <meta content={shortName} name="apple-mobile-web-app-title" />
        <link rel="stylesheet" href={fontLink(theme.fontFamily)} />
        <style
          dangerouslySetInnerHTML={{ __html: themeToStyle(theme, { bodyBackground: true }) }}
        />
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

        {integrations.map(integration => (
          <PublicSiteIntegration key={integration.type} integration={integration} />
        ))}
      </Head>

      {/* SEO */}
      <NextSeo {...seoProps} />

      {/* HTML */}
      {children}
    </>
  )
}

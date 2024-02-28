import { isValid } from '@nily/utils'
import { NextSeo } from 'next-seo'
import Head from 'next/head'

import { THEMES } from '~/constants'
import { fontLink, themeToStyle } from '~/layout/builder/utils'
import { InjectBodyCode, InjectHeadCode } from '~/layout/public-site/PublicSiteDangerouslyHTML'

import { PublicSiteIntegration } from './PublicSiteIntegration'

export function PublicSiteLayout({
  favicon,
  shortName,
  seo,
  schema,
  theme: rawTheme,
  integrations = [],
  customCode,
  children
}: PublicSiteLayoutProps): JSX.Element {
  const theme = isValid(rawTheme) ? rawTheme! : THEMES[0]

  return (
    <>
      <Head>
        <meta content={shortName} name="application-name" />
        <meta content={shortName} name="apple-mobile-web-app-title" />

        {schema === 1 && (
          <>
            <link rel="stylesheet" href={fontLink(theme.fontFamily)} />
            <style
              dangerouslySetInnerHTML={{ __html: themeToStyle(theme, { bodyBackground: true }) }}
            />
          </>
        )}

        {favicon ? (
          <link rel="icon" type="image/png" href={favicon} />
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
      <NextSeo {...seo} />

      {/* Inject custom code */}
      <InjectHeadCode code={customCode} />

      {/* HTML */}
      {children}

      {/* Inject custom code */}
      <InjectBodyCode code={customCode} />
    </>
  )
}

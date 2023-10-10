import { isValid } from '@nily/utils'
import { default as acceptLanguage } from 'accept-language'
import type { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { getCookie } from '~/utils/cookie'
import { getPageURL } from '~/utils/route'
import { i18n } from '~i18next-config'

// Allowed locales
acceptLanguage.languages(i18n.locales)

// Locale cookie name
const LOCALE_COOKIE_NAME = process.env.NEXT_PUBLIC_LOCALE_COOKIE_NAME as string

interface WithTranslationsOptions {
  redirectOnLocale: boolean
}

const HOMEPAGE_REGEX = /(^\/$)|(^\/\?.+)/

function isHomePage(asPath: string) {
  return HOMEPAGE_REGEX.test(asPath)
}

export function withTranslations(
  nextPageFunction: NextPageFunction,
  namespaces = ['common'],
  options?: WithTranslationsOptions
) {
  return async (context: NextPageContext) => {
    const pageData = await nextPageFunction(context)

    if (pageData.notFound) {
      return pageData
    }

    let locale = context.locale || i18n.defaultLocale

    if (context.req) {
      const cookieLocale = getCookie((context.req as any).cookies, LOCALE_COOKIE_NAME)!
      const browserLocale = acceptLanguage.get((context.req as any).headers['accept-language'])!
      const contextLocale = context.locale!

      if (options?.redirectOnLocale) {
        let locale: string | undefined
        const asPath = (context as any).resolvedUrl

        // 首页在登录时不跳转到其他语言
        if (!(isHomePage(asPath) && pageData.props?.isLoggedIn)) {
          if (isValid(cookieLocale)) {
            if (cookieLocale !== contextLocale) {
              locale = cookieLocale
            }
          } else {
            if (browserLocale !== contextLocale) {
              locale = browserLocale
            }
          }

          if (locale) {
            return {
              redirect: {
                permanent: false,
                destination: getPageURL(asPath, locale)
              }
            }
          }
        }
      }

      locale = isValid(cookieLocale) ? cookieLocale : browserLocale || i18n.defaultLocale
    }

    return {
      props: {
        locale,
        ...(await serverSideTranslations(locale, namespaces)),
        ...pageData.props
      }
    }
  }
}

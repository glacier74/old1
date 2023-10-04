import { qs } from '@nily/utils'
import { NextRequest } from 'next/server'
import { pathToRegexp } from 'path-to-regexp'
import isFQDN from 'validator/lib/isFQDN'

import { i18n } from '~i18next-config'

const routeRegexps: AnyMap<RegExp> = {}

function getRouteRegex(route: string) {
  if (!routeRegexps[route]) {
    routeRegexps[route] = pathToRegexp(route)
  }

  return routeRegexps[route]
}

export function isMatchRoutes(req: NextRequest, routes: string[]) {
  return routes.some(m => getRouteRegex(m).test(req.nextUrl.pathname))
}

export function urlBuilder(uri: string, query: AnyMap<string>) {
  return uri + (uri.includes('?') ? '&' : '?') + qs.stringify(query)
}

export function getSubdomain(domain: string) {
  if (!isValidDomain(domain)) {
    return
  }

  const arr = domain.split('.')

  if (arr.length === 2) {
    return 'www'
  }

  return arr[0]
}

export function getDomainName(domain: string) {
  if (!isValidDomain(domain)) {
    return
  }

  const arr = domain.split('.')

  if (arr.length === 2) {
    return '@'
  }

  return arr[0]
}

export function isRootDomain(domain: string) {
  return isValidDomain(domain) && domain.split('.').length === 2
}

export function isValidDomain(domain: string) {
  if (
    !isFQDN(domain, {
      allow_underscores: true,
      allow_numeric_tld: true,
      allow_wildcard: true
    })
  ) {
    return false
  }

  return domain.split('.').length <= 3
}

const NEXT_PUBLIC_HOMEPAGE = process.env.NEXT_PUBLIC_HOMEPAGE as string

export function getHomeURL(locale = i18n.defaultLocale) {
  return new URL(locale === i18n.defaultLocale ? '/' : locale, NEXT_PUBLIC_HOMEPAGE).href
}

export function getPageURL(url: string, locale = i18n.defaultLocale) {
  return getHomeURL(locale).replace(/\/$/, '') + '/' + url.replace(/^\//, '')
}

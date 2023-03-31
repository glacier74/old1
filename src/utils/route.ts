import { qs } from '@nily/utils'
import { NextRequest } from 'next/server'
import { pathToRegexp } from 'path-to-regexp'
import isFQDN from 'validator/lib/isFQDN'

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

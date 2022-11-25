import { qs } from '@nily/utils'
import { NextRequest } from 'next/server'
import { pathToRegexp } from 'path-to-regexp'

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

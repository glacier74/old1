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

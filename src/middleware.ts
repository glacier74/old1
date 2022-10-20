import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { pathToRegexp } from 'path-to-regexp'
import type { NextCookies } from 'next/dist/server/web/spec-extension/cookies'
import { v4 as uuidV4, validate } from 'uuid'
import { date, isFunction, isValid } from '@nily/utils'

const browserIdName = process.env.NEXT_PUBLIC_BROWSER_ID_COOKIE_NAME!
const tokenName = process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME!

const authRoutes = ['/login', '/sign-up', '/confirm-email', '/forgot-password', '/reset-password']
const bizRoutes: string[] = ['/product/:id*']

function isMatch(pathname: string, matchers: string[]) {
  return matchers.some(m => pathToRegexp(m).test(pathname))
}

function hasCookie(cookie: NextCookies, key: string, validator?: (value: string) => boolean) {
  const value = cookie.get(key)
  let result = isValid(value)

  if (validator && isFunction(validator)) {
    result = result && validator(value!)
  }

  return result
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const hasBrowserId = hasCookie(req.cookies, browserIdName, validate)
  const hasToken = hasCookie(req.cookies, tokenName)

  // Auth routes
  if (isMatch(pathname, authRoutes)) {
    if (hasToken && hasBrowserId) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (!hasBrowserId) {
      const res = NextResponse.next()

      res.cookies.set(browserIdName, uuidV4({ random: undefined }), {
        httpOnly: false,
        domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
        maxAge: date.milliseconds(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE!)
      })

      return res
    }
  }

  // Biz routes
  if (isMatch(pathname, bizRoutes)) {
    if (!hasToken || !hasBrowserId) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/sign-up',
    '/confirm-email',
    '/forgot-password',
    '/reset-password',
    '/product/:id*'
  ]
}

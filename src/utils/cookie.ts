import { date, isFunction, isValid } from '@nily/utils'
import { CookiesStatic } from 'js-cookie'
import { RequestCookies, ResponseCookies } from 'next/dist/server/web/spec-extension/cookies'
import { v4 as uuidV4, validate } from 'uuid'

// Cookie options
const domain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN
const maxAge = date.milliseconds(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE!)

// Cookies names
const browserIdKey = process.env.NEXT_PUBLIC_BROWSER_ID_COOKIE_NAME!
const tokenKey = process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME!

export function getBrowserId(cookies: RequestCookies | any) {
  let value: string | undefined

  if (cookies.get && isFunction(cookies.get)) {
    // JS cookie
    if (cookies.converter) {
      value = (cookies as CookiesStatic).get(browserIdKey)
    } else {
      value = (cookies as RequestCookies).get(browserIdKey)?.value
    }
  } else {
    value = cookies[browserIdKey]
  }

  if (isValid(value) && validate(value!)) {
    return value
  }
}

export function setBrowserId(cookies: ResponseCookies | any) {
  const value = uuidV4({ random: undefined })
  const options: AnyMap<any> = {
    httpOnly: false,
    domain
  }

  // JS cookie
  if (cookies.converter) {
    options.expires = Math.round(maxAge! / (1_000 * 24 * 60 * 60))
  } else {
    options.maxAge = maxAge
  }

  cookies.set(browserIdKey, value, options)
}

export function getToken(cookies: RequestCookies | any) {
  let value: string | undefined

  if (cookies.get && isFunction(cookies.get)) {
    value = (cookies as RequestCookies).get(tokenKey)?.value
  } else {
    value = cookies[tokenKey]
  }

  if (isValid(value)) {
    return value
  }
}

export function deleteToken(cookies: ResponseCookies) {
  cookies.set(tokenKey, '', {
    expires: new Date(Date.now())
  })
}

export function isLoggedIn(cookies: RequestCookies | any) {
  return isValid(getBrowserId(cookies)) && isValid(getToken(cookies))
}

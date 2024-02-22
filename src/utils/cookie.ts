import { date, isFunction, isValid } from '@nily/utils'
import dayjs from 'dayjs'
import { CookiesStatic as JSCookie } from 'js-cookie'
import { RequestCookies, ResponseCookies } from 'next/dist/server/web/spec-extension/cookies'
import { v4 as uuidV4 } from 'uuid'

// Cookie options
const DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN
const DEFAULT_COOKIE_MAX_AGE = date.milliseconds(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE!)!

// Cookies names
const REDIRECT_URL_KEY = process.env.NEXT_PUBLIC_REDIRECT_URL_COOKIE_NAME!
const BROWSER_ID_KEY = process.env.NEXT_PUBLIC_BROWSER_ID_COOKIE_NAME!
const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME!
const COOKIE_PREFIX = process.env.NEXT_PUBLIC_COOKIE_PREFIX!

const PRIVATE_TOKEN_KEY = process.env.NEXT_PUBLIC_PRIVATE_TOKEN_COOKIE_NAME!
const PRIVATE_TOKEN_MAX_AGE = date.milliseconds(
  process.env.NEXT_PUBLIC_PRIVATE_TOKEN_COOKIE_MAX_AGE!
)!

const JINGLE_LOCALE_COOKIE_NAME = process.env.NEXT_PUBLIC_JINGLE_LOCALE_COOKIE_NAME!

export function getBrowserId(cookies: RequestCookies | JSCookie | AnyMap<string>) {
  return getCookie(cookies, BROWSER_ID_KEY)
}

export function setBrowserId(cookies: ResponseCookies | JSCookie) {
  setCookie(cookies, BROWSER_ID_KEY, uuidV4({ random: undefined }), DEFAULT_COOKIE_MAX_AGE)
}

export function setTrackingParam(cookies: ResponseCookies | JSCookie, key: string, value: string) {
  setCookie(cookies, key, value)
}

export function getTrackingParam(cookies: ResponseCookies | JSCookie, key: string) {
  return getCookie(cookies, COOKIE_PREFIX + key)
}

export function getRef(cookies: ResponseCookies | JSCookie) {
  return getTrackingParam(cookies, 'ref')
}

export function getDomain(cookies: ResponseCookies | JSCookie) {
  return getTrackingParam(cookies, 'domain')
}

export function getToken(cookies: RequestCookies | JSCookie | AnyMap<string>) {
  return getCookie(cookies, TOKEN_KEY)
}

export function deleteToken(cookies: ResponseCookies) {
  setCookie(cookies, TOKEN_KEY, '', 0)
}

export function getRedirectURL(cookies: RequestCookies | JSCookie | AnyMap<string>) {
  return getCookie(cookies, REDIRECT_URL_KEY)
}

export function setRedirectURL(cookies: ResponseCookies | JSCookie, value: string) {
  setCookie(cookies, REDIRECT_URL_KEY, value)
}

export function deleteRedirectURL(cookies: ResponseCookies | JSCookie) {
  setCookie(cookies, REDIRECT_URL_KEY, '', 0)
}

export function isLoggedIn(cookies: RequestCookies | any) {
  return isValid(getBrowserId(cookies)) && isValid(getToken(cookies))
}

export function setPrivateToken(cookies: JSCookie, token: string) {
  cookies.set(PRIVATE_TOKEN_KEY, token, {
    expires: dayjs().add(PRIVATE_TOKEN_MAX_AGE, 'milliseconds').toDate()
  })
}

export function getPrivateToken(cookies: AnyMap<string>) {
  return cookies[PRIVATE_TOKEN_KEY]
}

export function getJingleBioLocale(cookies: AnyMap<string>) {
  return cookies[JINGLE_LOCALE_COOKIE_NAME]
}

export function setCookie(
  cookies: ResponseCookies | JSCookie,
  name: string,
  value: string,
  milliseconds?: number
) {
  const options: AnyMap<any> = {
    httpOnly: false,
    domain: DOMAIN
  }

  if (milliseconds) {
    // JS cookie
    if ((cookies as JSCookie).converter) {
      options.expires = dayjs().add(milliseconds, 'milliseconds').toDate()
    } else {
      options.maxAge = milliseconds
    }
  }

  cookies.set(name, value, options)
}

export function getCookie(cookies: RequestCookies | JSCookie | AnyMap<string>, name: string) {
  let value: string | undefined

  if (cookies.get && isFunction(cookies.get)) {
    // JS cookie
    if ((cookies as JSCookie).converter) {
      value = (cookies as JSCookie).get(name)
    } else {
      value = (cookies as RequestCookies).get(name)?.value
    }
  } else {
    value = (cookies as AnyMap<string>)[name]
  }

  if (isValid(value)) {
    return value
  }
}

import { v4 as uuidV4, validate } from 'uuid'
import { date, isValid } from '@nily/utils'
import { NextCookies } from 'next/dist/server/web/spec-extension/cookies'

// Cookie options
const domain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN
const maxAge = date.milliseconds(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE!)

// Cookies names
const browserIdKey = process.env.NEXT_PUBLIC_BROWSER_ID_COOKIE_NAME!
const tokenKey = process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME!

export function getBrowserId(cookies: NextCookies | any) {
  let value: string | undefined

  if (cookies.get) {
    value = cookies.get(browserIdKey)
  } else {
    value = cookies[browserIdKey]
  }

  if (isValid(value) && validate(value!)) {
    return value
  }
}

export function setBrowserId(cookies: NextCookies) {
  cookies.set(browserIdKey, uuidV4({ random: undefined }), {
    httpOnly: false,
    domain,
    maxAge
  })
}

export function getToken(cookies: NextCookies | any) {
  let value: string | undefined

  if (cookies.get) {
    value = cookies.get(tokenKey)
  } else {
    value = cookies[tokenKey]
  }

  if (isValid(value)) {
    return value
  }
}

export function deleteToken(cookies: NextCookies) {
  cookies.set(tokenKey, '', {
    expires: new Date(Date.now())
  })
}

export function isLoggedIn(cookies: NextCookies | any) {
  return isValid(getBrowserId(cookies)) && isValid(getToken(cookies))
}

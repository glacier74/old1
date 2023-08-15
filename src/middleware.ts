import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { deleteToken, getBrowserId, isLoggedIn, setBrowserId } from '~/utils/cookie'
import { isMatchRoutes } from '~/utils/route'

import { PublicApiService } from './service/public-api'

const authRoutes = ['/login', '/sign-up', '/confirm-email', '/forgot-password', '/reset-password']

export async function middleware(req: NextRequest) {
  const isLogged = isLoggedIn(req.cookies)

  const res = NextResponse.next()

  // 登录, 注册等页面
  if (isMatchRoutes(req, authRoutes)) {
    // 已登录跳转到首页
    if (isLogged) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Product 等页面
  // else if (isMatchRoutes(req, productRoutes)) {
  //   if (!isLogged) {
  //     // 展示 404 not found
  //     const url = req.nextUrl.clone()
  //     url.pathname = '/404'
  //
  //     return NextResponse.rewrite(url, {
  //       status: 404
  //     })
  //   }
  // }

  // 检查是否有 browserId
  const browserId = getBrowserId(req.cookies)

  if (!browserId) {
    setBrowserId(res.cookies)
  }

  // 检查 token 是否有效
  if (isLogged) {
    try {
      await PublicApiService.user(req.headers)
    } catch (err: any) {
      // if (err.name === 'HTTPError') {
      //   const json = await err.response.json()

      //   // 删除 token cookie
      //   if (json.statusCode === 401) {
      //     deleteToken(res.cookies)
      //   }
      // }

      console.error(err)
    }
  }

  return res
}

export const config = {
  matcher: ['/login', '/sign-up', '/confirm-email', '/forgot-password', '/reset-password', '/']
}

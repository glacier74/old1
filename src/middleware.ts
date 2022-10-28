import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { deleteToken, getBrowserId, isLoggedIn, setBrowserId } from '@/utils/cookie'
import { isMatchRoutes } from '@/utils/route'

const authRoutes = ['/login', '/sign-up', '/confirm-email', '/forgot-password', '/reset-password']
const productRoutes = ['/team/:id*']

export async function middleware(req: NextRequest) {
  const isLogged = isLoggedIn(req.cookies)

  // 登录, 注册等页面
  if (isMatchRoutes(req, authRoutes)) {
    // 已登录跳转到首页
    if (isLogged) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    const res = NextResponse.next()

    // 检查是否生成 browserId cookie
    const browserId = getBrowserId(req.cookies)

    if (!browserId) {
      setBrowserId(res.cookies)
    }

    return res
  }

  // Product 等页面
  if (isMatchRoutes(req, productRoutes)) {
    if (!isLogged) {
      // 展示 404 not found
      return NextResponse.rewrite(req.url, {
        status: 404
      })
    }
  }

  const res = NextResponse.next()

  // 检查 token 是否有效
  if (isLogged) {
    try {
      const f = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/user`, {
        headers: req.headers
      })
      const data = await f.json()

      // 删除 token cookie
      if (data.statusCode === 401) {
        deleteToken(res.cookies)
      }
    } catch (err: any) {
      console.error(err)
    }
  }

  return res
}

export const config = {
  matcher: [
    '/login',
    '/sign-up',
    '/confirm-email',
    '/forgot-password',
    '/reset-password',
    '/team/:id*',
    '/'
  ]
}

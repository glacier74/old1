import * as process from 'process'

import {
  HomeAuthorizedLayout,
  HomeBottom,
  HomeFeature,
  HomeFooter,
  HomeHeader,
  HomeHeroSection,
  HomeLayout,
  HomeLetter,
  HomeTestimonials,
  HomeUserImage
} from '~/layout'
import { isLoggedIn, withTranslations } from '~/utils'

interface HomeProps {
  isLoggedIn: boolean
  usersCount: number
}

const Home = ({ isLoggedIn, usersCount }: HomeProps): JSX.Element => {
  /**
   * 如果用户已经登录，拉取 user 和 product 信息
   * 如果 token 过期，请求 /logout 接口退出登录
   * 如果 products 为空，重定向到 /createProduct 页面
   */
  if (isLoggedIn) {
    return <HomeAuthorizedLayout />
  }

  return (
    <HomeLayout>
      <HomeHeader />
      <HomeHeroSection usersCount={usersCount} />
      <HomeUserImage />
      <HomeFeature />
      <HomeTestimonials />
      <HomeLetter />
      <HomeBottom />
      <HomeFooter />
    </HomeLayout>
  )
}

export const getServerSideProps = withTranslations(async context => {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URI}/users-count?key=${process.env.NEXT_API_VERIFICATION_KEY}`
  )
  const result = await request.json()

  return {
    props: {
      usersCount: result.count,
      isLoggedIn: isLoggedIn(context.req.cookies)
    }
  }
})

export default Home

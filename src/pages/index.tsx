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
  HomeUsecase,
  HomeUserImage
} from '~/layout'
import { PublicApiService } from '~/service/public-api'
import { TestimonialService } from '~/service/testimonial'
import { isLoggedIn, withTranslations } from '~/utils'

interface HomeProps {
  isLoggedIn: boolean
  usersCount: number
  testimonials: TestimonialRecord[]
}

const Home = ({ isLoggedIn, usersCount, testimonials }: HomeProps): JSX.Element => {
  /**
   * 如果用户已经登录，拉取 user 和 product 信息
   * 如果 token 过期，请求 /logout 接口退出登录
   * 如果 products 为空，重定向到 /create-product 页面
   */
  if (isLoggedIn) {
    return <HomeAuthorizedLayout />
  }

  return (
    <HomeLayout seo={{ url: '/' }}>
      <HomeHeader />
      <HomeHeroSection usersCount={usersCount} />
      <HomeUsecase />
      <HomeUserImage />
      <HomeFeature />
      <HomeTestimonials testimonials={testimonials} />
      <HomeLetter />
      <HomeBottom />
      <HomeFooter />
    </HomeLayout>
  )
}

export const getServerSideProps = withTranslations(async context => {
  const [res1, testimonials] = await Promise.all([
    PublicApiService.userCount(),
    TestimonialService.records()
  ])

  return {
    props: {
      usersCount: res1.count,
      testimonials,
      isLoggedIn: isLoggedIn(context.req.cookies)
    }
  }
})

export default Home

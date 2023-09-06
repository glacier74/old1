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
import { isLoggedIn, waterfall, withTranslations } from '~/utils'

interface HomeProps {
  isLoggedIn: boolean
  usersCount: number
  columns: TestimonialRecord[][]
}

const Home = ({ isLoggedIn, usersCount, columns }: HomeProps): JSX.Element => {
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
      <HomeTestimonials columns={columns} />
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
      columns: waterfall<TestimonialRecord>(testimonials, 3, testimonial => {
        return testimonial.Testimonial.length
      }),
      isLoggedIn: isLoggedIn(context.req.cookies)
    }
  }
})

export default Home

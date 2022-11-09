import { BaseLayout, HomeAuthorizedLayout } from '~/layout'
import { isLoggedIn, withTranslations } from '~/utils'

interface HomeProps {
  isLoggedIn: boolean
}

const Home = ({ isLoggedIn }: HomeProps): JSX.Element => {
  /**
   * 如果用户已经登录，拉取 user 和 product 信息
   * 如果 token 过期，请求 /logout 接口退出登录
   * 如果 products 为空，重定向到 /onboarding 页面
   */
  if (isLoggedIn) {
    return <HomeAuthorizedLayout seo={{ title: 'Home' }} />
  }

  return (
    <BaseLayout seo={{ title: 'Home' }}>
      <div>Home Page</div>
    </BaseLayout>
  )
}

export const getServerSideProps = withTranslations(async context => {
  return {
    props: {
      isLoggedIn: isLoggedIn(context.req.cookies)
    }
  }
})

export default Home

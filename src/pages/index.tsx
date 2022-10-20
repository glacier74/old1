import { NextPageContext } from 'next'
import { isValid, isValidArray } from '@nily/utils'
import { TeamService } from '@/service'

const Home = (): JSX.Element => {
  return <div>Home Page</div>
}

const browserIdCookieName = process.env.NEXT_PUBLIC_BROWSER_ID_COOKIE_NAME!
const tokenCookieName = process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME!

export async function getServerSideProps(context: NextPageContext) {
  const req: any = context.req
  const cookies = req.cookies

  if (isValid(cookies[browserIdCookieName]) && isValid(cookies[tokenCookieName])) {
    const teams = await TeamService.teams({
      headers: req.headers
    })

    if (!isValidArray(teams)) {
      return {
        redirect: {
          destination: '/products/create',
          permanent: false
        }
      }
    }

    const productId = teams[0].products[0].id

    return {
      redirect: {
        destination: `/product/${productId}`,
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default Home

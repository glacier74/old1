import { Spin } from '@heyforms/ui'
import JsCookie from 'js-cookie'
import { useRouter } from 'next/router'

import { BaseLayout } from '~/layout'
import { AuthService } from '~/service'
import { deleteRedirectURL, useAsyncEffect, withTranslations } from '~/utils'

const Logout = (): JSX.Element => {
  const router = useRouter()

  useAsyncEffect(async () => {
    await AuthService.logout()
    deleteRedirectURL(JsCookie)
    router.replace('/')
  }, [])

  return (
    <BaseLayout>
      <div className="w-screen h-screen flex items-center justify-center">
        <Spin className="text-slate-500" />
      </div>
    </BaseLayout>
  )
}

export const getStaticProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default Logout

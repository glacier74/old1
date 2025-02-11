import { Spin } from '@heyforms/ui'
import JsCookie from 'js-cookie'
import { useRouter } from 'next/router'

import { BaseLayout } from '~/layout'
import { AuthService } from '~/service'
import { deleteRedirectURL, useAsyncEffect, withTranslations } from '~/utils'

const productIdKey = process.env.NEXT_PUBLIC_PRODUCT_ID_STORAGE_NAME!

const Logout = (): JSX.Element => {
  const router = useRouter()

  useAsyncEffect(async () => {
    await AuthService.logout()
    deleteRedirectURL(JsCookie)
    window.localStorage.removeItem(productIdKey)
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

export const getServerSideProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default Logout

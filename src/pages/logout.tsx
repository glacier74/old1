import { Spin } from '@heyforms/ui'
import { useRouter } from 'next/router'

import { BaseLayout } from '~/layout'
import { AuthService } from '~/service'
import { useAsyncEffect, withTranslations } from '~/utils'

const Logout = (): JSX.Element => {
  const router = useRouter()

  useAsyncEffect(async () => {
    await AuthService.logout()
    router.replace('/login')
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

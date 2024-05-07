import { Form, Input } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'

import { LoginLayout } from '~/layout'
import { AuthService } from '~/service'
import { useStore } from '~/store'
import { withTranslations } from '~/utils'

const ConfirmEmail = (): JSX.Element => {
  const { t } = useTranslation('dashboard')
  const router = useRouter()
  const { email: rawEmail } = useStore()

  const email = useMemo(
    () => (router.query.email || rawEmail) as string,
    [router.query.email, rawEmail]
  )

  async function handleFinish(values: StringMap) {
    await AuthService.verify(email, values.code)
    router.replace('/')
  }

  useEffect(() => {
    router.prefetch('/login')

    if (isEmpty(email)) {
      router.replace('/login')
    }
  }, [])

  return (
    <LoginLayout
      seo={{
        title: t('confirmEmail.title')
      }}
    >
      <div>
        <h1 className="text-center text-3xl font-bold text-slate-900">
          {t('confirmEmail.heading')}
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600">
          {t('resetPassword.description')}{' '}
          <span className="font-medium text-slate-700">{email}</span>
        </p>
      </div>

      <div className="mt-8 mx-5 md:mx-0">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form.Custom
            submitText={t('forgotPassword.continue')}
            submitOptions={{
              type: 'success',
              block: true
            }}
            request={handleFinish}
          >
            <Form.Item
              name="code"
              label={t('resetPassword.code')}
              rules={[{ required: true, message: t('resetPassword.invalidCode') }]}
            >
              <Input />
            </Form.Item>
          </Form.Custom>
        </div>
      </div>
    </LoginLayout>
  )
}

export const getServerSideProps = withTranslations(
  async context => {
    return {
      props: {}
    }
  },
  ['common', 'dashboard']
)

export default ConfirmEmail

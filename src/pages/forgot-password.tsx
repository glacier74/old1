import { Form, Input } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { LoginLayout } from '~/layout'
import { AuthService } from '~/service'
import { useStore } from '~/store'
import { withTranslations } from '~/utils'

const ForgotPassword = (): JSX.Element => {
  const { t } = useTranslation()
  const router = useRouter()
  const { setEmail } = useStore()

  async function handleFinish(values: StringMap) {
    try {
      await AuthService.forgotPassword(values.email)

      setEmail(values.email)
      router.push('/reset-password')
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  useEffect(() => {
    router.prefetch('/reset-password')
  }, [])

  return (
    <LoginLayout
      seo={{
        title: t('forgotPassword.title')
      }}
    >
      <div>
        <h1 className="text-center text-3xl font-bold text-slate-900">
          {t('forgotPassword.heading')}
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600">{t('forgotPassword.description')}</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
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
              name="email"
              label={t('login.email')}
              rules={[{ type: 'email', required: true, message: t('login.invalidEmail') }]}
            >
              <Input type="email" />
            </Form.Item>
          </Form.Custom>

          <div className="mt-6 text-center text-green-500 hover:text-green-600 sm:text-sm">
            <a href="/login" className="inline-flex items-center">
              {t('forgotPassword.back')}
            </a>
          </div>
        </div>
      </div>
    </LoginLayout>
  )
}

export const getServerSideProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default ForgotPassword

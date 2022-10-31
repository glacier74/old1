import { Form, Input } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { AuthLayout } from '@/layout'
import { AuthService } from '@/service'
import { useStore } from '@/store'
import { withTranslations } from '@/utils'

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

  return (
    <AuthLayout
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
              type: 'primary',
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

          <div className="mt-6 text-center text-blue-700 hover:text-blue-800 sm:text-sm">
            <a href="/login" className="inline-flex items-center">
              {t('forgotPassword.back')}
            </a>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export const getServerSideProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default ForgotPassword

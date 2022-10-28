import { Checkbox, Form, Input } from '@heyforms/ui'
import { Trans, useTranslation } from 'next-i18next'
import { AuthService } from '@/service'
import { useRouter } from 'next/router'
import { AuthLayout, SocialLogin } from '@/layout'
import { withTranslations } from '@/utils'
import { useStore } from '@/store'

const Login = (): JSX.Element => {
  const { t } = useTranslation('auth')
  const router = useRouter()
  const { setEmail } = useStore()

  async function handleFinish(values: StringMap) {
    try {
      await AuthService.login(values.email, values.password)
      router.replace('/')
    } catch (err: any) {
      // 邮箱未认证
      if (err.error === 'email_not_verified') {
        setEmail(values.email)
        return router.push('/confirm-email')
      }

      throw new Error(err.message)
    }
  }

  return (
    <AuthLayout
      seo={{
        title: t('login.title')
      }}
    >

      <div>
        <h1 className="text-center text-3xl font-bold text-slate-900">
          {t('login.heading')}
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600">
          <Trans i18nKey="login.description">
            Log in to your account or <a href="/sign-up" className="font-medium text-blue-700 hover:text-blue-800">create an account</a>
          </Trans>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div>
            <p className="text-sm font-medium text-slate-700"> {t('login.startWith')}</p>
            <SocialLogin />
          </div>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">{t('login.continueWith')}</span>
            </div>
          </div>

          <div className="mt-6">
            <Form.Custom
              submitText={t('login.submit')}
              submitOptions={{
                type: 'primary',
                className: 'mt-6',
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

              <Form.Item
                name="password"
                label={t('login.password')}
                rules={[{ required: true, message: t('login.invalidPassword') }]}
              >
                <Input.Password />
              </Form.Item>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox>{t('login.remember')}</Checkbox>
                </div>

                <div className="text-sm">
                  <a
                    href="/forgot-password"
                    className="font-medium text-blue-700 hover:text-blue-800"
                  >
                    {t('login.forgot')}
                  </a>
                </div>
              </div>
            </Form.Custom>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export const getServerSideProps = withTranslations(
  async context => {
    return {
      props: {}
    }
  },
  ['auth']
)

export default Login

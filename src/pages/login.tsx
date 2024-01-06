import { Checkbox, Form, Input } from '@heyforms/ui'
import { Trans, useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { JINGLEBIO_REF } from '~/constants'
import { JingleBioTip, LoginLayout, SocialLogin } from '~/layout'
import { AuthService } from '~/service'
import { useStore } from '~/store'
import { getRef, isResponseError, withTranslations } from '~/utils'

const Login = ({ referer }: { referer: string }): JSX.Element => {
  const { t } = useTranslation('dashboard')
  const router = useRouter()
  const { setEmail } = useStore()

  async function handleFinish(values: StringMap) {
    try {
      await AuthService.login(values.email, values.password)
      await router.replace('/')
    } catch (err: any) {
      // 邮箱未认证
      if (isResponseError(err, 'email_not_verified')) {
        setEmail(values.email)
        return router.push('/confirm-email')
      }

      throw new Error(err.message)
    }
  }

  useEffect(() => {
    router.prefetch('/confirm-email')
  }, [])

  return (
    <LoginLayout
      referer={referer}
      seo={{
        title: referer === JINGLEBIO_REF ? t('login.jinglebioTitle') : t('login.title')
      }}
    >
      <div>
        <h1 className="text-center text-3xl font-bold text-slate-900">{t('login.heading')}</h1>
        <p className="mt-2 text-center text-sm text-slate-600">
          <Trans
            i18nKey="login.description"
            t={t}
            components={{
              a: (
                <a
                  href="/sign-up"
                  className="font-medium text-emerald-600 hover:text-emerald-700"
                />
              )
            }}
          />
        </p>
      </div>

      <JingleBioTip referer={referer} />

      <div className="mt-8 mx-5 md:mx-0 pb-8">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div>
            <p className="text-sm font-medium text-slate-700"> {t('login.signInWith')}</p>
            <SocialLogin />
          </div>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">{t('login.continueWith')}</span>
            </div>
          </div>

          <div className="mt-6">
            <Form.Custom
              submitText={t('login.submit')}
              submitOptions={{
                type: 'success',
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
                    className="font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    {t('login.forgot')}
                  </a>
                </div>
              </div>
            </Form.Custom>
          </div>
        </div>
      </div>
    </LoginLayout>
  )
}

export const getServerSideProps = withTranslations(
  async ({ req, query }) => {
    return {
      props: {
        referer: getRef(req.cookies) || query.ref || null
      }
    }
  },
  ['common', 'dashboard']
)

export default Login

import { Form, Input } from '@heyforms/ui'
import { Trans, useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { JINGLEBIO_REF } from '~/constants'
import { JingleBioTip, LoginLayout, SocialLogin } from '~/layout'
import { AuthService } from '~/service'
import { useStore } from '~/store'
import { getRef, withTranslations } from '~/utils'

const SignUp = ({ referer }: { referer: string }): JSX.Element => {
  const { t } = useTranslation('dashboard')
  const router = useRouter()
  const { setEmail } = useStore()

  async function handleFinish(values: StringMap) {
    await AuthService.signUp(values.name, values.email, values.password)

    setEmail(values.email)
    router.push('/confirm-email')
  }

  useEffect(() => {
    router.prefetch('/confirm-email')
  }, [])

  return (
    <LoginLayout
      referer={referer}
      seo={{
        title: referer === JINGLEBIO_REF ? t('signUp.jinglebioTitle') : t('signUp.title')
      }}
    >
      <div className="mt-8 md:mt-0">
        <h1 className="text-center text-3xl font-bold text-slate-900">{t('signUp.heading')}</h1>
        <p className="mt-2 text-center text-sm text-slate-600">{t('signUp.description')}</p>
      </div>

      <JingleBioTip referer={referer} />

      <div className="mt-8 mx-5 pb-16 md:mx-0">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div>
            <p className="text-sm font-medium text-slate-700"> {t('signUp.signUpWith')}</p>
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
              submitText={t('signUp.submit')}
              submitOptions={{
                type: 'success',
                className: 'mt-3',
                block: true
              }}
              request={handleFinish}
            >
              <Form.Item
                name="name"
                label={t('signUp.name')}
                rules={[{ required: true, message: t('signUp.invalidName') }]}
              >
                <Input />
              </Form.Item>

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
                rules={[
                  {
                    required: true,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[!#$%&()*+\-,.\/\\:<=>?@\[\]^_{|}~0-9a-zA-Z]{8,}$/,
                    message: t('signUp.invalidPassword')
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>

              <div className="mt-6">
                <p className="text-sm text-slate-500">
                  <Trans
                    i18nKey="signUp.agreeWith"
                    t={t}
                    components={{
                      a1: (
                        <a
                          href="https://help.earlybird.im/user/tos.html"
                          className="font-medium text-slate-500 underline hover:text-emerald-700"
                          target="_blank"
                          rel="noreferrer"
                        />
                      ),
                      a2: (
                        <a
                          href="https://help.earlybird.im/user/privacy.html"
                          className="font-medium text-slate-500 underline hover:text-emerald-700"
                          target="_blank"
                          rel="noreferrer"
                        />
                      )
                    }}
                  />
                </p>
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

export default SignUp

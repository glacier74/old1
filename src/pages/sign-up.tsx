import { Form, Input } from '@heyforms/ui'
import { Trans, useTranslation } from 'react-i18next'
import { AuthPage } from '@/components/page'
import { SocialLogin } from '@/components/auth'

const SignUp = (): JSX.Element => {
  const { t } = useTranslation()

  async function handleFinish() {}

  return (
    <AuthPage
      seo={{
        title: t('signUp.title')
      }}
    >
      <div>
        <div>
          <h1 className="mt-6 text-center text-3xl font-bold text-slate-900">
            {t('signUp.heading')}
          </h1>
          <p className="mt-2 text-center text-sm text-slate-600">{t('signUp.description')}</p>
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
                submitText={t('signUp.submit')}
                submitOptions={{
                  type: 'primary',
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
                    <Trans i18nKey="signUp.agreeWith">
                      By signing up, you agree to our{' '}
                      <a
                        href="https://heyform.net/help/terms-conditions"
                        className="font-medium text-slate-700 underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        terms of service
                      </a>{' '}
                      and{' '}
                      <a
                        href="https://heyform.net/help/privacy-policy"
                        className="font-medium text-slate-700 underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        privacy policy
                      </a>
                      .
                    </Trans>
                  </p>
                </div>
              </Form.Custom>
            </div>
          </div>
        </div>
      </div>
    </AuthPage>
  )
}

export default SignUp

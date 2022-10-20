import { Form, Input } from '@heyforms/ui'
import { Trans, useTranslation } from 'react-i18next'
import { AuthPage } from '@/components/page'

const ConfirmEmail = (): JSX.Element => {
  const { t } = useTranslation()
  const email = 'example@google.com'

  // TODO - redirect to login if email is null

  async function handleFinish() {}

  return (
    <AuthPage
      seo={{
        title: t('confirmEmail.title')
      }}
    >
      <div>
        <div>
          <h1 className="mt-6 text-center text-3xl font-bold text-slate-900">
            {t('confirmEmail.heading')}
          </h1>
          <p className="mt-2 text-center text-sm text-slate-600">
            <Trans i18nKey="resetPassword.description">
              We've sent you an email with a 6-digit verification code, please check your inbox at{' '}
              {/* @ts-ignore */}
              <span className="font-medium text-slate-700">{{ email }}</span>
            </Trans>
          </p>
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
                name="code"
                label={t('resetPassword.code')}
                rules={[{ required: true, message: t('resetPassword.invalidCode') }]}
              >
                <Input />
              </Form.Item>
            </Form.Custom>
          </div>
        </div>
      </div>
    </AuthPage>
  )
}

export default ConfirmEmail

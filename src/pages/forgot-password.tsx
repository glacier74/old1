import { Form, Input } from '@heyforms/ui'
import { useTranslation } from 'react-i18next'
import { CommonPage } from '@/components/page'

const ForgotPassword = (): JSX.Element => {
  const { t } = useTranslation()

  async function handleFinish() {}

  return (
    <CommonPage
      seo={{
        title: t('forgotPassword.title')
      }}
    >
      <div>
        <div>
          <h1 className="text-center text-3xl font-bold text-slate-900">
            {t('forgotPassword.heading')}
          </h1>
          <p className="mt-2 text-center text-sm text-slate-600">
            {t('forgotPassword.description')}
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
      </div>
    </CommonPage>
  )
}

export default ForgotPassword

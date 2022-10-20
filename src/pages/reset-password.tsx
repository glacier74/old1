import { Form, Input } from '@heyforms/ui'
import { Trans, useTranslation } from 'react-i18next'
import { CommonPage } from '@/components/page'
import { isValid } from '@hpnp/utils/helper'
import { useState } from 'react'

const ResetPassword = (): JSX.Element => {
  const { t } = useTranslation()
  const email = 'example@google.com'
  const [values, setValues] = useState<StringMap>({})

  // TODO - redirect to login if email is null

  function handleChange(_: unknown, val: StringMap) {
    setValues(val)
  }

  async function handleFinish() {}

  return (
    <CommonPage
      seo={{
        title: t('resetPassword.title')
      }}
    >
      <div>
        <div>
          <h1 className="text-center text-3xl font-bold text-slate-900">
            {t('resetPassword.heading')}
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
              onValuesChange={handleChange}
            >
              <Form.Item
                name="code"
                label={t('resetPassword.code')}
                rules={[{ required: true, message: t('resetPassword.invalidCode') }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label={t('resetPassword.newPassword')}
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

              <Form.Item
                name="repeatPassword"
                label={t('resetPassword.repeatPassword')}
                rules={[
                  {
                    validator: async (rule, value) => {
                      if (isValid(values.newPassword) && value !== values.newPassword) {
                        throw new Error(rule.message as string)
                      }
                    },
                    message: t('signUp.invalidPassword')
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Form.Custom>
          </div>
        </div>
      </div>
    </CommonPage>
  )
}

export default ResetPassword

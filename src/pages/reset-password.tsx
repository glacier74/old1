import { Form, Input } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { isEmpty, isValid } from '@nily/utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useStore } from '~/store'
import { AuthService } from '~/service'
import { withTranslations } from '~/utils'
import { LoginLayout } from '~/layout'

const ResetPassword = (): JSX.Element => {
  const { t } = useTranslation()
  const router = useRouter()
  const { email } = useStore()

  const [values, setValues] = useState<StringMap>({})

  function handleChange(_: unknown, val: StringMap) {
    setValues(val)
  }

  async function handleFinish(values: StringMap) {
    await AuthService.resetPassword(email!, values.code, values.password)
    router.replace('/login')
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
        title: t('resetPassword.title')
      }}
    >
      <div>
        <h1 className="text-center text-3xl font-bold text-slate-900">
          {t('resetPassword.heading')}
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600">
          {t('resetPassword.description')} <span className="font-medium text-slate-700">{email}</span>
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
              name="password"
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
                    if (isValid(values.password) && value !== values.password) {
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
    </LoginLayout>
  )
}

export const getServerSideProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default ResetPassword

import { Form, Input } from '@heyforms/ui'
import { useTranslation } from 'react-i18next'
import { CommonPage } from '@/components/page'
import { useEffect } from 'react'
import { useStoreContext } from '@/store'
import { isEmpty } from '@nily/utils'
import { useRouter } from 'next/router'
import { AuthService } from '@/service'

const ConfirmEmail = (): JSX.Element => {
  const { t } = useTranslation()
  const router = useRouter()
  const { state } = useStoreContext()

  async function handleFinish(values: StringMap) {
    await AuthService.verify(state.authEmail!, values.code)
    router.replace('/')
  }

  useEffect(() => {
    if (isEmpty(state.authEmail)) {
      router.replace('/login')
    }
  }, [])

  return (
    <CommonPage
      seo={{
        title: t('confirmEmail.title')
      }}
    >
      <div>
        <div>
          <h1 className="text-center text-3xl font-bold text-slate-900">
            {t('confirmEmail.heading')}
          </h1>
          <p className="mt-2 text-center text-sm text-slate-600">
            {t('resetPassword.description')} <span className="font-medium text-slate-700">{ state.authEmail }</span>
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
    </CommonPage>
  )
}

export default ConfirmEmail

import { Button, Form, Input, Modal, notification } from '@heyforms/ui'
import { isValid } from '@nily/utils'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { useState } from 'react'

import { UserService } from '~/service'
import { useStore } from '~/store'
import { useVisible } from '~/utils'

const ChangePassword: FC<IModalProps> = ({ visible, onClose }) => {
  const { t } = useTranslation()
  const { user } = useStore()
  const [values, setValues] = useState<AnyMap<any>>({})

  function handleChange(_: unknown, val: AnyMap<any>) {
    setValues(val)
  }

  async function handleFinish(values: AnyMap<any>) {
    await UserService.updatePassword(values.currentPassword, values.password)

    notification.success({
      title: t('account.password.changeText')
    })
    onClose?.()
  }

  if (user.isSocialAccount) {
    return null
  }

  return (
    <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-slate-900">
            {t('account.password.button')}
          </h1>
        </div>

        <Form.Custom
          submitText={t('forgotPassword.continue')}
          submitOptions={{
            type: 'success'
          }}
          request={handleFinish}
          onValuesChange={handleChange}
        >
          <Form.Item
            name="currentPassword"
            label={t('account.password.currentPassword')}
            rules={[{ required: true }]}
          >
            <Input.Password />
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
                message: t('resetPassword.passwordMismatch')
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
}

export const Password: FC = () => {
  const { user } = useStore()
  const { t } = useTranslation()
  const [visible, open, close] = useVisible()

  if (user.isSocialAccount) {
    return null
  }

  return (
    <div>
      <div className="block text-sm font-medium text-slate-700">{t('login.password')}</div>
      <p className="mt-1 text-sm text-slate-500">
        <Button.Link className="text-emerald-500" onClick={open}>
          {t('account.password.button')}
        </Button.Link>
      </p>

      <ChangePassword visible={visible} onClose={close} />
    </div>
  )
}

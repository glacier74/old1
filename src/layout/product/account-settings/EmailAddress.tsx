import { useVisible } from '@/utils'
import { Button, Form, Input, Modal } from '@heyforms/ui'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useStore } from '@/store'
import { UserService } from '@/service'

export interface FormValues {
  email: string
  password: string
}

interface SendCodeProps extends Omit<IModalProps, 'onComplete'> {
  onComplete?: (formValues: FormValues) => void
}

interface VerifyEmailProps extends IModalProps {
  formValues?: FormValues
}

export const SendCode: FC<SendCodeProps> = ({ visible, onClose, onComplete }) => {
  const { t } = useTranslation()

  async function handleFinish(values: FormValues) {
    await UserService.changeEmail(values.email)

    onClose?.()
    onComplete?.(values)
  }

  return (
    <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-slate-900">
            {t('account.email.change')}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{t('forgotPassword.description')}</p>
        </div>

        <Form.Custom
          submitText={t('account.email.send')}
          submitOptions={{
            type: 'primary'
          }}
          request={handleFinish}
        >
          <Form.Item
            name="email"
            label={t('account.email.newEmail')}
            rules={[{ type: 'email', required: true }]}
          >
            <Input type="email" />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
}

export const VerifyEmail: FC<VerifyEmailProps> = ({ visible, formValues, onClose, onComplete }) => {
  const { t } = useTranslation()
  const { updateUser } = useStore()

  async function handleFinish(values: AnyMap<any>) {
    await UserService.verifyEmail(formValues!.email, values.code)

    updateUser({
      email: formValues!.email
    })

    onClose?.()
    onComplete?.()
  }

  return (
    <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-slate-900">
            {t('account.email.check')}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {t('resetPassword.description', { email: formValues?.email })}
          </p>
        </div>

        <Form.Custom
          submitText={t('forgotPassword.continue')}
          submitOptions={{
            type: 'primary'
          }}
          request={handleFinish}
        >
          <Form.Item name="code" label={t('resetPassword.code')} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
}

export const EmailAddress: FC = () => {
  const { t } = useTranslation()
  const { user } = useStore()

  const [sendCodeVisible, openSendCode, closeSendCode] = useVisible()
  const [verifyEmailVisible, openVerifyEmail, closeVerifyEmail] = useVisible()
  const [formValues, setFormValues] = useState<FormValues>()

  function handleSendComplete(values: FormValues) {
    setFormValues(values)
    openVerifyEmail()
  }

  function handleVerifyComplete() {}

  return (
    <div>
      <div className="block text-sm font-medium text-slate-700">{t('login.email')}</div>
      <p className="mt-1 text-sm text-slate-500">
        <span>{user.email}</span>

        {!user.isSocialAccount && (
          <Button.Link className="ml-2 text-blue-500" onClick={openSendCode}>
            {t('account.email.button')}
          </Button.Link>
        )}
      </p>

      <SendCode visible={sendCodeVisible} onClose={closeSendCode} onComplete={handleSendComplete} />
      <VerifyEmail
        visible={verifyEmailVisible}
        formValues={formValues}
        onClose={closeVerifyEmail}
        onComplete={handleVerifyComplete}
      />
    </div>
  )
}

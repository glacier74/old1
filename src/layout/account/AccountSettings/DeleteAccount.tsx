import { Button, Form, Input, Modal, notification } from '@heyforms/ui'
import JsCookie from 'js-cookie'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { FC } from 'react'

import { AuthService, UserService } from '~/service'
import { useStore } from '~/store'
import { deleteRedirectURL, useAsyncEffect, useVisible } from '~/utils'

const VerifyEmail: FC<IModalProps> = ({ visible, onClose, onComplete }) => {
  const { t } = useTranslation('dashboard')
  const router = useRouter()
  const { user, closeAccountSettings } = useStore()

  async function handleFinish(values: AnyMap<any>) {
    await UserService.verifyDeletion(values.code)
    deleteRedirectURL(JsCookie)

    // Clear the auth state and logout the user
    setTimeout(async () => {
      await AuthService.logout()
      closeAccountSettings()
      router.replace('/')
    }, 10_000)

    onComplete?.()
    onClose?.()
  }

  useAsyncEffect(async () => {
    if (visible) {
      await UserService.requestDeletion()

      notification.success({
        title: t('resetPassword.description', { email: user.email })
      })
    }
  }, [visible])

  return (
    <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-slate-900">
            {t('account.dangerZone.button')}
          </h1>
          <div className="space-y-2">
            <p className="mt-1 text-sm text-slate-500">{t('account.dangerZone.tip1')}</p>
            <p className="mt-1 text-sm text-slate-500">{t('account.dangerZone.tip2')}</p>
          </div>
        </div>

        <Form.Custom
          submitText={t('account.dangerZone.confirm')}
          submitOptions={{
            type: 'danger'
          }}
          request={handleFinish}
        >
          <Form.Item name="code" label={t('confirmEmail.code')} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
}

const DeletionWarning: FC<IModalProps> = ({ visible }) => {
  const { t } = useTranslation('dashboard')

  return (
    <Modal.Confirm
      type="danger"
      visible={visible}
      title={t('account.dangerZone.scheduled')}
      maskClosable={false}
      description={
        <div className="space-y-2">
          <p>{t('account.dangerZone.tip3')}</p>
          <p>{t('account.dangerZone.tip4')}</p>
        </div>
      }
    />
  )
}

export const DeleteAccount: FC = () => {
  const [verifyEmailVisible, openVerifyEmail, closeVerifyEmail] = useVisible()
  const [deletionWarningVisible, openDeletionWarning] = useVisible()
  const { t } = useTranslation('dashboard')

  return (
    <div>
      <div className="block text-sm font-medium text-slate-700">
        {t('account.dangerZone.heading')}
      </div>
      <p className="mt-1 text-sm text-slate-500">{t('account.dangerZone.description')}</p>
      <div className="mt-3">
        <Button className="bg-red-500" type="danger" onClick={openVerifyEmail}>
          {t('account.dangerZone.button')}
        </Button>
      </div>

      <VerifyEmail
        visible={verifyEmailVisible}
        onClose={closeVerifyEmail}
        onComplete={openDeletionWarning}
      />
      <DeletionWarning visible={deletionWarningVisible} />
    </div>
  )
}

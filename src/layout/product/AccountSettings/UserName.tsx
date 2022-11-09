import { Form, Input } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import { UserService } from '~/service'
import { useStore } from '~/store'

export const UserName: FC = () => {
  const { t } = useTranslation()
  const { user, updateUser } = useStore()

  async function handleFinish(values: AnyMap<any>) {
    await UserService.update(values)
    updateUser(values)
  }

  return (
    <div>
      <Form.Custom
        inline
        initialValues={{
          name: user.name
        }}
        submitText={t('account.user.button')}
        submitOptions={{
          className: 'mt-6 ml-3'
        }}
        onlySubmitOnValueChange={true}
        request={handleFinish}
      >
        <Form.Item name="name" label={t('account.user.heading')} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form.Custom>
    </div>
  )
}

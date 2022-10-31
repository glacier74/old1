import { useStore } from '@/store'
import { Form, Input } from '@heyforms/ui'
import type { FC } from 'react'
import { useTranslation } from 'next-i18next'

export const UserName: FC = () => {
  const { t } = useTranslation()
  const { user } = useStore()

  async function handleFinish(values: AnyMap<any>) {}

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
        request={handleFinish}
      >
        <Form.Item name="name" label={t('account.user.heading')} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form.Custom>
    </div>
  )
}

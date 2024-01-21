import { Button, Form, Input, Modal, notification } from '@heyforms/ui'
import React from 'react'

import { SubscriptionService, UserService } from '~/service'
import { useStore } from '~/store'
import { useVisible } from '~/utils'

export const Redeem = () => {
  const [visible, open, close] = useVisible()
  const { updateUser } = useStore()

  async function handleFinish(values: any) {
    await SubscriptionService.redeem(values.code)

    // Update user
    const user = await UserService.user()
    updateUser(user)

    notification.success({
      title: 'Your code redeemed successfully'
    })
    close()
  }

  return (
    <>
      <div>
        <Button type="success" onClick={open}>
          Have a gift code?
        </Button>
      </div>

      <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={close}>
        <div className="space-y-6">
          <h1 className="text-lg leading-6 font-medium text-slate-900">Have a gift code?</h1>

          <Form.Custom
            submitText="Apply"
            submitOptions={{
              type: 'success'
            }}
            onlySubmitOnValueChange
            request={handleFinish}
          >
            <Form.Item
              className="!mb-2"
              name="code"
              rules={[{ required: true, message: 'The code is now allowed to be empty' }]}
            >
              <Input placeholder="Paste your gift code here" />
            </Form.Item>
          </Form.Custom>
        </div>
      </Modal>
    </>
  )
}

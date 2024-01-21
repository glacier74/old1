import { Button, Dropdown, Form, Input, Menus, Modal } from '@heyforms/ui'
import { IconDotsVertical } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'

import { useProduct } from '~/layout'
import { ProductService } from '~/service'
import { useStore } from '~/store'
import { useVisible } from '~/utils'

export const JingleBioSubdomainURL = () => {
  const { t } = useTranslation('dashboard')
  const product = useProduct()
  const { updateProduct } = useStore()
  const [visible, open, close] = useVisible()

  const subdomainURL = useMemo(
    () => `${process.env.NEXT_PUBLIC_JINGLE_BIO_DOMAIN}/${product.domain}`,
    [product.domain]
  )

  async function handleFinish(values: any) {
    await ProductService.updateSubdomain(product.id, values.domain)

    updateProduct(product.id, values)
    close()
  }

  const Overlay = (
    <Menus>
      <Menus.Item label="Edit URL" onClick={open} />
    </Menus>
  )

  return (
    <div>
      <div className="form-item-label">My Jingle Bio URL</div>
      <div className="form-item-content">
        <div className="flex items-center w-full md:w-[32rem] px-4 py-2.5 text-sm text-slate-700 bg-slate-200 rounded">
          <div className="flex-1">{subdomainURL}</div>
          <Dropdown className="w-6 h-6" overlay={Overlay}>
            <Button.Link className="!p-0.5" leading={<IconDotsVertical />} />
          </Dropdown>
        </div>
      </div>

      <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={close}>
        <div className="space-y-6">
          <h1 className="text-lg leading-6 font-medium text-slate-900">Edit my Jingle Bio URL</h1>

          <Form.Custom
            initialValues={product}
            submitText={t('common.saveChanges')}
            submitOptions={{
              type: 'success'
            }}
            onlySubmitOnValueChange
            request={handleFinish}
          >
            <Form.Item
              className="!mb-2"
              name="domain"
              validateTrigger={['onBlur', 'onChange']}
              rules={[
                {
                  required: true,
                  async validator(rule, value) {
                    await ProductService.validateSubdomain(value, product.id)
                  }
                }
              ]}
            >
              <Input leading={`https://${process.env.NEXT_PUBLIC_JINGLE_BIO_DOMAIN}/`} />
            </Form.Item>
          </Form.Custom>
        </div>
      </Modal>
    </div>
  )
}

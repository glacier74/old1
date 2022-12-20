import { Button, Form, Input, Modal, notification } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { useProductId } from '~/layout'
import { ProductService } from '~/service'
import { useStore } from '~/store'
import { useAsyncEffect, useVisible } from '~/utils'

const DeleteModal: FC<IModalProps> = ({ visible, onClose }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const productId = useProductId()
  const { user, removeProduct } = useStore()

  async function handleFinish(values: AnyMap<any>) {
    await ProductService.verifyDeletion(productId, values.code)
    removeProduct(productId)

    notification.success({
      title: t('productSettings.deleteProduct.success')
    })
    router.replace('/')
  }

  useAsyncEffect(async () => {
    if (visible) {
      await ProductService.requestDeletion(productId)

      notification.success({
        title: `${t('resetPassword.description')} ${user?.email}.`
      })
    }
  }, [visible])

  return (
    <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-semibold text-slate-900">
            {t('productSettings.deleteProduct.heading')}
          </h1>
          <div className="space-y-2">
            <p className="mt-1 text-sm text-slate-500">
              {t('productSettings.deleteProductModal.warn1')}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {t('productSettings.deleteProductModal.warn2')}
            </p>
          </div>
        </div>

        <Form.Custom
          submitText={t('productSettings.deleteProductModal.button')}
          submitOptions={{
            type: 'danger'
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

export const DeleteProduct = () => {
  const [visible, open, close] = useVisible()
  const { t } = useTranslation()

  return (
    <>
      <div className="px-6 py-5 flex items-center justify-between">
        <div>
          <div className="block text-base text-slate-900 font-bold">
            {t('productSettings.deleteProduct.heading')}
          </div>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            {t('productSettings.deleteProduct.description')}
          </p>
        </div>
        <Button type="danger" className="!py-1.5" onClick={open}>
          {t('productSettings.deleteProduct.button')}
        </Button>
      </div>
      <DeleteModal visible={visible} onClose={close} />
    </>
  )
}

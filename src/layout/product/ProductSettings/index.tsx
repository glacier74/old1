import { Form } from '@heyforms/ui'
import { deepEqual } from 'fast-equals'
import { useTranslation } from 'next-i18next'
import { FC, useEffect, useMemo, useState } from 'react'

import { useProduct } from '~/layout'
import { useUnsaveChanges } from '~/utils'

import { Advanced } from './Advanced'
import { DangerZone } from './DangerZone'
import { General } from './General'
import { Meta } from './Meta'

interface ProductSettingsProps {
  form: any
  onValueChanged: (isChanged: boolean) => void
  onFinish: (values: any) => void
}

export const ProductSettings: FC<ProductSettingsProps> = ({ form, onValueChanged, onFinish }) => {
  const { t } = useTranslation()
  const product = useProduct()
  const [values, setValues] = useState<any>(product)

  const isValuesChanged = useMemo(() => {
    return !deepEqual(values, product)
  }, [values, product])

  function handleValuesChange(_: any, updates: any) {
    setValues((values: any) => ({
      ...values,
      ...updates
    }))
  }

  // If the changes have not been saved, the user will be prompted.
  useUnsaveChanges(isValuesChanged, t('builder.leaveBrowserMessage'))

  useEffect(() => {
    onValueChanged(isValuesChanged)
  }, [isValuesChanged])

  return (
    <div className="mt-12">
      <Form
        form={form}
        initialValues={product}
        onFinish={onFinish}
        onValuesChange={handleValuesChange}
      >
        <div className="space-y-12">
          <General values={values} />
          <Meta values={values} />
          <Advanced values={values} />
        </div>
      </Form>

      <DangerZone />
    </div>
  )
}

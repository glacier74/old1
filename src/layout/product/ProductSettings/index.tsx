import { Form } from '@heyforms/ui'
import { exclude, isEmpty, random } from '@nily/utils'
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

const EXCLUDE_PROPERTIES = ['customDomains']

export const ProductSettings: FC<ProductSettingsProps> = ({ form, onValueChanged, onFinish }) => {
  const { t } = useTranslation()
  const product = useProduct()
  const [values, setValues] = useState<any>(
    exclude(product as AnyMap<unknown>, EXCLUDE_PROPERTIES, { deepClone: true })
  )

  const isValuesChanged = useMemo(() => {
    // No need to compare customDomains
    const _values = exclude(values, EXCLUDE_PROPERTIES, { deepClone: true })
    const _product = exclude(product as AnyMap<unknown>, EXCLUDE_PROPERTIES, { deepClone: true })

    return !deepEqual(_values, _product)
  }, [values, product])

  function handleValuesChange(_: any, updates: any) {
    if (updates.isSitePrivate && isEmpty(values.sitePassword) && isEmpty(updates.sitePassword)) {
      updates.sitePassword = random.alphaNumeric(4)
      form.setFieldValue('sitePassword', updates.sitePassword)
    }

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
    <div className="mt-12 pb-20">
      <Form
        form={form}
        initialValues={product}
        onFinish={onFinish}
        onValuesChange={handleValuesChange}
      >
        <div className="space-y-12">
          <General />
          <Meta values={values} />
          <Advanced values={values} />
        </div>
      </Form>

      <DangerZone />
    </div>
  )
}

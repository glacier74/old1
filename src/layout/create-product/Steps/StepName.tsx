import { Input } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import { useTranslation } from 'next-i18next'
import router from 'next/router'
import { useCallback, useState } from 'react'

import templates from '~/layout/builder3/templates'
import { schemasToOptions } from '~/layout/builder3/utils'
import { ProductService } from '~/service'
import { useStore } from '~/store'

import { StepContainer } from './StepContainer'

export const StepName = () => {
  const { t } = useTranslation('dashboard')
  const { product, setProduct } = useStore()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const handleCreate = useCallback(async () => {
    setLoading(true)
    setError(undefined)

    try {
      const productId = await ProductService.create({
        ...product,
        blocks: schemasToOptions(templates[product!.template!].schemas),
        category: '',
        tagline: ''
      })

      await router.replace(`/product/${productId}/edit`)
    } catch (err: any) {
      setError(err.message)
    }

    setLoading(false)
  }, [product])

  function handleChange(name: any) {
    setProduct({
      ...product,
      name
    })
  }

  return (
    <StepContainer
      isNextButtonDisabled={isEmpty(product?.name)}
      isNextButtonLoading={loading}
      onNextButtonClick={handleCreate}
    >
      <div className="flex items-center mb-2 text-3xl font-semibold text-slate-950">
        {t('createProduct.snHeading')}{' '}
        <Input className="create-product-input" value={product?.name} onChange={handleChange} />
      </div>
      <p className="mb-8 text-slate-500 text-xl">{t('createProduct.snDesc')}</p>

      {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
    </StepContainer>
  )
}

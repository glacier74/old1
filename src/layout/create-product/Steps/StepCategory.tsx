import { Select } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import router from 'next/router'
import { useCallback, useState } from 'react'

import templates from '~/layout/builder3/templates'
import { schemasToOptions } from '~/layout/builder3/utils'
import { ProductService } from '~/service'
import { useStore } from '~/store'

import { StepContainer } from './StepContainer'

const options = [
  { label: 'E-commerce', value: 'E-commerce' },
  { label: 'Service offering', value: 'Service offering' },
  { label: 'Fitness', value: 'Fitness' },
  { label: 'Health', value: 'Health' },
  { label: 'Travel', value: 'Travel' },
  { label: 'Event', value: 'Event' },
  { label: 'Financial', value: 'Financial' },
  { label: 'App download', value: 'App download' },
  { label: 'Food', value: 'Food' },
  { label: 'Restaurant', value: 'Restaurant' },
  { label: 'Lead generation', value: 'Lead generation' },
  { label: 'Ebook', value: 'Ebook' },
  { label: 'Online course', value: 'Online course' },
  { label: 'Non-profit donation', value: 'Non-profit donation' },
  { label: 'Job application', value: 'Job application' },
  { label: 'Pet care', value: 'Pet care' },
  { label: 'Education', value: 'Education' },
  { label: 'Fashion', value: 'Fashion' },
  { label: 'Clothing', value: 'Clothing' },
  { label: 'Technology', value: 'Technology' },
  { label: 'Wedding ', value: 'Wedding ' },
  { label: 'Automotive', value: 'Automotive' },
  { label: 'Dating', value: 'Dating' },
  { label: 'SaaS product', value: 'SaaS product' },
  { label: 'Software', value: 'Software' },
  { label: 'Hardware', value: 'Hardware' },
  { label: 'Matchmaking', value: 'Matchmaking' },
  { label: 'Legal services', value: 'Legal services' },
  { label: 'Gaming', value: 'Gaming' }
]

export const StepCategory = () => {
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
        tagline: ''
      })

      await router.replace(`/product/${productId}/edit`)
    } catch (err: any) {
      setError(err.message)
    }

    setLoading(false)
  }, [product])

  function handleChange(category: any) {
    setProduct({
      ...product,
      category
    })
  }

  return (
    <StepContainer
      isNextButtonDisabled={isEmpty(product?.category)}
      isNextButtonLoading={loading}
      onNextButtonClick={handleCreate}
    >
      <div className="flex items-center mb-2 text-3xl font-semibold text-slate-900">
        I am creating a landing page for{' '}
        <Select
          className="create-product-select"
          popupClassName="create-product-select-popup"
          options={options}
          value={product?.category}
          onChange={handleChange}
        />
      </div>
      <p className="mb-8 text-slate-500 text-xl">
        Understanding your industry would enable us to better comprehend your specific needs and
        requirements.
      </p>

      {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
    </StepContainer>
  )
}

import { Button, Input } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import { IconArrowLeft } from '@tabler/icons'
import router from 'next/router'
import { useCallback, useState } from 'react'

import templateList from '~/layout/builder3/templates'
import { schemasToOptions } from '~/layout/builder3/utils'
import { ProductService } from '~/service'
import { useStore } from '~/store'

export const Step5 = () => {
  const { product, setStep, setProduct } = useStore()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  function handleBack() {
    setStep(4)
  }

  const handleCreate = useCallback(async () => {
    setLoading(true)
    setError(undefined)

    try {
      const productId = await ProductService.create({
        ...product,
        blocks: schemasToOptions(templateList[product!.template as string].schemas)
      })

      await router.replace(`/product/${productId}/edit`)
    } catch (err: any) {
      setError(err.message)
    }

    setLoading(false)
  }, [product])

  function handleChange(tagline: any) {
    setProduct({
      ...product,
      tagline
    })
  }

  return (
    <div className="w-full md:w-[800px]">
      <button className="mb-8 text-gray-500 hover:text-gray-800" onClick={handleBack}>
        <IconArrowLeft />
      </button>

      <div className="mb-2 text-3xl font-semibold text-slate-900">My customers need it to</div>
      <Input
        className="create-product-input !ml-0"
        value={product?.tagline}
        onChange={handleChange}
      />
      <div className="mt-6 mb-8 text-sm">
        <p className="font-medium text-slate-600">
          Short and specific, use this pattern: "My customers need it to [benefit]"{' '}
        </p>
        <ul className="mt-1 text-sm list-disc pl-4 text-slate-500">
          <li>streamline project management</li>
          <li>automate business tasks</li>
          <li>delve into customer analytics</li>
        </ul>
      </div>

      <Button
        type="success"
        className="!px-6 !py-2 !rounded-full !text-lg"
        loading={loading}
        disabled={isEmpty(product?.tagline)}
        onClick={handleCreate}
      >
        Next
      </Button>

      {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
    </div>
  )
}

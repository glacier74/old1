import { Button } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import { IconArrowLeft } from '@tabler/icons'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useCallback, useState } from 'react'

import templates from '~/layout/builder3/templates'
import { schemasToOptions } from '~/layout/builder3/utils'
import { ProductService } from '~/service'
import { useStore } from '~/store'

interface TemplateItemProps {
  template: {
    id: string
    name: string
    thumbnail: string
  }
  isSelected?: boolean
  onClick: (id: string) => void
}

const TEMPLATES: Array<TemplateItemProps['template']> = [
  {
    id: 'landing_page_01',
    name: 'Landing page 1',
    thumbnail: 'https://storage.earlybird.im/template/landing-page-01.jpg'
  },
  {
    id: 'landing_page_02',
    name: 'Landing page 2',
    thumbnail: 'https://storage.earlybird.im/template/landing-page-02.jpg'
  }
]

const TemplateItem: FC<TemplateItemProps> = ({ template, isSelected, onClick }) => {
  function handleClick() {
    onClick(template.id)
  }

  return (
    <div
      className={clsx('mb-10 cursor-pointer rounded-2xl shadow-sm transition-all hover:shadow-xl', {
        'ring-2 ring-blue-600 shadow-xl': isSelected
      })}
      onClick={handleClick}
    >
      <Image
        className="bg-slate-100 rounded-2xl object-cover"
        src={template.thumbnail}
        alt={template.name}
        width={240}
        height={135}
      />
    </div>
  )
}

export const Step6 = () => {
  const router = useRouter()
  const { product, setStep, setProduct } = useStore()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  function handleBack() {
    setStep(5)
  }

  function handleClick(template: string) {
    setProduct({
      ...product,
      template
    })
  }

  const handleCreate = useCallback(async () => {
    setLoading(true)
    setError(undefined)

    try {
      const productId = await ProductService.create({
        ...product,
        blocks: schemasToOptions(templates[product!.template!].schemas)
      })

      await router.replace(`/product/${productId}/edit`)
    } catch (err: any) {
      setError(err.message)
    }

    setLoading(false)
  }, [product])

  return (
    <div className="w-full md:w-[800px]">
      <button className="mb-8 text-gray-500 hover:text-gray-800" onClick={handleBack}>
        <IconArrowLeft />
      </button>

      <div className="mb-2 text-2xl font-bold text-slate-900">Choose a template</div>
      <div className="mb-8 text-slate-500">
        These are hand-picked templates that might suit your demand
      </div>

      <div className="grid grid-cols-3 gap-10">
        {TEMPLATES.map(template => (
          <TemplateItem
            key={template.id}
            template={template}
            isSelected={product?.template === template.id}
            onClick={handleClick}
          />
        ))}
      </div>

      <Button
        type="success"
        disabled={isEmpty(product?.template) || loading}
        loading={loading}
        className="!px-5 !py-2"
        onClick={handleCreate}
      >
        Next
      </Button>

      {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
    </div>
  )
}

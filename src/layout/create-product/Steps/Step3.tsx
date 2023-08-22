import { Button } from '@heyforms/ui'
import { arrayUnique, isEmpty, isValid } from '@nily/utils'
import { IconArrowLeft, IconCheck } from '@tabler/icons'
import clsx from 'clsx'
import Image from 'next/image'
import router from 'next/router'
import { FC, MouseEvent, useCallback, useEffect, useMemo, useState } from 'react'

import { Loading } from '~/components'
import templateList from '~/layout/builder3/templates'
import { schemasToOptions } from '~/layout/builder3/utils'
import { ProductService } from '~/service'
import { useStore } from '~/store'
import { useParam, useRequest } from '~/utils'

import { PreviewModal } from '../PreviewModal'

interface TemplateItemProps {
  template: Template_V3
  isSelected?: boolean
  onPreview: (template: Template_V3) => void
  onClick: (id: string) => void
}

interface CategoryItemProps {
  category: string
  isSelected?: boolean
  onClick: (id: string) => void
}

const ALL_CATEGORY_NAME = 'All'

const CategoryItem: FC<CategoryItemProps> = ({ category, isSelected, onClick }) => {
  function handleClick() {
    onClick(category)
  }

  return (
    <div
      className={clsx(
        'text-sm px-2 py-0.5 rounded-[12px] cursor-pointer',
        isSelected ? 'bg-[#10B981] text-white' : 'text-slate-800 hover:bg-slate-200'
      )}
      onClick={handleClick}
    >
      {category}
    </div>
  )
}

const TemplateItem: FC<TemplateItemProps> = ({ template, isSelected, onPreview, onClick }) => {
  function handleClick() {
    onClick(template.id)
  }

  function handlePreview(event: MouseEvent) {
    event.stopPropagation()
    onPreview(template)
  }

  return (
    <div className="group/container rounded-md shadow-md">
      <div className="group/image relative px-8 pt-8 overflow-hidden rounded-t-md bg-gradient-to-br from-lime-50 via-yellow-50 to-sky-100">
        <div className="w-full aspect-video">
          <Image
            className="w-full h-full bg-slate-100 rounded-t-md object-cover"
            src={template.thumbnail}
            alt={template.name}
            width={400}
            height={240}
            quality={100}
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-colors hover:bg-black/20 group-hover/image:opacity-100 rounded-t-md">
          <button
            type="button"
            className="px-2 py-1 rounded-lg bg-emerald-500 text-white text-sm z-10 shadow-lg transition-colors hover:bg-emerald-600"
            onClick={handlePreview}
          >
            Preview
          </button>
        </div>

        {isSelected && (
          <div className="absolute top-[18px] right-[18px] bg-emerald-600 flex items-center justify-center w-[28px] h-[28px] rounded-full">
            <IconCheck className="text-white w-[18px] h-[18px]" />
          </div>
        )}
      </div>
      <div className="flex items-center px-4 py-3 gap-4">
        <div className="flex-1 text-sm font-medium">{template.name}</div>

        <button
          type="button"
          className="px-2 py-1 rounded-lg text-emerald-600 text-sm border border-emerald-600 opacity-0 hover:text-emerald-700 hover:border-emerald-700 group-hover/container:opacity-100"
          onClick={handleClick}
        >
          Use this template
        </button>
      </div>
    </div>
  )
}

export const Step3 = () => {
  const { product, setStep, setProduct } = useStore()
  const templateId = useParam('templateId') as string

  const [categories, setCategories] = useState<string[]>([])
  const [templates, setTemplates] = useState<Template_V3[]>([])

  const [categoryId, setCategoryId] = useState(ALL_CATEGORY_NAME)
  const [template, setTemplate] = useState<Template_V3>()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const filteredTemplates = useMemo(() => {
    if (categoryId === ALL_CATEGORY_NAME) {
      return templates
    }

    return templates.filter(t => t.categoryId === categoryId)
  }, [categoryId, templates])

  const { loading: requestLoading, request } = useRequest(async () => {
    const templates = await ProductService.templates()
    const categories = arrayUnique(templates.map(t => t.categoryId))

    setCategories([ALL_CATEGORY_NAME, ...categories])
    setTemplates(templates)
  }, [])

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

  function handleBack() {
    setStep(2)
  }

  const handleNext = useCallback(() => {
    const tmpl = templates.find(t => t.id === product?.template)

    if (tmpl?.categoryId.toLowerCase() === 'portfolio') {
      return handleCreate()
    }

    setStep(4)
  }, [product?.template, templates])

  function handleSelect(template: string) {
    setTemplate(undefined)
    setProduct({
      ...product,
      template
    })
  }

  useEffect(() => {
    // 当 templateId 有值时跳过模板选择界面
    // TODO 检查 templateId 是否有效
    if (isValid(templateId)) {
      setProduct({
        ...product,
        template: templateId
      })
      setStep(4)
    } else {
      request()
    }
  }, [templateId])

  return (
    <>
      <div className="w-full md:w-[800px]">
        <button className="mb-8 text-gray-500 hover:text-gray-800" onClick={handleBack}>
          <IconArrowLeft />
        </button>

        <div className="mb-2 text-2xl font-bold text-slate-900">Choose a template</div>
        <div className="mb-8 text-slate-500">
          These are hand-picked templates that might suit your demand
        </div>

        {requestLoading ? (
          <Loading className="h-[50vh]" />
        ) : (
          <>
            <div className="flex items-center gap-4 mb-8">
              {categories.map(category => (
                <CategoryItem
                  key={category}
                  category={category}
                  isSelected={category === categoryId}
                  onClick={setCategoryId}
                />
              ))}
            </div>

            <div className="mb-8 grid grid-cols-2 gap-5">
              {filteredTemplates.map(template => (
                <TemplateItem
                  key={template.id}
                  template={template}
                  isSelected={product?.template === template.id}
                  onPreview={setTemplate}
                  onClick={handleSelect}
                />
              ))}
            </div>
          </>
        )}

        <Button
          type="success"
          loading={loading}
          disabled={isEmpty(product?.template)}
          className="!px-6 !py-2 !rounded-full !text-lg"
          onClick={handleNext}
        >
          Next
        </Button>

        {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
      </div>

      <PreviewModal
        template={template}
        onSelect={handleSelect}
        onClose={() => setTemplate(undefined)}
      />
    </>
  )
}

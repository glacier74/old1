import { Button } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import { IconArrowLeft } from '@tabler/icons'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, MouseEvent, useCallback, useMemo, useState } from 'react'

import templates from '~/layout/builder3/templates'
import { schemasToOptions } from '~/layout/builder3/utils'
import { PreviewModal } from '~/layout/create-product/PreviewModal'
import { ProductService } from '~/service'
import { useStore } from '~/store'

interface TemplateItemProps {
  template: Template_V3
  isSelected?: boolean
  onPreview: (template: Template_V3) => void
  onClick: (id: string) => void
}

interface CategoryItemProps {
  category: Category_V3
  isSelected?: boolean
  onClick: (id: string) => void
}

const CATEGORIES: Category_V3[] = [
  {
    id: 'all',
    name: 'All'
  },
  {
    id: 'landing_page',
    name: 'Landing page'
  },
  {
    id: 'portfolio',
    name: 'Portfolio'
  },
  {
    id: 'waitlist',
    name: 'Waitlist'
  },
  {
    id: 'app',
    name: 'App'
  }
]

const TEMPLATES: Template_V3[] = [
  {
    id: 'landing_page_01',
    name: 'Landing page 1',
    categoryId: 'landing_page',
    thumbnail: 'https://storage.earlybird.im/template/landing-page-01.jpg'
  },
  {
    id: 'landing_page_02',
    name: 'Landing page 2',
    categoryId: 'landing_page',
    thumbnail: 'https://storage.earlybird.im/template/landing-page-02.jpg'
  },
  {
    id: 'app_01',
    name: 'App',
    categoryId: 'app',
    thumbnail: 'https://storage.earlybird.im/template/app-01.png'
  },
  {
    id: 'waitlist_01',
    name: 'Waitlist',
    categoryId: 'waitlist',
    thumbnail: 'https://storage.earlybird.im/template/waitlist-01.png'
  },
  {
    id: 'dove',
    name: 'Dove',
    categoryId: 'portfolio',
    thumbnail: 'https://storage.earlybird.im/template/dove.png'
  },
  {
    id: 'indie_folio',
    name: 'Indie Folio',
    categoryId: 'portfolio',
    thumbnail: 'https://storage.earlybird.im/template/indie-folio.png'
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    categoryId: 'portfolio',
    thumbnail: 'https://storage.earlybird.im/template/obsidian.png'
  },
  {
    id: 'simple_bio',
    name: 'Simple Bio',
    categoryId: 'portfolio',
    thumbnail: 'https://storage.earlybird.im/template/simple-bio.png'
  },
  {
    id: 'tiny_folio',
    name: 'Tiny Folio',
    categoryId: 'portfolio',
    thumbnail: 'https://storage.earlybird.im/template/tiny-folio.png'
  },
  {
    id: 'bio_noir',
    name: 'Bio Noir',
    categoryId: 'portfolio',
    thumbnail: 'https://storage.earlybird.im/template/bio-noir.png'
  },
  {
    id: 'ebony',
    name: 'Ebony',
    categoryId: 'portfolio',
    thumbnail: 'https://storage.earlybird.im/template/ebony.png'
  },
  {
    id: 'black_matrix',
    name: 'Black Matrix',
    categoryId: 'portfolio',
    thumbnail: 'https://storage.earlybird.im/template/black-matrix.png'
  },
  {
    id: 'black_canvas',
    name: 'Black Canvas',
    categoryId: 'portfolio',
    thumbnail: 'https://storage.earlybird.im/template/black-canvas.png'
  }
]

const CategoryItem: FC<CategoryItemProps> = ({ category, isSelected, onClick }) => {
  function handleClick() {
    onClick(category.id)
  }

  return (
    <div
      className={clsx(
        'text-sm px-2 py-0.5 rounded-[12px] cursor-pointer',
        isSelected ? 'bg-[#10B981] text-white' : 'text-slate-800 hover:bg-slate-200'
      )}
      onClick={handleClick}
    >
      {category.name}
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
    <div
      className={clsx(
        'group relative cursor-pointer rounded-2xl shadow-sm transition-all hover:shadow-xl',
        {
          'ring-2 ring-blue-600 shadow-xl': isSelected
        }
      )}
      onClick={handleClick}
    >
      <Image
        className="w-full h-full bg-slate-100 rounded-2xl object-cover"
        src={template.thumbnail}
        alt={template.name}
        width={240}
        height={135}
      />
      <button
        type="button"
        className="absolute right-4 top-4 opacity-0 px-2 py-1 rounded-lg bg-emerald-500 text-white text-sm z-10 shadow-lg transition-colors hover:bg-emerald-600 group-hover:opacity-100"
        onClick={handlePreview}
      >
        Preview
      </button>
    </div>
  )
}

export const Step6 = () => {
  const router = useRouter()
  const { product, setStep, setProduct } = useStore()

  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id)
  const [template, setTemplate] = useState<Template_V3>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const filteredTemplates = useMemo(() => {
    if (categoryId === CATEGORIES[0].id) {
      return TEMPLATES
    }

    return TEMPLATES.filter(t => t.categoryId === categoryId)
  }, [categoryId])

  function handleBack() {
    setStep(5)
  }

  function handleClick(template: string) {
    setTemplate(undefined)
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
        blocks: schemasToOptions(templates[product!.template as string].schemas)
      })

      await router.replace(`/product/${productId}/edit`)
    } catch (err: any) {
      setError(err.message)
    }

    setLoading(false)
  }, [product])

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

        <div className="flex items-center gap-4 mb-8">
          {CATEGORIES.map(category => (
            <CategoryItem
              key={category.id}
              category={category}
              isSelected={category.id === categoryId}
              onClick={setCategoryId}
            />
          ))}
        </div>

        <div className="mb-8 grid grid-cols-3 gap-5">
          {filteredTemplates.map(template => (
            <TemplateItem
              key={template.id}
              template={template}
              isSelected={product?.template === template.id}
              onPreview={setTemplate}
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

      <PreviewModal
        template={template}
        onSelect={handleClick}
        onClose={() => setTemplate(undefined)}
      />
    </>
  )
}

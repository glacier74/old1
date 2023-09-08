import { isValid } from '@nily/utils'
import { IconCheck } from '@tabler/icons'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, MouseEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { Loading } from '~/components'
import { useStore } from '~/store'
import { useParam } from '~/utils'

import { PreviewModal } from '../PreviewModal'
import { StepContainer } from './StepContainer'
import { StepsStoreContext } from './context'

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
            className="px-2 py-1 rounded-lg text-emerald-600 text-sm bg-white border border-emerald-600 z-10 shadow-lg transition-colors hover:border-emerald-700 hover:text-emerald-700"
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
          className="px-2 py-1 rounded-lg text-white text-sm bg-emerald-600 opacity-0 hover:bg-emerald-700 group-hover/container:opacity-100"
          onClick={handleClick}
        >
          Use this template
        </button>
      </div>
    </div>
  )
}

export const StepTemplate = () => {
  const { product, setProduct } = useStore()
  const { state, dispatch } = useContext(StepsStoreContext)

  const template = useParam('template') as string

  const [categoryId, setCategoryId] = useState(ALL_CATEGORY_NAME)
  const [selected, setSelected] = useState<Template_V3>()

  const filteredTemplates = useMemo(() => {
    if (categoryId === ALL_CATEGORY_NAME) {
      return state.templates
    }

    return state.templates.filter(t => t.categoryId === categoryId)
  }, [categoryId, state.templates])

  const handleSelect = useCallback(
    (template: string) => {
      setSelected(undefined)
      setProduct({
        ...product,
        template
      })

      dispatch({
        type: 'toNext'
      })
    },
    [state.templates]
  )

  // 当 template 有值时跳过模板选择界面
  useEffect(() => {
    if (isValid(template)) {
      const index = state.templates.findIndex(t => t.id === template)

      if (index > -1) {
        handleSelect(template)
      }
    }
  }, [template])

  return (
    <>
      <StepContainer className="w-full md:w-[800px]">
        <div className="mb-2 text-2xl font-bold text-slate-900">Choose a template</div>
        <div className="mb-8 text-slate-500">
          These are hand-picked templates that might suit your demand
        </div>

        {state.isTemplateLoading ? (
          <Loading className="h-[50vh]" />
        ) : (
          <>
            <div className="flex items-center gap-4 mb-8">
              {[ALL_CATEGORY_NAME, ...state.categories].map(category => (
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
                  onPreview={setSelected}
                  onClick={handleSelect}
                />
              ))}
            </div>
          </>
        )}
      </StepContainer>

      <PreviewModal
        template={selected}
        onSelect={handleSelect}
        onClose={() => setSelected(undefined)}
      />
    </>
  )
}

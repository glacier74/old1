import { IconLayoutGrid } from '@tabler/icons'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useMemo } from 'react'

interface TemplateProps {
  templates: Template[]
  value?: string
  onChange?: (value: string) => void
}

interface TemplateItemProps {
  template: Template
  isSelected?: boolean
  onClick: (value: string) => void
}

const TEMPLATE_THUMBNAIL_URL = 'https://storage.earlybird.im/template/{id}.png'
const TEMPLATE_PREVIEW_URL = `https://{id}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`
const TEMPLATE_SCRATCH = 'BUILD_FROM_SCRATCH'

const ScratchItem: FC<Omit<TemplateItemProps, 'template'>> = ({ isSelected, onClick }) => {
  function handleClick() {
    onClick(TEMPLATE_SCRATCH)
  }

  return (
    <div
      className={clsx('p-2 rounded-md cursor-pointer', {
        'bg-white shadow-sm': isSelected
      })}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center border border-slate-200 h-[120px] rounded-md">
        <IconLayoutGrid className="w-8 h-8 non-scaling-stroke text-slate-500" />
      </div>
      <div className="mt-2 text-sm text-slate-700">Start from scratch</div>
    </div>
  )
}

const TemplateItem: FC<TemplateItemProps> = ({ template, isSelected, onClick }) => {
  const thumbnailURL = useMemo(
    () => TEMPLATE_THUMBNAIL_URL.replace('{id}', template.id),
    [template.id]
  )
  const previewURL = useMemo(() => TEMPLATE_PREVIEW_URL.replace('{id}', template.id), [template.id])

  function handleClick() {
    onClick(template.id)
  }

  return (
    <div
      className={clsx('group p-2 rounded-md cursor-pointer', {
        'bg-white shadow-sm': isSelected
      })}
      onClick={handleClick}
    >
      <div className="relative w-full h-[120px] border border-slate-200 rounded-md overflow-hidden">
        <Image
          className="w-full object-cover rounded-md"
          src={thumbnailURL}
          width={160}
          height={120}
          alt={template.name}
        />
        <a
          className="hidden group-hover:block absolute top-1 right-1 px-1 bg-green-500 text-white rounded text-sm hover:opacity-80"
          href={previewURL}
          target="_blank"
          rel="noreferrer"
        >
          Preview
        </a>
      </div>
      <div className="mt-2 text-sm text-slate-700">{template.name}</div>
    </div>
  )
}

export const Template: FC<TemplateProps> = ({ templates, value, onChange }) => {
  function handleClick(value: string) {
    onChange?.(value)
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <ScratchItem isSelected={value === TEMPLATE_SCRATCH} onClick={handleClick} />

      {templates.map(template => (
        <TemplateItem
          key={template.id}
          template={template}
          isSelected={template.id === value}
          onClick={handleClick}
        />
      ))}
    </div>
  )
}

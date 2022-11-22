import { Input, Switch, Tooltip } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { FC, startTransition, useMemo } from 'react'

import { AvatarPickerField, IconLayoutCenter, IconLayoutLeft, RoundImage } from '~/components'
import { useProduct } from '~/layout'
import { useBuilderContext } from '~/layout/builder/context'
import { ProductService } from '~/service'

import { BlockComponent, BlockPreview, BlockProps } from './Block'

export interface HeroSectionProps extends BlockProps {
  block: HeroSectionBlock
}

export const HeroSectionPreview: FC<HeroSectionProps & { product: Product }> = ({
  block,
  product
}) => {
  return (
    <BlockPreview className={`block-herosection-${block.layout}`} block={block}>
      <div className="pt-10">
        <a href="/" title={product.name}>
          <RoundImage src={product.logo} size={125} />
        </a>
        <h1 className="mt-12 sm:text-5xl text-3xl text-slate-900 font-bold">{product.name}</h1>
        <div className="block-herosection-tagline mt-4 max-w-3xl text-xl text-slate-500">
          {product.tagline}
        </div>
      </div>
    </BlockPreview>
  )
}

export const HeroSectionSettings: FC<Pick<HeroSectionProps, 'block'>> = ({ block }) => {
  const { t } = useTranslation()
  const { dispatch } = useBuilderContext()

  const options: any[] = useMemo(
    () => [
      {
        value: 'left',
        label: (
          <Tooltip ariaLabel="Align left">
            <IconLayoutLeft className="w-5 h-5" />
          </Tooltip>
        )
      },
      {
        value: 'center',
        label: (
          <Tooltip ariaLabel="Align center">
            <IconLayoutCenter className="w-5 h-5" />
          </Tooltip>
        )
      }
    ],
    []
  )

  function handleChange(layout: any) {
    dispatch({
      type: 'updateBlock',
      payload: {
        blockId: block.id,
        updates: {
          layout
        }
      }
    })
  }

  return (
    <div className="flex items-center justify-between px-4 py-2 text-slate-700">
      <span>{t('builder.layout')}</span>
      <Switch.Group value={block.layout} options={options} onChange={handleChange} />
    </div>
  )
}

export const HeroSection: FC<HeroSectionProps> = ({ block }) => {
  const { t } = useTranslation()
  const product = useProduct()

  async function handleUpdate(updates: AnyMap<string>) {
    await ProductService.update(product.id, updates)
  }

  function handleLogoChange(logo: any) {
    handleUpdate({
      logo
    })
  }

  function handleNameChange(name: any) {
    startTransition(() => {
      handleUpdate({
        name
      })
    })
  }

  function handleTaglineChange(tagline: any) {
    startTransition(() => {
      handleUpdate({
        tagline
      })
    })
  }

  return (
    <BlockComponent className={`block-herosection-${block.layout}`} block={block}>
      <div className="pt-10">
        <AvatarPickerField
          className="block-herosection-image"
          value={product?.logo}
          size={125}
          enableUnsplash={false}
          onChange={handleLogoChange}
        />

        <div className="block-herosection-name">
          <Input
            value={product?.name}
            placeholder={t('onboarding.name')}
            onChange={handleNameChange}
          />
        </div>

        <div className="block-herosection-tagline">
          <Input
            value={product?.tagline}
            placeholder={t('onboarding.tagline')}
            onChange={handleTaglineChange}
          />
        </div>
      </div>
    </BlockComponent>
  )
}

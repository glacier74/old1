import { Input } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { FC, startTransition } from 'react'

import { AvatarPickerField, RoundImage } from '~/components'
import { useProduct } from '~/layout'
import { ProductService } from '~/service'

import { BlockComponent, BlockPreview, BlockProps } from './Block'

export const HeroSectionPreview: FC<BlockProps & { product: Product }> = ({ block, product }) => {
  return (
    <BlockPreview className="py-24 text-center" block={block}>
      <div className="pt-10">
        <a href="/" title={product.name}>
          <RoundImage src={product.logo} size={125} />
        </a>
        <h1 className="mt-12 sm:text-5xl text-3xl text-slate-900 font-bold">{product.name}</h1>
        <div className="mt-4 max-w-3xl text-xl text-slate-500">{product.tagline}</div>
      </div>
    </BlockPreview>
  )
}

export const HeroSection: FC<BlockProps> = ({ block }) => {
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
    <BlockComponent className="py-24" block={block}>
      <div className="pt-10">
        <AvatarPickerField
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

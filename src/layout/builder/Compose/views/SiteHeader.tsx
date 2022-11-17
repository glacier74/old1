import { Input } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { startTransition } from 'react'

import { LogoPickerField } from '~/components'
import { useProduct } from '~/layout'
import { ProductService } from '~/service'

export const SiteHeader = () => {
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
    <div className="site-header mt-10 py-10">
      <LogoPickerField
        value={product?.logo}
        size={100}
        enableUnsplash={false}
        onChange={handleLogoChange}
      />

      <div className="editor-name">
        <Input
          value={product?.name}
          placeholder={t('onboarding.name')}
          onChange={handleNameChange}
        />
      </div>

      <div className="editor-tagline mt-3">
        <Input
          value={product?.tagline}
          placeholder={t('onboarding.tagline')}
          onChange={handleTaglineChange}
        />
      </div>
    </div>
  )
}

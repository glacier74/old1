import { Input } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import { useTranslation } from 'next-i18next'

import { useStore } from '~/store'

import { StepContainer } from './StepContainer'

export const StepJingleBioProfile = () => {
  const { t } = useTranslation('dashboard')
  const { product, setProduct } = useStore()

  function handleChange(name: string) {
    setProduct({
      ...product,
      name
    })
  }

  return (
    <StepContainer isNextButtonDisabled={isEmpty(product?.name)}>
      <div className="flex items-center mb-2 text-3xl font-semibold text-slate-950">
        {t('createProduct.jbHeading')}{' '}
        <Input className="create-product-input" value={product?.name} onChange={handleChange} />
      </div>
      <p className="mb-8 text-slate-500 text-xl">{t('createProduct.jbDesc')}</p>
    </StepContainer>
  )
}

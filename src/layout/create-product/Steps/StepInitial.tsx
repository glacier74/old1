import { useTranslation } from 'next-i18next'

import { StepContainer } from './StepContainer'

export const StepInitial = () => {
  const { t } = useTranslation('dashboard')

  return (
    <StepContainer className="max-w-2xl">
      <div className="mb-2 text-3xl font-semibold text-slate-950">
        {t('createProduct.siHeading')}
      </div>
      <p className="mb-8 text-slate-500 text-xl">{t('createProduct.siDesc')}</p>
    </StepContainer>
  )
}

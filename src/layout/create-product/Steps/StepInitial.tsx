import { Radio } from '@heyforms/ui'
import { isFalse } from '@nily/utils'
import { useTranslation } from 'next-i18next'
import { useContext } from 'react'

import { BIO_PAGE_STEPS, LANDING_PAGE_STEPS } from '~/layout'
import { StepsStoreContext } from '~/layout/create-product/Steps/context'

import { StepContainer } from './StepContainer'

export const StepInitial = () => {
  const { t } = useTranslation('dashboard')
  const { state, dispatch } = useContext(StepsStoreContext)

  function handleChange(type: string) {
    const steps = type === 'landingPage' ? LANDING_PAGE_STEPS : BIO_PAGE_STEPS

    dispatch({
      type: 'setState',
      payload: {
        type,
        steps: steps.map((s: any) => ({
          value: s.value,
          isAllowToPrev: !isFalse(s.isAllowToPrev),
          isNextButtonShow: !isFalse(s.isNextButtonShow)
        }))
      }
    })
  }

  return (
    <StepContainer className="max-w-2xl">
      <div className="mb-2 text-3xl font-semibold text-slate-950">
        {t('createProduct.siHeading')}
      </div>
      <p className="mb-8 text-slate-500 text-xl">{t('createProduct.siDesc')}</p>
      <p className="mb-2 text-slate-800 text-sm">{t('createProduct.siDesc2')}</p>
      <div className="create-product-radio-group">
        <Radio.Group
          value={state.type}
          options={[
            {
              label: 'Landing Page',
              value: 'landingPage'
            },
            {
              label: 'Bio Page',
              value: 'bioPage'
            }
          ]}
          onChange={handleChange}
        />
      </div>
    </StepContainer>
  )
}

import { Input } from '@heyforms/ui'
import { isEmpty, isValid } from '@nily/utils'
import { useTranslation } from 'next-i18next'
import { useCallback, useContext } from 'react'

import { StepContainer } from './StepContainer'
import { StepsStoreContext } from './context'

export const StepJingleBioProfile = () => {
  const { t } = useTranslation('dashboard')
  const { state, dispatch } = useContext(StepsStoreContext)

  const handleChange = useCallback((newValue: string) => {
    dispatch({
      type: 'setState',
      payload: {
        name: isValid(newValue) ? newValue.trim() : undefined
      }
    })
  }, [])

  return (
    <StepContainer isNextButtonDisabled={isEmpty(state.name)}>
      <div className="md:flex md:items-center mb-2 text-3xl font-semibold text-slate-950">
        {t('createProduct.jbHeading')}{' '}
        <Input className="create-product-input" value={state.name} onChange={handleChange} />
      </div>
      <p className="mb-8 text-slate-500 text-xl">{t('createProduct.jbDesc')}</p>
    </StepContainer>
  )
}

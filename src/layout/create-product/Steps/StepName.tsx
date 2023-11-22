import { Input } from '@heyforms/ui'
import { isEmpty, isValid } from '@nily/utils'
import { useTranslation } from 'next-i18next'
import router from 'next/router'
import { useCallback, useContext, useState } from 'react'

import templates from '~/layout/builder3/templates'
import { schemasToOptions } from '~/layout/builder3/utils'
import { ProductService } from '~/service'

import { StepContainer } from './StepContainer'
import { StepsStoreContext } from './context'

export const StepName = () => {
  const { t } = useTranslation('dashboard')
  const { state, dispatch } = useContext(StepsStoreContext)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const handleCreate = useCallback(async () => {
    setLoading(true)
    setError(undefined)

    try {
      const productId = await ProductService.create({
        name: state.name,
        template: state.template,
        blocks: schemasToOptions(templates[state.template!].schemas),
        category: '',
        tagline: ''
      })

      await router.replace(`/product/${productId}/edit`)
    } catch (err: any) {
      setError(err.message)
    }

    setLoading(false)
  }, [state.name, state.template])

  function handleChange(newValue: any) {
    if (isValid(newValue)) {
      dispatch({
        type: 'setState',
        payload: {
          name: newValue.trim()
        }
      })
    }
  }

  return (
    <StepContainer
      isNextButtonDisabled={isEmpty(state.name)}
      isNextButtonLoading={loading}
      onNextButtonClick={handleCreate}
    >
      <div className="flex items-center mb-2 text-3xl font-semibold text-slate-950">
        {t('createProduct.snHeading')}{' '}
        <Input className="create-product-input" value={state.name} onChange={handleChange} />
      </div>
      <p className="mb-8 text-slate-500 text-xl">{t('createProduct.snDesc')}</p>

      {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
    </StepContainer>
  )
}

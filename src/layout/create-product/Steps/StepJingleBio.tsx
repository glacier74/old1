import { Input } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import { useTranslation } from 'next-i18next'
import router from 'next/router'
import { useCallback, useState } from 'react'

import templates from '~/layout/builder3/templates'
import { schemasToOptions } from '~/layout/builder3/utils'
import { ProductService } from '~/service'

import { StepContainer } from './StepContainer'

export const StepJingleBio = () => {
  const { t } = useTranslation('dashboard')

  const [name, setName] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const handleCreate = useCallback(async () => {
    setLoading(true)
    setError(undefined)

    try {
      const blocks = schemasToOptions(templates['jingle-bio'].schemas)

      // Update Jingle Bio block
      blocks.personal_info.name = name

      const productId = await ProductService.create({
        name,
        template: 'jingle-bio',
        blocks,
        category: '',
        tagline: '',
        isJingleBio: true
      })

      await router.replace(`/product/${productId}/edit`)
    } catch (err: any) {
      setError(err.message)
    }

    setLoading(false)
  }, [name])

  return (
    <StepContainer
      isNextButtonDisabled={isEmpty(name)}
      isNextButtonLoading={loading}
      onNextButtonClick={handleCreate}
    >
      <div className="flex items-center mb-2 text-3xl font-semibold text-slate-950">
        {t('createProduct.jbHeading')}{' '}
        <Input className="create-product-input" value={name} onChange={setName} />
      </div>
      <p className="mb-8 text-slate-500 text-xl">{t('createProduct.jbDesc')}</p>

      {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
    </StepContainer>
  )
}

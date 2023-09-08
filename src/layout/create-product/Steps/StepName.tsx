import { Input } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'

import { useStore } from '~/store'

import { StepContainer } from './StepContainer'

export const StepName = () => {
  const { product, setProduct } = useStore()

  function handleChange(name: any) {
    setProduct({
      ...product,
      name
    })
  }

  return (
    <StepContainer isNextButtonDisabled={isEmpty(product?.name)}>
      <div className="flex items-center mb-2 text-3xl font-semibold text-slate-950">
        I would call the landing page{' '}
        <Input className="create-product-input" value={product?.name} onChange={handleChange} />
      </div>
      <p className="mb-8 text-slate-500 text-xl">Choose a name for your landing page.</p>
    </StepContainer>
  )
}

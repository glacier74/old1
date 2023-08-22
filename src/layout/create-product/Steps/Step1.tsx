import { Button, Input } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import { IconArrowLeft } from '@tabler/icons'

import { useStore } from '~/store'

export const Step1 = () => {
  const { product, setStep, setProduct } = useStore()

  function handleBack() {
    setStep(0)
  }

  function handleClick() {
    setStep(2)
  }

  function handleChange(name: any) {
    setProduct({
      ...product,
      name
    })
  }

  return (
    <div>
      <button className="mb-8 text-gray-500 hover:text-gray-800" onClick={handleBack}>
        <IconArrowLeft />
      </button>
      <div className="flex items-center mb-2 text-3xl font-semibold text-slate-950">
        I would call the landing page{' '}
        <Input className="create-product-input" value={product?.name} onChange={handleChange} />
      </div>
      <p className="mb-8 text-slate-500 text-xl">Choose a name for your landing page.</p>

      <Button
        type="success"
        className="!px-6 !py-2 !rounded-full !text-lg"
        disabled={isEmpty(product?.name)}
        onClick={handleClick}
      >
        Next
      </Button>
    </div>
  )
}

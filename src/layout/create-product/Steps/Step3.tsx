import { Button, Input } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import { IconArrowLeft } from '@tabler/icons'

import { useStore } from '~/store'

export const Step3 = () => {
  const { product, setStep, setProduct } = useStore()

  function handleBack() {
    setStep(2)
  }

  function handleClick() {
    setStep(4)
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
      <div className="flex items-center mb-2 text-2xl font-bold text-slate-900">
        I would call the landing page{' '}
        <Input className="create-product-input" value={product?.name} onChange={handleChange} />
      </div>
      <p className="mb-8 text-slate-500">
        Understanding your industry would enable us to better comprehend your specific needs and
        requirements.
      </p>

      <Button
        type="success"
        className="!px-6 !py-2.5"
        disabled={isEmpty(product?.name)}
        onClick={handleClick}
      >
        Next
      </Button>
    </div>
  )
}

import { Button, Input } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import { IconArrowLeft } from '@tabler/icons'

import { useStore } from '~/store'

export const Step4 = () => {
  const { product, setStep, setProduct } = useStore()

  function handleBack() {
    setStep(3)
  }

  function handleClick() {
    setStep(5)
  }

  function handleChange(customer: any) {
    setProduct({
      ...product,
      customer
    })
  }

  return (
    <div className="w-full md:w-[800px]">
      <button className="mb-8 text-gray-500 hover:text-gray-800" onClick={handleBack}>
        <IconArrowLeft />
      </button>

      <div className="mb-2 text-3xl font-semibold text-slate-950">
        Who would be your ideal customers?
      </div>
      <Input
        className="create-product-input !ml-0"
        value={product?.customer}
        onChange={handleChange}
      />
      <div className="mt-6 mb-8 text-sm">
        <div className="font-medium text-slate-600">Provide specific roles such as: </div>
        <ul className="mt-1 text-[13px] list-disc pl-4 text-slate-500">
          <li>Project manager</li>
          <li>Marketing teams</li>
          <li>Business professionals</li>
        </ul>
      </div>

      <Button
        type="success"
        className="!px-6 !py-2 !rounded-full !text-lg"
        disabled={isEmpty(product?.customer)}
        onClick={handleClick}
      >
        Next
      </Button>
    </div>
  )
}

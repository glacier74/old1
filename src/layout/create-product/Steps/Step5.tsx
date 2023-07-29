import { Button, Input } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import { IconArrowLeft } from '@tabler/icons'

import { useStore } from '~/store'

export const Step5 = () => {
  const { product, setStep, setProduct } = useStore()

  function handleBack() {
    setStep(4)
  }

  function handleClick() {
    setStep(6)
  }

  function handleChange(tagline: any) {
    setProduct({
      ...product,
      tagline
    })
  }

  return (
    <div className="w-full md:w-[800px]">
      <button className="mb-8 text-gray-500 hover:text-gray-800" onClick={handleBack}>
        <IconArrowLeft />
      </button>

      <div className="mb-2 text-2xl font-bold text-slate-900">My customers need it to</div>
      <Input
        className="create-product-input !ml-0"
        value={product?.tagline}
        onChange={handleChange}
      />
      <div className="mt-6 mb-8 text-sm">
        <p className="font-medium text-slate-600">
          Short and specific, use this pattern: "My customers need it to [benefit]"{' '}
        </p>
        <ul className="mt-1 text-[13px] list-disc pl-4 text-slate-500">
          <li>streamline project management</li>
          <li>automate business tasks</li>
          <li>delve into customer analytics</li>
        </ul>
      </div>

      <Button
        type="success"
        className="!px-6 !py-2.5"
        disabled={isEmpty(product?.tagline)}
        onClick={handleClick}
      >
        Next
      </Button>
    </div>
  )
}

import { Button } from '@heyforms/ui'

import { useStore } from '~/store'

export const Step1 = () => {
  const { setStep } = useStore()

  function handleClick() {
    setStep(2)
  }

  return (
    <div className="max-w-xl">
      <div className="mb-2 text-2xl font-bold text-slate-900">
        Hooray! Let's take your idea online.
      </div>
      <p className="mb-8 text-slate-500">
        Answer a few questions and you'll be ready to go in just five minutes.
      </p>

      <Button type="success" className="!px-5 !py-2" onClick={handleClick}>
        Get started
      </Button>
    </div>
  )
}

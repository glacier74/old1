import { Button } from '@heyforms/ui'

import { useStore } from '~/store'

export const Step0 = () => {
  const { setStep } = useStore()

  function handleClick() {
    setStep(1)
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-2 text-3xl font-semibold text-slate-950">
        Hooray! Let's take your brilliant idea online.
      </div>
      <p className="mb-8 text-slate-500 text-xl">
        Answer a few questions and have your landing page up in minutes.
      </p>

      <Button type="success" className="!px-6 !py-2 !rounded-full !text-lg" onClick={handleClick}>
        Let's go!
      </Button>
    </div>
  )
}

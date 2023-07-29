import { useEffect } from 'react'

import { useStore } from '~/store'

import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'
import { Step4 } from './Step4'
import { Step5 } from './Step5'
import { Step6 } from './Step6'

export const Steps = () => {
  const { step, setStep, setProduct } = useStore()

  useEffect(() => {
    setStep(0)
    setProduct(undefined)
  }, [])

  switch (step) {
    case 2:
      return <Step2 />

    case 3:
      return <Step3 />

    case 4:
      return <Step4 />

    case 5:
      return <Step5 />

    case 6:
      return <Step6 />

    default:
      return <Step1 />
  }
}

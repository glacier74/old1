import { Button } from '@heyforms/ui'
import { StepType, TourProvider, useTour } from '@reactour/tour'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { Dispatch, FC, SetStateAction, useCallback, useEffect } from 'react'
import { useLocalStorage } from 'react-use'

interface TourClickProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
  stepsLength: number
  currentStep: number
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

interface NextButtonProps extends TourClickProps {
  name: string
  value?: Record<string, boolean>
  setValue: Dispatch<SetStateAction<Record<string, boolean>>>
}

interface TourProps extends ComponentProps {
  steps: StepType[]
  name: string
}

export function useOpenTour(name: string) {
  const { setIsOpen } = useTour()
  const [value] = useLocalStorage<Record<string, boolean>>('tour', {})

  useEffect(() => {
    if (value && value![name]) {
      return
    }

    setIsOpen(true)
  }, [])
}

const Dots: FC<Pick<TourClickProps, 'currentStep' | 'stepsLength'>> = ({
  currentStep,
  stepsLength
}) => {
  if (stepsLength <= 1) {
    return null
  }

  const arr = Array.from({ length: stepsLength })

  return (
    <div className="flex items-center space-x-1">
      {arr.map((_, index) => (
        <div
          key={index}
          className={clsx('w-1.5 h-1.5 rounded-full bg-slate-200', {
            'bg-green-500': index === currentStep
          })}
        />
      ))}
    </div>
  )
}

const PreviousButton: FC<Pick<TourClickProps, 'currentStep' | 'setCurrentStep'>> = ({
  currentStep,
  setCurrentStep
}) => {
  const { t } = useTranslation()

  if (currentStep < 1) {
    return null
  }

  function handleClick() {
    setCurrentStep(currentStep - 1)
  }

  return (
    <Button className="!py-1 !px-2" onClick={handleClick}>
      {t('common.previous')}
    </Button>
  )
}

const NextButton: FC<TourClickProps> = ({
  currentStep,
  setCurrentStep,
  setIsOpen,
  stepsLength
}) => {
  const { t } = useTranslation()

  if (stepsLength <= 1) {
    return null
  }

  const isLast = currentStep === stepsLength - 1

  if (isLast) {
    function handleFinish() {
      setIsOpen(false)
    }

    return (
      <Button type="success" className="!py-1 !px-2" onClick={handleFinish}>
        {t('common.finish')}
      </Button>
    )
  }

  function handleClick() {
    setCurrentStep(currentStep + 1)
  }

  return (
    <Button type="success" className="!py-1 !px-2" onClick={handleClick}>
      {t('common.next')}
    </Button>
  )
}

export const Tour: FC<TourProps> = ({ steps, name, children, ...restProps }) => {
  const [value, setValue] = useLocalStorage<Record<string, boolean>>('earlybird_tour', {})

  const nextButton = ({ currentStep, stepsLength, setIsOpen, setCurrentStep }: any) => {
    return (
      <div className="flex items-center justify-between w-full">
        <Dots currentStep={currentStep} stepsLength={stepsLength} />

        <div className="flex items-center space-x-3">
          <PreviousButton setCurrentStep={setCurrentStep} currentStep={currentStep} />
          <NextButton
            setCurrentStep={setCurrentStep}
            stepsLength={stepsLength}
            currentStep={currentStep}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
    )
  }

  const handleClickMask = useCallback(() => {
    // Do nothing
  }, [])

  const handleBeforeClose = useCallback(() => {
    setValue({ ...value, [name]: true })
  }, [value, name])

  return (
    <TourProvider
      steps={steps}
      styles={{
        popover: base => ({
          ...base,
          minWidth: 500,
          padding: '1rem'
        })
      }}
      showBadge={false}
      showDots={false}
      prevButton={() => null}
      nextButton={nextButton}
      onClickMask={handleClickMask}
      beforeClose={handleBeforeClose}
      {...restProps}
    >
      {children}
    </TourProvider>
  )
}

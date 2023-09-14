import { Button } from '@heyforms/ui'
import { IComponentProps } from '@heyforms/ui/types/typing'
import { IconArrowLeft } from '@tabler/icons'
import { FC, useContext, useMemo } from 'react'

import { StepsStoreContext } from './context'

interface StepContainerProps extends IComponentProps {
  isNextButtonLoading?: boolean
  isNextButtonDisabled?: boolean
  onNextButtonClick?: () => void
}

export const StepContainer: FC<StepContainerProps> = ({
  children,
  isNextButtonLoading,
  isNextButtonDisabled,
  onNextButtonClick,
  ...restProps
}) => {
  const { state, dispatch } = useContext(StepsStoreContext)
  const step = useMemo(
    () => state.steps.find(s => s.value === state.active),
    [state.active, state.steps]
  )

  function handlePrev() {
    dispatch({
      type: 'toPrev'
    })
  }

  function handleNext() {
    if (onNextButtonClick) {
      return onNextButtonClick()
    }

    dispatch({
      type: 'toNext'
    })
  }

  return (
    <div {...restProps}>
      {step?.isAllowToPrev && (
        <button className="mb-8 text-gray-500 hover:text-gray-800" onClick={handlePrev}>
          <IconArrowLeft />
        </button>
      )}

      {children}

      {step?.isNextButtonShow && (
        <Button
          type="success"
          className="!px-6 !py-1.5 !rounded-full !text-base"
          loaderClassName="!rounded-full"
          disabled={isNextButtonDisabled}
          loading={isNextButtonLoading}
          onClick={handleNext}
        >
          Next
        </Button>
      )}
    </div>
  )
}

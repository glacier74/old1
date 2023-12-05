import { Button } from '@heyforms/ui'
import { IComponentProps } from '@heyforms/ui/types/typing'
import { IconArrowLeft } from '@tabler/icons'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { FC, useContext, useMemo } from 'react'

import { StepsStoreContext } from './context'

interface StepContainerProps extends IComponentProps {
  isNextButtonLoading?: boolean
  isNextButtonDisabled?: boolean
  onNextButtonClick?: () => void
}

export const StepContainer: FC<StepContainerProps> = ({
  className,
  children,
  isNextButtonLoading,
  isNextButtonDisabled,
  onNextButtonClick,
  ...restProps
}) => {
  const { t } = useTranslation('dashboard')

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
    <div className={clsx('mt-8 md:mt-0', className)} {...restProps}>
      {step?.isAllowToPrev && (
        <button
          className="mb-8 p-2 md:p-0 -ml-2 md:ml-0 text-gray-500 hover:text-gray-800"
          onClick={handlePrev}
        >
          <IconArrowLeft />
        </button>
      )}

      {children}

      {step?.isNextButtonShow && (
        <Button
          type="success"
          className="w-full md:w-auto !px-6 !py-1.5 !rounded-full !text-base"
          loaderClassName="!rounded-full"
          disabled={isNextButtonDisabled}
          loading={isNextButtonLoading}
          onClick={handleNext}
        >
          {t('common.next')}
        </Button>
      )}
    </div>
  )
}

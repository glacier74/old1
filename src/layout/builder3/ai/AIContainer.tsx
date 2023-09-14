import { Button } from '@heyforms/ui'
import { IComponentProps } from '@heyforms/ui/types/typing'
import { IconArrowLeft } from '@tabler/icons'
import clsx from 'clsx'
import { FC, useContext, useMemo } from 'react'

import { AIStoreContext } from './context'

interface AIContainerProps extends IComponentProps {
  isNextButtonDisabled?: boolean
  onNextButtonClick?: () => void
}

export const AIContainer: FC<AIContainerProps> = ({
  children,
  isNextButtonDisabled,
  onNextButtonClick,
  ...restProps
}) => {
  const { state, dispatch } = useContext(AIStoreContext)

  const count = useMemo(() => state.steps.filter(s => !s.isHidden).length, [state.steps])
  const index = useMemo(
    () => state.steps.filter(s => !s.isHidden).findIndex(s => s.value === state.active),
    [state.active, state.steps]
  )
  const step = useMemo(() => (index > -1 ? state.steps[index] : undefined), [index, state.steps])

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
      <div className="h-[450px] px-8 pt-12 pb-8">{children}</div>
      <div className="text-sm px-8 py-5 border-t border-slate-200">
        <div className="flex items-center">
          <div className="w-[100px]">
            <button
              className={clsx(
                'flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800',
                !step?.isAllowToPrev && 'opacity-0 pointer-events-none'
              )}
              onClick={handlePrev}
            >
              <IconArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>

          <div className="flex-1 flex justify-center items-center gap-1">
            {Array.from({ length: count }).map((_, idx) => (
              <span
                key={idx}
                className={clsx(
                  'w-1.5 h-1.5 rounded-full',
                  idx === index ? 'bg-slate-600' : 'bg-slate-300'
                )}
              />
            ))}
          </div>

          <div className="w-[100px] flex justify-end">
            <Button
              type="success"
              className="!px-6 !py-1.5"
              loaderClassName="!rounded-full"
              disabled={isNextButtonDisabled}
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

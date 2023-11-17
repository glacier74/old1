import { Button, Tooltip } from '@heyforms/ui'
import { IconArrowLeft, IconX } from '@tabler/icons'
import clsx from 'clsx'
import { FC } from 'react'

import { useBuilderContext } from '~/layout/builder3/context'

interface OptionsContainerProps extends ComponentProps {
  title: string
  onGoBack?: () => void
}

export const OptionsContainer: FC<OptionsContainerProps> = ({
  className,
  title,
  children,
  onGoBack,
  ...restProps
}) => {
  const { dispatch } = useBuilderContext()

  function handleClose() {
    dispatch({
      type: 'updateState',
      payload: {
        selectedSection: undefined
      }
    })
  }

  return (
    <div className={clsx('absolute inset-0 bg-white', className)} {...restProps}>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between px-5 border-b border-gray-200">
          <div className="flex items-center gap-1">
            {onGoBack && (
              <button className="flex items-center gap-1 cursor-pointer" onClick={onGoBack}>
                <IconArrowLeft />
              </button>
            )}
            <div className="py-4 text-slate-900 font-semibold text-sm">{title}</div>
          </div>

          <Tooltip ariaLabel="Close">
            <div>
              <Button
                className="!border-none !p-1 -mr-1 text-slate-700"
                leading={<IconX />}
                onClick={handleClose}
              />
            </div>
          </Tooltip>
        </div>

        <div className="flex-1 py-5 scrollbar">{children}</div>
      </div>
    </div>
  )
}

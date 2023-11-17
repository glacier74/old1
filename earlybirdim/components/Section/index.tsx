import { useGlobalContext } from '@earlybirdim/components'
import { Button } from '@heyforms/ui'
import { IconPencil } from '@tabler/icons'
import clsx from 'clsx'
import { FC } from 'react'

import { useBuilderContext } from '~/layout/builder3/context'

import { SectionProps } from './SectionProps'

export const Section: FC<SectionProps> = ({ name, className, children, ...restProps }) => {
  const { isPreview } = useGlobalContext()
  const { dispatch } = useBuilderContext()

  function handleClick() {
    dispatch({
      type: 'updateState',
      payload: {
        selectedSection: {
          type: 'section',
          name: name
        }
      }
    })
  }

  return (
    <div
      className={clsx(
        {
          'relative group': isPreview
        },
        className
      )}
      {...restProps}
    >
      {children}
      {isPreview && (
        <div className="absolute left-0 right-0 -bottom-6 flex justify-center will-change-auto opacity-0 group-hover:opacity-100">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 px-2 py-1.5 sm:text-sm font-medium bg-white dark:bg-[#0f172a] text-slate-700 dark:text-slate-50 rounded-lg shadow-lg">
            <Button
              className="flex items-center gap-2 py-1 pl-1 pr-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
              leading={<IconPencil className="w-5 h-5" />}
              onClick={handleClick}
            >
              Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

import { Button } from '@heyforms/ui'
import { IComponentProps } from '@heyforms/ui/types/typing'
import clsx from 'clsx'
import { FC, ReactNode, useState } from 'react'

interface ExpandableProps extends Omit<IComponentProps, 'title'> {
  title: ReactNode
  description?: ReactNode
  expanded?: boolean
}

export const Expandable: FC<ExpandableProps> = ({
  className,
  title,
  description,
  expanded: rawExpanded = false,
  children,
  ...restProps
}) => {
  const [expanded, setExpanded] = useState(rawExpanded)

  function handleClick() {
    setExpanded(value => !value)
  }

  return (
    <div className={clsx('expandable px-6 py-5', className)} {...restProps}>
      <div className="flex items-start justify-between">
        <div className="text-sm">
          <h4 className="text-base text-slate-900 font-bold">{title}</h4>
          <div className="mt-1 text-slate-500 font-normal">{description}</div>
        </div>
        <Button className="ml-3 w-[4.5rem] !px-2.5 !py-1" onClick={handleClick}>
          {expanded ? 'Close' : 'Expand'}
        </Button>
      </div>
      <div className={clsx('mt-4', expanded ? 'block' : 'hidden')}>{children}</div>
    </div>
  )
}

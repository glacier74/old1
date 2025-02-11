import clsx from 'clsx'
import { FC } from 'react'

export const WidgetImagePlaceholder: FC<ComponentProps> = ({ className, ...restProps }) => {
  return (
    <div className={clsx('relative', className)} {...restProps}>
      <div className="flex items-center w-full h-full rounded-xl bg-black/5">
        <div className="text-xs text-black/60 px-4 text-center [text-shadow:_0_1px_0_rgb(255_255_255_/_40%)]">
          There is no preview image available.
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 border border-black/10 rounded-xl"></div>
      <div className="pointer-events-none absolute inset-0 border border-white/20 rounded-xl"></div>
    </div>
  )
}

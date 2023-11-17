import { useGlobalContext } from '@earlybirdim/components'
import clsx from 'clsx'

import { WidgetConfig, WidgetData } from '../WidgetProps'

export class GroupTitleWidget {
  protected config?: WidgetConfig<WidgetData>

  constructor(config?: WidgetConfig<WidgetData>) {
    this.config = config
  }

  public getComponent() {
    if (this.config) {
      return <GroupTitleWidget.Render {...this.config} />
    }

    return null
  }

  private static Render(config: WidgetConfig<WidgetData>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isPreview } = useGlobalContext()

    return (
      <div
        className={clsx(
          'widget-body w-full h-full text-xl px-4 font-bold text-slate-950 dark:text-slate-50',
          {
            'relative rounded-3xl will-change-auto bg-white border border-transparent dark:bg-[#020617] group-hover/widget:border-emerald-600':
              isPreview
          }
        )}
      >
        {config.data.overrides?.title}
      </div>
    )
  }
}

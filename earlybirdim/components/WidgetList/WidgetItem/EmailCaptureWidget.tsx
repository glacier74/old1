import { useGlobalContext } from '@earlybirdim/components'

import { WidgetIcon } from '../WidgetIcon'
import { EmailCaptureData, WidgetConfig } from '../WidgetProps'
import { emailCapture } from '../constants'
import Widget from './Widget'
import { WidgetEmailCaptureButton } from './WidgetEmailCaptureButton'
import { WidgetImagePlaceholder } from './WidgetImagePlaceholder'

export default class EmailCaptureWidget<T extends EmailCaptureData> extends Widget<T> {
  constructor(config: WidgetConfig) {
    super()
    this.setConfig({
      ...config,
      extra: emailCapture
    })
  }

  override Render1x1(config: WidgetConfig<T>) {
    return (
      <a className="block w-full h-full" href={config.url}>
        <div className="flex h-full flex-col">
          <WidgetIcon type={config.type} />

          <div className="mt-2 md:mt-3 flex-1">
            <h3 className="line-clamp-1 text-sm leading-[1.2] text-slate-950 dark:text-slate-50">
              {config.data.overrides?.title}
            </h3>
          </div>

          <div className="inline-flex">
            <WidgetEmailCaptureButton config={config} />
          </div>
        </div>
      </a>
    )
  }

  // 2x1
  override Render2x1(config: WidgetConfig<T>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isPreview } = useGlobalContext()

    return (
      <a className="block w-full h-full" href={config.url}>
        <div className="flex h-full">
          <div className="flex h-full w-full flex-1 flex-col">
            <div className="flex justify-between">
              <WidgetIcon type={config.type} />
            </div>

            <div className="mt-2 md:mt-3 flex-1">
              <h3 className="line-clamp-1 text-sm leading-[1.2] text-slate-950 dark:text-slate-50">
                {config.data.overrides?.title}
              </h3>
            </div>

            <div className="inline-flex">
              <WidgetEmailCaptureButton config={config} />
            </div>
          </div>

          {config.data.overrides?.imageUrl ? (
            <div className="relative ml-6 aspect-[1.4] h-full">
              <img
                className="h-full w-full rounded-xl object-cover"
                src={config.data.overrides?.imageUrl}
                alt={config.data.overrides?.title}
              />
              <div className="pointer-events-none absolute inset-0 border border-black/10 rounded-xl"></div>
            </div>
          ) : isPreview ? (
            <WidgetImagePlaceholder className="ml-6 aspect-[1.4] h-full" />
          ) : null}
        </div>
      </a>
    )
  }

  // 2x1
  override Render2x2(config: WidgetConfig<T>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isPreview } = useGlobalContext()

    return (
      <a className="block w-full h-full" href={config.url}>
        <div className="flex h-full flex-col">
          <div>
            <div className="flex justify-between">
              <WidgetIcon type={config.type} />

              <div className="flex items-start">
                <WidgetEmailCaptureButton config={config} />
              </div>
            </div>

            <div className="mt-3">
              <h3 className="line-clamp-2 text-sm text-slate-950 dark:text-slate-50">{config.data.overrides?.title}</h3>
            </div>
          </div>

          <div className="flex-1"></div>

          {config.data.overrides?.imageUrl ? (
            <div className="relative mt-6 aspect-[40/21]">
              <img
                className="aspect-[40/21] rounded-xl object-cover"
                src={config.data.overrides?.imageUrl}
                alt={config.data.overrides?.title}
              />
              <div className="pointer-events-none absolute inset-0 border border-black/10 rounded-xl"></div>
            </div>
          ) : isPreview ? (
            <WidgetImagePlaceholder className="mt-6 aspect-[40/21]" />
          ) : null}
        </div>
      </a>
    )
  }
}

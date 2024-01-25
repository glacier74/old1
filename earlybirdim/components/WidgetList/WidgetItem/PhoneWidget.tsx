import { useGlobalContext } from '@earlybirdim/components'
import clsx from 'clsx'

import { Image } from '../../Image'
import { WidgetIcon } from '../WidgetIcon'
import { PhoneData, WidgetConfig } from '../WidgetProps'
import { phone } from '../constants'
import Widget from './Widget'
import { WidgetEmailCaptureText } from './WidgetEmailCaptureButton'
import { WidgetImagePlaceholder } from './WidgetImagePlaceholder'

export default class PhoneWidget<T extends PhoneData> extends Widget<T> {
  constructor(config: WidgetConfig) {
    super()
    this.setConfig({
      ...config,
      extra: phone
    })
  }

  override Render1x1(config: WidgetConfig<T>) {
    return (
      <a className="relative block w-full h-full" href={`tel:${config.data.phoneNumber}`}>
        <div className="flex h-full flex-col">
          <WidgetIcon type={config.type} />

          <div className="mt-2 md:mt-3 flex-1">
            <h3 className="widget-headline line-clamp-1 md:line-clamp-2 text-sm leading-[1.2] text-slate-950 dark:text-slate-50">
              {config.data.overrides?.title}
            </h3>
          </div>

          <div className="inline-flex">
            <WidgetEmailCaptureText text={config.data?.buttonText} />
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
      <a className="relative block w-full h-full" href={`tel:${config.data.phoneNumber}`}>
        <div className="flex h-full">
          <div
            className={clsx(
              'flex h-full w-full flex-1 flex-col',
              config.data.overrides?.imageUrl ? 'aspect-[0.6] overflow-hidden' : undefined
            )}
          >
            <div className="flex justify-between">
              <WidgetIcon type={config.type} />
            </div>

            <div className="mt-2 md:mt-3 flex-1">
              <h3 className="widget-headline line-clamp-1 md:line-clamp-2 text-sm leading-[1.2] text-slate-950 dark:text-slate-50">
                {config.data.overrides?.title}
              </h3>
            </div>

            <div className="inline-flex">
              <WidgetEmailCaptureText text={config.data?.buttonText} />
            </div>
          </div>

          {config.data.overrides?.imageUrl ? (
            <div className="relative ml-6 aspect-[1.4] h-full">
              <Image
                className="h-full w-full rounded-xl object-cover pointer-events-none select-none"
                src={config.data.overrides.imageUrl}
                width={180}
                height={130}
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

  // 2x2
  override Render2x2(config: WidgetConfig<T>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isPreview } = useGlobalContext()

    return (
      <a className="relative block w-full h-full" href={`tel:${config.data.phoneNumber}`}>
        <div className="flex h-full flex-col">
          <div>
            <div className="flex justify-between">
              <WidgetIcon type={config.type} />

              <div className="flex items-start">
                <WidgetEmailCaptureText text={config.data?.buttonText} />
              </div>
            </div>

            <div className="mt-3">
              <h3 className="widget-headline line-clamp-2 text-sm text-slate-950 dark:text-slate-50">
                {config.data.overrides?.title}
              </h3>
            </div>
          </div>

          <div className="flex-1"></div>

          {config.data.overrides?.imageUrl ? (
            <div className="relative mt-6 aspect-[1.9] overflow-hidden">
              <Image
                className="w-full h-full rounded-xl object-cover pointer-events-none select-none"
                src={config.data.overrides.imageUrl}
                alt={config.data.overrides?.title}
                width={340}
                height={180}
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

  override Render2x05(config: WidgetConfig<T>) {
    return (
      <a
        className="absolute inset-0 w-full h-full p-[calc(0.9*var(--widget-padding))]"
        href={`tel:${config.data.phoneNumber}`}
      >
        <div className="flex h-full items-center gap-3">
          <WidgetIcon className="h-7 w-7" type={config.type} />
          <h3 className="flex-1 truncate text-sm text-gray-900 dark:text-slate-50">
            {(config.data as any).overrides?.title ||
              (config.data as any).title ||
              (config.data as any).name}
          </h3>
        </div>
      </a>
    )
  }
}

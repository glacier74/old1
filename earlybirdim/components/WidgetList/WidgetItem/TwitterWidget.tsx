import { useGlobalContext } from '@earlybirdim/components'
import { useMemo } from 'react'

import { Image } from '../../Image'
import { WidgetIcon } from '../WidgetIcon'
import { WidgetConfig, WidgetData, WidgetExtra } from '../WidgetProps'
import { twitter } from '../constants'
import Widget from './Widget'
import { WidgetFollowButton } from './WidgetFollowButton'

export default class TwitterWidget<T extends WidgetData> extends Widget<T> {
  protected extras: AnyMap<WidgetExtra> = {
    twitter
  }

  constructor(config: WidgetConfig) {
    super()
    this.setConfig({
      ...config,
      extra: this.extras[config.type as string]
    })
  }

  override Render1x1(config: WidgetConfig<T>) {
    return (
      <a
        className="block w-full h-full p-[var(--widget-padding)] max-[400px]:p-[calc(0.9*var(--widget-padding))] max-[360px]:p-[calc(0.75*var(--widget-padding))]"
        href={config.shortLinkURL}
      >
        <div className="flex h-full flex-col">
          <WidgetIcon url={config.url} />

          <div className="mt-2 md:mt-3 flex-1">
            <h3 className="widget-headline line-clamp-1 text-sm text-[var(--jingle-widget-title)]">
              {config.data.overrides?.title || config.data.name}
            </h3>
            <div className="max-[400px]:hidden text-xs text-[var(--jingle-widget-meta)]">
              {(config.data as AnyMap)?.handle}
            </div>
          </div>

          <div className="inline-flex">
            <WidgetFollowButton
              followers={config.data.followers}
              followText={config.extra?.followText}
            />
          </div>
        </div>
      </a>
    )
  }

  // 2x1
  override Render2x1(config: WidgetConfig<T>) {
    return (
      <a
        className="block w-full h-full p-[var(--widget-padding)] max-[400px]:p-[calc(0.9*var(--widget-padding))] max-[360px]:p-[calc(0.75*var(--widget-padding))]"
        href={config.shortLinkURL}
      >
        <div className="flex h-full flex-col gap-3">
          <div className="flex justify-between">
            <WidgetIcon url={config.url} />

            <div className="flex items-start">
              <WidgetFollowButton
                followers={config.data.followers}
                followText={config.extra?.followText}
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <h3 className="widget-headline line-clamp-2 text-sm text-[var(--jingle-widget-title)]">
              {config.data.overrides?.title || config.data.name}
            </h3>
            <div className="max-[400px]:hidden text-xs text-[var(--jingle-widget-meta)]">
              {(config.data as AnyMap)?.handle}
            </div>
            <div className="mt-2 max-[400px]:line-clamp-1 line-clamp-2 text-sm text-[var(--jingle-widget-meta)]">
              {config.data.description}
            </div>
          </div>
        </div>
      </a>
    )
  }

  // 2x2
  override Render2x2(config: WidgetConfig<T>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isPreview } = useGlobalContext()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const imageUrl = useMemo(() => {
      return config.data.overrides?.imageUrl || config.data.imageUrl
    }, [config.data.imageUrl, config.data.overrides?.imageUrl])

    return (
      <a
        className="block w-full h-full p-[var(--widget-padding)] max-[400px]:p-[calc(0.9*var(--widget-padding))] max-[360px]:p-[calc(0.75*var(--widget-padding))]"
        href={config.shortLinkURL}
      >
        <div className="flex h-full flex-col">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <WidgetIcon url={config.url} />

              <div className="flex items-start">
                <WidgetFollowButton
                  followers={config.data.followers}
                  followText={config.extra?.followText}
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <h3 className="widget-headline line-clamp-2 text-sm text-[var(--jingle-widget-title)]">
                {config.data.overrides?.title || config.data.name}
              </h3>
              <div className="max-[400px]:hidden text-xs text-[var(--jingle-widget-meta)]">
                {(config.data as AnyMap)?.handle}
              </div>
              <div className="mt-2 line-clamp-2 text-sm text-[var(--jingle-widget-meta)]">
                {config.data.description}
              </div>
            </div>
          </div>
          <div className="flex-1"></div>

          {imageUrl && (
            <div className="relative">
              <Image
                className="aspect-[40/21] rounded-xl object-cover pointer-events-none select-none"
                src={imageUrl}
                width={340}
                height={180}
                alt={config.data.overrides?.title || config.data.name}
              />
              <div className="pointer-events-none absolute inset-0 border border-black/10 rounded-xl"></div>
            </div>
          )}
        </div>
      </a>
    )
  }
}

import { useGlobalContext } from '@earlybirdim/components'
import { toCustomURL } from '@tinaryan/dp'
import { useMemo } from 'react'

import { WidgetIcon } from '../WidgetIcon'
import { WebsiteData, WidgetConfig } from '../WidgetProps'
import Widget from './Widget'
import { WidgetImagePlaceholder } from './WidgetImagePlaceholder'

export default class WebsiteWidget<T extends WebsiteData> extends Widget<T> {
  override Render1x1(config: WidgetConfig<T>) {
    const customURL = toCustomURL(config.url)

    return (
      <a className="block w-full h-full" href={config.url}>
        <div className="flex h-full flex-col">
          <WidgetIcon url={config.url} faviconUrl={config.data.faviconUrl} />

          <div className="mt-3 flex-1">
            <h3 className="line-clamp-3 text-sm leading-[1.2] text-gray-900">
              {config.data.overrides?.title || config.data.title}
            </h3>
            <div className="mt-1 text-xs text-gray-500">{customURL?.hostname}</div>
          </div>
        </div>
      </a>
    )
  }

  // 2x1
  override Render2x1(config: WidgetConfig<T>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isPreview } = useGlobalContext()
    const customURL = toCustomURL(config.url)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const imageUrl = useMemo(
      () => config.data.overrides?.imageUrl || config.data.imageUrl,
      [config.data.imageUrl, config.data.overrides?.imageUrl]
    )

    return (
      <a className="block w-full h-full" href={config.url}>
        <div className="flex h-full">
          <div className="flex h-full w-full flex-1 flex-col gap-3">
            <div className="flex justify-between">
              <WidgetIcon url={config.url} faviconUrl={config.data.faviconUrl} />
            </div>
            <div className="flex flex-1 flex-col">
              <h3 className="line-clamp-3 text-sm leading-[1.2] text-gray-900">
                {config.data.overrides?.title || config.data.title}
              </h3>
              <div className="mt-1 text-xs text-gray-500">{customURL?.hostname}</div>
            </div>
          </div>

          {imageUrl ? (
            <div className="relative ml-6 aspect-[1.4] h-full">
              <img
                className="h-full w-full rounded-xl object-cover"
                src={imageUrl}
                alt={config.data.overrides?.title || config.data.title}
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
    const customURL = toCustomURL(config.url)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const imageUrl = useMemo(
      () => config.data.overrides?.imageUrl || config.data.imageUrl,
      [config.data.imageUrl, config.data.overrides?.imageUrl]
    )

    return (
      <a className="block w-full h-full" href={config.url}>
        <div className="flex h-full flex-col">
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex justify-between">
              <WidgetIcon url={config.url} faviconUrl={config.data.faviconUrl} />
            </div>
            <div className="flex flex-1 flex-col">
              <h3 className="line-clamp-3 text-sm leading-[1.2] text-gray-900">
                {config.data.overrides?.title || config.data.title}
              </h3>
              <div className="mt-1 text-xs text-gray-500">{customURL?.hostname}</div>
            </div>
          </div>

          {imageUrl ? (
            <div className="relative mt-6 aspect-[40/21]">
              <img
                className="aspect-[40/21] rounded-xl object-cover"
                src={imageUrl}
                alt={config.data.overrides?.title || config.data.title}
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

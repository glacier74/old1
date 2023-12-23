import { useGlobalContext } from '@earlybirdim/components'
import { toCustomURL } from '@tinaryan/dp'
import clsx from 'clsx'
import { useMemo } from 'react'

import { Image } from '../../Image'
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

          <div className="mt-2 md:mt-3 flex-1">
            <h3 className="mt-1 line-clamp-2 md:line-clamp-3 md:mt-2 text-sm leading-[1.2] text-slate-950 dark:text-slate-50">
              {config.data.overrides?.title || config.data.title}
            </h3>
            {(config.data.overrides?.description || config.data.description) && (
              <div className="mt-1 line-clamp-1 md:line-clamp-2 text-sm leading-[1.2] text-slate-500 dark:text-slate-400">
                {config.data.overrides?.description || config.data.description}
              </div>
            )}
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate">
              {customURL?.hostname}
            </div>
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
          <div
            className={clsx(
              'flex h-full w-full flex-1 flex-col',
              imageUrl ? 'aspect-[0.6] overflow-hidden' : undefined
            )}
          >
            <div className="flex justify-between">
              <WidgetIcon url={config.url} faviconUrl={config.data.faviconUrl} />
            </div>
            <div className="flex flex-1 flex-col">
              <h3 className="mt-1 line-clamp-2 md:line-clamp-3 md:mt-2 text-sm leading-[1.2] text-slate-950 dark:text-slate-50">
                {config.data.overrides?.title || config.data.title}
              </h3>
              {(config.data.overrides?.description || config.data.description) && (
                <div className="mt-1 line-clamp-1 md:line-clamp-2 text-sm leading-[1.2] text-slate-500 dark:text-slate-400">
                  {config.data.overrides?.description || config.data.description}
                </div>
              )}
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate">
                {customURL?.hostname}
              </div>
            </div>
          </div>

          {imageUrl ? (
            <div className="widget-og-image relative ml-6 aspect-[1.4] h-full">
              <Image
                className="h-full w-full rounded-xl object-cover pointer-events-none select-none"
                src={imageUrl}
                width={360}
                height={260}
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

  // 2x2
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
              <h3 className="mt-1 line-clamp-2 md:line-clamp-3 md:mt-2 text-sm leading-[1.2] text-slate-950 dark:text-slate-50">
                {config.data.overrides?.title || config.data.title}
              </h3>
              {(config.data.overrides?.description || config.data.description) && (
                <div className="mt-1 line-clamp-1 md:line-clamp-2 text-sm leading-[1.2] text-slate-500 dark:text-slate-400">
                  {config.data.overrides?.description || config.data.description}
                </div>
              )}
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate">
                {customURL?.hostname}
              </div>
            </div>
          </div>

          {imageUrl ? (
            <div className="relative mt-6 aspect-[1.9] overflow-hidden">
              <Image
                className="w-full h-full rounded-xl object-cover pointer-events-none select-none"
                src={imageUrl}
                width={600}
                height={400}
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

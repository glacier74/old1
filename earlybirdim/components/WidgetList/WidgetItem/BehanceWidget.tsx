import clsx from 'clsx'

import { WidgetIcon } from '../WidgetIcon'
import { WidgetConfig, WidgetData, WidgetExtra } from '../WidgetProps'
import {
  behance,
  dribbble,
  figma,
  instagram,
  steam,
  tiktok,
  typeNames,
  youtube
} from '../constants'
import Widget from './Widget'
import { WidgetFollowButton } from './WidgetFollowButton'
import { WidgetPostList } from './WidgetPostList'

export default class BehanceWidget<T extends WidgetData> extends Widget<T> {
  protected extras: AnyMap<WidgetExtra> = {
    behance,
    dribbble,
    figma,
    instagram,
    steam_profiles: steam,
    steam_id: steam,
    tiktok,
    youtube
  }

  constructor(config: WidgetConfig) {
    super()
    this.setConfig({
      ...config,
      extra: this.extras[config.type as string]
    })
  }

  override Render1x1(config: WidgetConfig<T>) {
    const title = config.data.overrides?.title || config.data.name || typeNames[config.type!]

    return (
      <a
        className="block w-full h-full p-[var(--widget-padding)] max-[400px]:p-[calc(0.9*var(--widget-padding))] max-[360px]:p-[calc(0.75*var(--widget-padding))]"
        href={config.shortLinkURL}
      >
        <div className="flex h-full flex-col">
          <WidgetIcon url={config.url} />

          <div className="mt-2 md:mt-3 flex-1">
            <h3 className="widget-headline line-clamp-2 text-sm text-[var(--jingle-widget-title)]">
              {title}
            </h3>
            {config.data.description && (
              <div className="max-[400px]:hidden text-xs text-[var(--jingle-widget-meta)]">
                {config.data.description}
              </div>
            )}
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
    const title = config.data.overrides?.title || config.data.name || typeNames[config.type!]

    return (
      <a
        className="block w-full h-full p-[var(--widget-padding)] max-[400px]:p-[calc(0.9*var(--widget-padding))] max-[360px]:p-[calc(0.75*var(--widget-padding))]"
        href={config.shortLinkURL}
      >
        <div className="flex h-full">
          <div className="flex flex-col">
            <WidgetIcon url={config.url} />

            <div className="mt-2 md:mt-3 flex-1">
              <h3 className="widget-headline line-clamp-2 text-sm text-[var(--jingle-widget-title)]">
                {title}
              </h3>
              {config.data.description && (
                <div className="max-[400px]:hidden text-xs text-[var(--jingle-widget-meta)]">
                  {config.data.description}
                </div>
              )}
            </div>

            <div className="inline-flex">
              <WidgetFollowButton
                followers={config.data.followers}
                followText={config.extra?.followText}
              />
            </div>
          </div>

          <div className="flex-1"></div>

          <WidgetPostList
            className={clsx(
              'ml-6 grid gap-2',
              config.extra?.render2x1?.postListClassName || 'aspect-square grid-cols-2 grid-rows-2'
            )}
            itemClassNames={config.extra?.render2x1?.postItemClassNames || 'aspect-square'}
            imageClassName={config.extra?.render2x1?.imageClassName}
            imageAlt={title}
            imageWidth={140}
            imageHeight={140}
            maxCount={config.extra?.render2x1?.postMaxCounts || 4}
            posts={(config.data as AnyMap)[config.extra?.postsKeyName || 'posts']}
          />
        </div>
      </a>
    )
  }

  // 2x2
  override Render2x2(config: WidgetConfig<T>) {
    const title = config.data.overrides?.title || config.data.name || typeNames[config.type!]

    return (
      <a
        className="block w-full h-full p-[var(--widget-padding)] max-[400px]:p-[calc(0.9*var(--widget-padding))] max-[360px]:p-[calc(0.75*var(--widget-padding))]"
        href={config.shortLinkURL}
      >
        <div className="flex h-full flex-col">
          <div>
            <div className="flex justify-between">
              <WidgetIcon url={config.url} />

              <div className="flex items-start">
                <WidgetFollowButton
                  followers={config.data.followers}
                  followText={config.extra?.followText}
                />
              </div>
            </div>

            <div className="mt-3">
              <h3 className="widget-headline line-clamp-2 text-sm text-[var(--jingle-widget-title)]">
                {title}
              </h3>
              {config.data.description && (
                <div className="max-[400px]:hidden text-xs text-[var(--jingle-widget-meta)]">
                  {config.data.description}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1"></div>

          <WidgetPostList
            className={clsx(
              'mt-6 grid gap-2',
              config.extra?.render2x2?.postListClassName ||
                'w-full aspect-[1.5] grid-cols-3 grid-rows-2 gap-2'
            )}
            itemClassNames={config.extra?.render2x2?.postItemClassNames || 'aspect-square'}
            imageClassName={config.extra?.render2x2?.imageClassName}
            imageAlt={title}
            imageWidth={140}
            imageHeight={140}
            maxCount={config.extra?.render2x2?.postMaxCounts || 6}
            posts={(config.data as AnyMap)[config.extra?.postsKeyName || 'posts']}
          />
        </div>
      </a>
    )
  }
}

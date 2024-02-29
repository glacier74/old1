import { WidgetIcon } from '../WidgetIcon'
import { WidgetConfig, WidgetData, WidgetExtra, ZhihuData } from '../WidgetProps'
import { typeNames, zhihu } from '../constants'
import { formatNumber } from '../utils'
import BehanceWidget from './BehanceWidget'
import { WidgetFollowButton } from './WidgetFollowButton'

export default class ZhihuWidget<T extends ZhihuData & WidgetData> extends BehanceWidget<T> {
  override extras: AnyMap<WidgetExtra> = {
    zhihu
  }

  constructor(config: WidgetConfig) {
    super(config)
    this.setConfig({
      ...config,
      extra: this.extras[config.type as string]
    })
  }

  // 1x1
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
            {config.data.badgeTitle && (
              <div className="max-[400px]:hidden text-xs text-[var(--jingle-widget-meta)]">
                {config.data.badgeTitle}
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
              <div className="mt-1 text-xs text-[var(--jingle-widget-meta)]">
                {config.data.badgeTitle}
              </div>
            </div>
          </div>
          <div className="flex-1"></div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-center text-[var(--jingle-widget-title)]">
                {formatNumber(config.data.answers)}
              </div>
              <div className="text-xs text-[var(--jingle-widget-meta)]">Answers</div>
            </div>

            <div>
              <div className="text-sm font-medium text-center text-[var(--jingle-widget-title)]">
                {formatNumber(config.data.thanks)}
              </div>
              <div className="text-xs text-[var(--jingle-widget-meta)]">Upvotes</div>
            </div>

            <div>
              <div className="text-sm font-medium text-center text-[var(--jingle-widget-title)]">
                {formatNumber(config.data.articles)}
              </div>
              <div className="text-xs text-[var(--jingle-widget-meta)]">Articles</div>
            </div>
          </div>
        </div>
      </a>
    )
  }

  // 2x2
  override Render2x2(config: WidgetConfig) {
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
              <div className="mt-1 text-xs text-[var(--jingle-widget-meta)]">
                {config.data.badgeTitle}
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-center">
            <div className="flex items-center justify-between px-0 lg:px-4">
              <div>
                <div className="text-xl font-medium text-center text-[var(--jingle-widget-title)]">
                  {formatNumber(config.data.answers)}
                </div>
                <div className="text-xs text-[var(--jingle-widget-meta)]">Answers</div>
              </div>

              <div>
                <div className="text-xl font-medium text-center text-[var(--jingle-widget-title)]">
                  {formatNumber(config.data.thanks)}
                </div>
                <div className="text-xs text-[var(--jingle-widget-meta)]">Upvotes</div>
              </div>

              <div>
                <div className="text-xl font-medium text-center text-[var(--jingle-widget-title)]">
                  {formatNumber(config.data.articles)}
                </div>
                <div className="text-xs text-[var(--jingle-widget-meta)]">Articles</div>
              </div>
            </div>
          </div>
        </div>
      </a>
    )
  }
}

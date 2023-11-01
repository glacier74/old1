import { useGlobalContext } from '@earlybirdim/components'
import { useMemo } from 'react'

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
      <a className="block w-full h-full" href={config.url}>
        <div className="flex h-full flex-col">
          <WidgetIcon url={config.url} />

          <div className="mt-3 flex-1">
            <h3 className="line-clamp-1 text-sm text-gray-900">
              {config.data.overrides?.title || config.data.name}
            </h3>
            <div className="text-xs text-gray-400">{(config.data as AnyMap)?.handle}</div>
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
      <a className="block w-full h-full" href={config.url}>
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
            <h3 className="line-clamp-2 text-sm text-gray-900">
              {config.data.overrides?.title || config.data.name}
            </h3>
            <div className="text-xs text-gray-400">{(config.data as AnyMap)?.handle}</div>
            <div className="mt-2 line-clamp-2 text-sm text-gray-700">{config.data.description}</div>
          </div>
        </div>
      </a>
    )
  }

  // 2x1
  override Render2x2(config: WidgetConfig<T>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isPreview } = useGlobalContext()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const imageUrl = useMemo(() => {
      return config.data.overrides?.imageUrl || config.data.imageUrl
    }, [config.data.imageUrl, config.data.overrides?.imageUrl])

    return (
      <a className="block w-full h-full" href={config.url}>
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
              <h3 className="line-clamp-2 text-sm text-gray-900">
                {config.data.overrides?.title || config.data.name}
              </h3>
              <div className="text-xs text-gray-400">{(config.data as AnyMap)?.handle}</div>
              <div className="mt-2 line-clamp-2 text-sm text-gray-700">
                {config.data.description}
              </div>
            </div>
          </div>
          <div className="flex-1"></div>

          {imageUrl && (
            <div className="relative">
              <img
                className="aspect-[40/21] rounded-xl object-cover"
                src={imageUrl}
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

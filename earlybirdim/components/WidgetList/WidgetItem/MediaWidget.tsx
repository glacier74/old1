import { isValid } from '@nily/utils'
import { FC } from 'react'

import { MediaData, WidgetConfig, WidgetSize } from '../WidgetProps'
import { map } from '../constants'
import Widget from './Widget'

export default class MediaWidget<T extends MediaData> extends Widget<T> {
  override allowSizes: WidgetSize[] = ['1x1', '2x1', '2x2']

  constructor(config: WidgetConfig) {
    super()
    this.setConfig({
      ...config,
      extra: map
    })
  }

  override Render1x1(config: WidgetConfig<MediaData>) {
    return <MediaWidget.Render {...config} />
  }

  // 2x1
  override Render2x1(config: WidgetConfig<MediaData>) {
    return <MediaWidget.Render {...config} />
  }

  // 2x1
  override Render2x2(config: WidgetConfig<MediaData>) {
    return <MediaWidget.Render {...config} />
  }

  private static Render(config: WidgetConfig<MediaData>) {
    const Element = (isValid(config.url) ? 'a' : 'div') as unknown as FC<any>

    return (
      <Element className="relative h-full w-full overflow-hidden rounded-3xl" href={config.url}>
        {config.data.overrides?.imageUrl && (
          <img
            className="h-full w-full object-cover"
            src={config.data.overrides?.imageUrl}
            alt={config.data.overrides?.title}
          />
        )}

        {config.data.overrides?.title && (
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="inline-block rounded-xl bg-white/70 px-2.5 py-1.5 text-sm shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06)] backdrop-blur-[20px]">
              {config.data.overrides.title}
            </div>
          </div>
        )}
      </Element>
    )
  }
}

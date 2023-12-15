import { IconPlay2 } from '@earlybirdim/internalIcons'
import { isValid } from '@nily/utils'
import clsx from 'clsx'
import { FC, useMemo } from 'react'

import { Image } from '../../Image'
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
    return <MediaWidget.Render imageWidth={300} imageHeight={300} {...config} />
  }

  // 2x1
  override Render2x1(config: WidgetConfig<MediaData>) {
    return <MediaWidget.Render imageWidth={600} imageHeight={300} {...config} />
  }

  // 2x2
  override Render2x2(config: WidgetConfig<MediaData>) {
    return <MediaWidget.Render imageWidth={600} imageHeight={600} {...config} />
  }

  private static Render(
    config: WidgetConfig<MediaData> & { imageWidth: number; imageHeight: number }
  ) {
    const Element = (isValid(config.url) ? 'a' : 'div') as unknown as FC<any>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const imageUrl = useMemo(
      () => config.data.overrides?.imageUrl || config.data.imageUrl,
      [config.data.imageUrl, config.data.overrides?.imageUrl]
    )
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const title = useMemo(
      () => config.data.overrides?.title || config.data.title,
      [config.data.title, config.data.overrides?.title]
    )

    return (
      <Element
        className={clsx(
          `widget-${config.type} relative block h-full w-full overflow-hidden rounded-3xl cursor-zoom-in`,
          {
            [`widget-${config.type}-link !cursor-pointer`]: isValid(config.url)
          }
        )}
        href={config.url}
      >
        {imageUrl && (
          <Image
            className="h-full w-full object-cover pointer-events-none select-none rounded-3xl"
            width={config.imageWidth}
            height={config.imageHeight}
            src={imageUrl}
            alt={title}
          />
        )}

        {config.type === 'video' && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <IconPlay2 className="text-white shadow-xl rounded-full" path2ClassName="fill-black" />
          </div>
        )}

        {title && (
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <div className="inline-block rounded-xl bg-white/70 px-2.5 py-1.5 text-sm shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06)] backdrop-blur-[20px]">
              {title}
            </div>
          </div>
        )}
      </Element>
    )
  }
}

import { isValid } from '@nily/utils'
import clsx from 'clsx'
import { FC, useMemo } from 'react'

import { MediaData, WidgetConfig } from '../WidgetProps'
import Widget from './Widget'

export default class TextWidget<T extends MediaData> extends Widget<T> {
  override Render1x1(config: WidgetConfig<T>) {
    return <TextWidget.Render {...config} />
  }

  // 2x1
  override Render2x1(config: WidgetConfig<T>) {
    return <TextWidget.Render {...config} />
  }

  // 2x2
  override Render2x2(config: WidgetConfig<T>) {
    return <TextWidget.Render {...config} />
  }

  override Render2x05(config: WidgetConfig<T>) {
    return <TextWidget.Render {...config} />
  }

  private static Render(config: WidgetConfig<MediaData>) {
    const isValidURL = isValid(config.url)
    const isSize2x05 = config.size === '2x0.5'

    const Element = (isValid(config.url) ? 'a' : 'div') as unknown as FC<any>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const title = useMemo(
      () => config.data.overrides?.title || config.data.title,
      [config.data.title, config.data.overrides?.title]
    )

    return (
      <Element
        className={clsx(
          `widget-${config.type} relative block h-full w-full overflow-hidden rounded-3xl p-[var(--widget-padding)] max-[400px]:p-[calc(0.9*var(--widget-padding))] max-[360px]:p-[calc(0.75*var(--widget-padding))]`,
          {
            'cursor-pointer': isValidURL
          }
        )}
        href={isValidURL ? config.shortLinkURL : undefined}
      >
        {isSize2x05 ? (
          <div className="h-full w-full truncate text-[var(--jingle-widget-title)] leading-[calc(var(--widget-small-size)-2*var(--widget-padding))]">
            {title}
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-lg text-[var(--jingle-widget-title)] whitespace-pre-line">{title}</p>
          </div>
        )}
      </Element>
    )
  }
}

import { useGlobalContext } from '@earlybirdim/components'
import clsx from 'clsx'
import { CSSProperties, useMemo } from 'react'

import { WidgetIcon } from '../WidgetIcon'
import { WidgetConfig, WidgetContainerProps, WidgetSize } from '../WidgetProps'
import { useMetadata } from '../hook'

export default class Widget<T> {
  protected readonly allowSizes: WidgetSize[] = ['1x1', '2x1', '2x2', '2x0.5']
  protected readonly defaultSize: WidgetSize = '1x1'
  protected config!: WidgetConfig
  protected workableSize!: WidgetSize

  constructor(config?: WidgetConfig) {
    this.setConfig(config)
  }

  public setConfig(config?: WidgetConfig) {
    if (config) {
      this.config = config
      this.workableSize = this.allowSizes.includes(config.size) ? config.size : this.defaultSize
    }
  }

  public getComponent() {
    const Component = (() => {
      switch (this.workableSize) {
        case '2x1':
          return this.Render2x1

        case '2x2':
          return this.Render2x2

        case '2x0.5':
          return this.Render2x05

        default:
          return this.Render1x1
      }
    })()

    return <this.Container config={this.config} component={Component} />
  }

  protected Container({ config: rawConfig, component: Component }: WidgetContainerProps) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isPreview } = useGlobalContext()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const data = useMetadata(rawConfig)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const config = useMemo(() => {
      const newData = {
        ...rawConfig.data,
        ...data
      }

      const newConfig = {
        ...rawConfig,
        data: newData
      }

      if (rawConfig.extra?.getComputedData) {
        newConfig.data = {
          ...newConfig.data,
          ...rawConfig.extra.getComputedData(newConfig)
        }
      }

      return newConfig
    }, [data, rawConfig])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const style = useMemo(() => {
      const extraStyles = config.extra?.styles

      return {
        '--widget-padding': extraStyles?.padding || '20px',
        '--widget-scale': extraStyles?.scale === 0 ? undefined : extraStyles?.scale || 0.98,
        '--jingle-widget-follow-background': extraStyles?.followBgColor,
        '--jingle-widget-follow-background-hover': extraStyles?.followBgHoverColor,
        '--jingle-widget-follow-background-active': extraStyles?.followBgActiveColor,
        '--jingle-widget-follow-text': extraStyles?.followTextColor
      } as CSSProperties
    }, [config.extra?.styles])

    return (
      <div
        className="widget-content group/widget-content relative w-full h-full rounded-3xl shadow-sm group bg-[var(--jingle-widget-background)] transition-all duration-150 will-change-auto hover:bg-[var(--jingle-widget-background-hover)] active:scale-[var(--widget-scale)] active:bg-[var(--jingle-widget-background-active)]"
        style={style}
      >
        <div className="widget-body w-full h-full">
          <Component {...config} />
        </div>
        <div
          className={clsx(
            'pointer-events-none absolute inset-0 rounded-3xl will-change-auto border border-[var(--jingle-widget-border,rgba(0,0,0,0.1))]',
            {
              'group-hover/widget:border-emerald-600': isPreview
            }
          )}
        />
      </div>
    )
  }

  // 1x1
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected Render1x1(_config: WidgetConfig<T>) {
    return <></>
  }

  // 2x1
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected Render2x1(_config: WidgetConfig<T>) {
    return <></>
  }

  // 2x1
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected Render2x2(_config: WidgetConfig<T>) {
    return <></>
  }

  // 2x0.5
  protected Render2x05(config: WidgetConfig<T>) {
    return (
      <a
        className="block w-full h-full p-[var(--widget-padding)] max-[400px]:p-[calc(0.9*var(--widget-padding))] max-[360px]:p-[calc(0.75*var(--widget-padding))]"
        href={config.shortLinkURL}
      >
        <div className="flex h-full items-center gap-3">
          <WidgetIcon
            className="h-7 w-7"
            url={config.url}
            title={(config.data as any).overrides?.title || (config.data as any).title}
            faviconUrl={(config.data as any).faviconUrl}
          />
          <h3 className="flex-1 truncate text-sm text-[var(--jingle-widget-title)]">
            {(config.data as any).overrides?.title ||
              (config.data as any).title ||
              (config.data as any).name}
          </h3>
        </div>
      </a>
    )
  }
}

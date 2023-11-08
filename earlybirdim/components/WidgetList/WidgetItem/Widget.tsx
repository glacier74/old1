import { CSSProperties, useMemo } from 'react'

import { WidgetIcon } from '../WidgetIcon'
import {
  WebsiteData,
  WidgetConfig,
  WidgetContainerProps,
  WidgetData,
  WidgetSize
} from '../WidgetProps'
import { sizeClassNames } from '../constants'
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

    return <this.Container config={this.config} size={this.workableSize} component={Component} />
  }

  protected Container({ size, config: rawConfig, component: Component }: WidgetContainerProps) {
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
    const styles = useMemo(() => {
      const extraStyles = config.extra?.styles

      return {
        '--widget-padding': extraStyles?.padding || '20px',
        '--widget-bg': extraStyles?.bgColor || '#fff',
        '--widget-dark-bg': extraStyles?.darkBgColor || '#0f172a',
        '--widget-bg-hover': extraStyles?.bgHoverColor || '#fbfbfb',
        '--widget-dark-bg-hover': extraStyles?.darkBgHoverColor || '#1e293b',
        '--widget-bg-active': extraStyles?.bgActiveColor || '#efefef',
        '--widget-follow-border': extraStyles?.followBorderColor || 'rgba(31,35,40,0.15)',
        '--widget-follow-bg': extraStyles?.followBgColor || '#f6f8fa',
        '--widget-follow-bg-hover': extraStyles?.followBgHoverColor || '#f3f4f6',
        '--widget-follow-bg-active': extraStyles?.followBgActiveColor || '#ebecf0',
        '--widget-follow-text': extraStyles?.followTextColor || '#24292f',
        '--widget-followers-text': extraStyles?.followersColor || '#656d76',
        '--widget-scale': extraStyles?.scale === 0 ? undefined : extraStyles?.scale || 0.95
      } as CSSProperties
    }, [config.extra?.styles])

    return (
      <div
        className={`widget widget-${size.replace(/\./g, '_')} ${sizeClassNames[size]}`}
        data-id={config.id}
        style={styles}
      >
        <div className="widget-content group/widget-content relative w-full h-full rounded-3xl shadow-sm cursor-pointer group bg-[var(--widget-bg)] dark:bg-[var(--widget-dark-bg)] p-[var(--widget-padding)] max-[400px]:p-[calc(0.9*var(--widget-padding))] max-[360px]:p-[calc(0.75*var(--widget-padding))] transition-all duration-150 will-change-auto hover:bg-[var(--widget-bg-hover)] dark:hover:bg-[var(--widget-dark-bg-hover)] active:scale-[var(--widget-scale)] active:bg-[var(--widget-bg-active)]">
          <div className="w-full h-full dark:group-hover/widget-content:relative dark:group-hover/widget-content:z-10">
            <Component {...config} />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-3xl will-change-auto border border-black/10 dark:border-none dark:bg-[conic-gradient(from_var(--widget-rotating),#000_0%,#fff_10%,#000_20%)] dark:opacity-0 dark:group-hover/widget-content:z-0 dark:group-hover/widget-content:opacity-100 dark:group-hover/widget-content:animate-[widget-rotating_3s_linear_infinite] dark:after:absolute dark:after:inset-[1px] dark:after:bg-[var(--widget-dark-bg-hover)] dark:after:rounded-3xl" />
        </div>
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
      <a className="block w-full h-full" href={config.url}>
        <div className="flex h-full items-center gap-3">
          <WidgetIcon
            className="h-7 w-7"
            url={config.url}
            faviconUrl={(config.data as unknown as WebsiteData).faviconUrl}
          />
          <h3 className="flex-1 truncate text-sm text-gray-900 dark:text-slate-50">
            {(config.data as WidgetData).name || (config.data as unknown as WebsiteData).title}
          </h3>
        </div>
      </a>
    )
  }
}

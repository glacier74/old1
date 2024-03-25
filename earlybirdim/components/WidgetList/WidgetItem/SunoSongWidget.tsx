import { Image } from '../../Image'
import { WidgetIcon } from '../WidgetIcon'
import { SunoSongData, WidgetConfig } from '../WidgetProps'
import Widget from './Widget'
import { WidgetPlayButton } from './WidgetPlayButton'

export default class SunoSongWidget<T extends SunoSongData> extends Widget<T> {
  constructor(config: WidgetConfig) {
    super()
    this.setConfig({
      ...config
    })
  }

  override Render1x1(config: WidgetConfig<T>) {
    return (
      <a
        className="block w-full h-full p-[var(--widget-padding)] max-[400px]:p-[calc(0.9*var(--widget-padding))] max-[360px]:p-[calc(0.75*var(--widget-padding))]"
        href={config.shortLinkURL}
      >
        <div className="flex h-full flex-col">
          <WidgetIcon url={config.url} />

          <div className="mt-2 md:mt-3 flex-1">
            <h3 className="widget-headline line-clamp-1 md:line-clamp-2 text-sm leading-[1.2] text-[var(--jingle-widget-title)]">
              {config.data.overrides?.title || config.data.name}
            </h3>
            <div className="hidden md:block mt-1 text-xs text-[var(--jingle-widget-meta)] truncate">
              {config.data.overrides?.description || config.data.tags}
            </div>
          </div>

          <div className="inline-flex">
            <WidgetPlayButton
              widgetId={config.id}
              songId={config.data.songId}
              songURL={config.data.audioUrl}
              playText="Play"
              pauseText="Pause"
            />
          </div>
        </div>
      </a>
    )
  }

  // 2x1
  override Render2x1(config: WidgetConfig<T>) {
    return (
      <a
        className="block w-full h-full p-[var(--widget-padding)] max-[400px]:p-[calc(0.9*var(--widget-padding))] max-[360px]:p-[calc(0.75*var(--widget-padding))]"
        href={config.shortLinkURL}
      >
        <div className="flex h-full">
          <div className="flex flex-col">
            <WidgetIcon url={config.url} />

            <div className="mt-2 md:mt-3 flex-1">
              <h3 className="widget-headline mt-1 line-clamp-2 md:line-clamp-3 md:mt-2 text-sm leading-[1.2] text-[var(--jingle-widget-title)]">
                {config.data.overrides?.title || config.data.name}
              </h3>
              <div className="mt-1 text-xs text-[var(--jingle-widget-meta)] max-w-[160px] truncate">
                {config.data.overrides?.description || config.data.tags}
              </div>
            </div>

            <div className="inline-flex">
              <WidgetPlayButton
                widgetId={config.id}
                songId={config.data.songId}
                songURL={config.data.audioUrl}
                playText="Play"
                pauseText="Pause"
              />
            </div>
          </div>

          <div className="flex-1"></div>

          <div className="relative h-full aspect-square rounded-xl bg-[#f2f2f2]">
            {config.data.imageUrl && (
              <Image
                className="h-full w-full rounded-xl object-cover pointer-events-none select-none"
                src={config.data.imageUrl}
                width={140}
                height={140}
                alt={config.data.overrides?.title || config.data.name}
              />
            )}
            <div className="pointer-events-none absolute inset-0 border border-black/10 rounded-xl" />
          </div>
        </div>
      </a>
    )
  }

  // 2x2
  override Render2x2(config: WidgetConfig<T>) {
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
                <WidgetPlayButton
                  widgetId={config.id}
                  songId={config.data.songId}
                  songURL={config.data.audioUrl}
                  playText="Play"
                  pauseText="Pause"
                />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="widget-headline line-clamp-2 text-sm text-gray-900">
                {config.data.overrides?.title || config.data.name}
              </h3>
              <div className="mt-1 text-xs text-gray-500">
                {config.data.overrides?.description || config.data.tags}
              </div>
            </div>
          </div>
          <div className="flex-1"></div>

          <div className="flex aspect-[1.78] max-h-[60%] items-center justify-center rounded-xl border border-black/[0.04] bg-black/[0.02] py-3">
            <div className="relative aspect-square max-h-[160px] max-w-[160px] rounded-xl bg-[#f2f2f2]">
              {config.data.imageUrl && (
                <Image
                  className="h-full w-full rounded-xl object-cover pointer-events-none select-none"
                  src={config.data.imageUrl}
                  width={140}
                  height={140}
                  alt={config.data.overrides?.title || config.data.name}
                />
              )}
              <div className="pointer-events-none absolute inset-0 border border-black/10 rounded-xl"></div>
            </div>
          </div>
        </div>
      </a>
    )
  }
}

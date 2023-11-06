import { WidgetIcon } from '../WidgetIcon'
import { SpotifyPlaylistData, WidgetConfig } from '../WidgetProps'
import { spotify } from '../constants'
import Widget from './Widget'
import { WidgetPlayButton } from './WidgetPlayButton'

export default class SpotifyTrackWidget<T extends SpotifyPlaylistData> extends Widget<T> {
  constructor(config: WidgetConfig) {
    super()
    this.setConfig({
      ...config,
      extra: spotify
    })
  }

  override Render1x1(config: WidgetConfig<T>) {
    return (
      <a className="block w-full h-full" href={config.url}>
        <div className="flex h-full flex-col">
          <WidgetIcon url={config.url} />

          <div className="mt-2 md:mt-3 flex-1">
            <h3 className="line-clamp-1 md:line-clamp-2 text-sm leading-[1.2] text-slate-950 dark:text-slate-50">
              {config.data.overrides?.title || config.data.name}
            </h3>
            <div className="hidden md:block mt-1 text-xs text-slate-500 dark:text-slate-400">
              {config.data.artists?.join(', ')}
            </div>
          </div>

          <div className="inline-flex">
            <WidgetPlayButton playText="Play" pauseText="Pause" />
          </div>
        </div>
      </a>
    )
  }

  // 2x1
  override Render2x1(config: WidgetConfig<T>) {
    return (
      <a className="block w-full h-full" href={config.url}>
        <div className="flex h-full">
          <div className="flex flex-col">
            <WidgetIcon url={config.url} />

            <div className="mt-2 md:mt-3 flex-1">
              <h3 className="line-clamp-2 md:line-clamp-3 text-sm leading-[1.2] text-slate-950 dark:text-slate-50">
                {config.data.overrides?.title || config.data.name}
              </h3>
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{config.data.artists?.join(', ')}</div>
            </div>

            <div className="inline-flex">
              <WidgetPlayButton playText="Play" pauseText="Pause" />
            </div>
          </div>

          <div className="flex-1"></div>

          <div className="relative aspect-square rounded-xl bg-[#f2f2f2]">
            {config.data.imageUrl && (
              <img
                className="h-full w-full rounded-xl object-cover"
                src={config.data.imageUrl}
                alt={config.data.overrides?.title || config.data.name}
              />
            )}
            <div className="pointer-events-none absolute inset-0 border border-black/10 rounded-xl" />
          </div>
        </div>
      </a>
    )
  }

  // 2x1
  override Render2x2(config: WidgetConfig<T>) {
    return (
      <a className="block w-full h-full" href={config.url}>
        <div className="flex h-full flex-col">
          <div>
            <div className="flex justify-between">
              <WidgetIcon url={config.url} />
              <div className="flex items-start">
                <WidgetPlayButton playText="Play" pauseText="Pause" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="line-clamp-2 text-sm text-gray-900">
                {config.data.overrides?.title || config.data.name}
              </h3>
              <div className="mt-1 text-xs text-gray-500">{config.data.numSongs} songs</div>
            </div>
          </div>
          <div className="flex-1"></div>

          <div className="flex aspect-[1.78] max-h-[60%] items-center justify-center rounded-xl border border-black/[0.04] bg-black/[0.02] py-3">
            <div className="relative aspect-square max-h-[160px] max-w-[160px] rounded-xl bg-[#f2f2f2]">
              {config.data.imageUrl && (
                <img
                  className="h-full w-full rounded-xl object-cover"
                  src={config.data.imageUrl}
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

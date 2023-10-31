import { FC } from 'react'

import { WidgetIcon } from '../WidgetIcon'
import { SpotifyPlaylistData, SpotifySong, WidgetConfig } from '../WidgetProps'
import { spotify } from '../constants'
import { durationToTime } from '../utils'
import Widget from './Widget'
import { WidgetPlayButton } from './WidgetPlayButton'

const PlayItem: FC<{ index: number; song: SpotifySong }> = ({ song }) => {
  return (
    <li>
      <div
        className="group/item flex w-full flex-row items-center justify-between py-2"
        role="button"
      >
        <div className="flex flex-row items-center">
          <div className="relative h-[40px] w-[40px] flex-none">
            <div className="relative rounded-lg">
              <img
                className="h-full w-full rounded-lg object-cover"
                src={song.thumbnail}
                alt={song.name}
              />
              <WidgetPlayButton className="absolute inset-0 flex items-center justify-center !rounded-lg !p-0 opacity-0 transition-opacity group-hover/item:opacity-100" />
              <div className="pointer-events-none absolute inset-0 border border-black/10 rounded-lg"></div>
            </div>
          </div>
          <div className="mx-3 flex flex-col text-left">
            <div className="line-clamp-1 text-sm">{song.name}</div>
            <div className="line-clamp-1 text-xs text-black/60">{song.artists?.join(', ')}</div>
          </div>
        </div>
        <div className="w-fit flex-none text-sm tabular-nums text-black/40">
          {durationToTime(song.duration)}
        </div>
      </div>
    </li>
  )
}

export default class SpotifyPlaylistWidget<T extends SpotifyPlaylistData> extends Widget<T> {
  constructor(config: WidgetConfig) {
    super()
    this.setConfig({
      ...config,
      extra: spotify
    })
  }

  override Render1x1(config: WidgetConfig<T>) {
    return (
      <div className="flex h-full flex-col">
        <WidgetIcon url={config.url} />

        <div className="mt-3 flex-1">
          <h3 className="line-clamp-1 text-sm leading-[1.2] text-gray-900">
            {config.data.overrides?.title || config.data.name}
          </h3>
          <div className="mt-1 text-xs text-gray-500">{config.data.numSongs} songs</div>
        </div>

        <div className="inline-flex">
          <WidgetPlayButton playText="Play" pauseText="Pause" />
        </div>
      </div>
    )
  }

  // 2x1
  override Render2x1(config: WidgetConfig<T>) {
    return (
      <div className="flex h-full">
        <div className="flex flex-col">
          <WidgetIcon url={config.url} />

          <div className="mt-3 flex-1">
            <h3 className="line-clamp-3 text-sm leading-[1.2] text-gray-900">
              {config.data.overrides?.title || config.data.name}
            </h3>
            <div className="mt-1 text-xs text-gray-500">{config.data.numSongs} songs</div>
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
    )
  }

  // 2x1
  override Render2x2(config: WidgetConfig<T>) {
    return (
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

        <ul className="flex w-full flex-col">
          {config.data.songs?.slice(0, 4).map((song, index) => (
            <PlayItem key={index} index={index} song={song} />
          ))}
        </ul>
      </div>
    )
  }
}

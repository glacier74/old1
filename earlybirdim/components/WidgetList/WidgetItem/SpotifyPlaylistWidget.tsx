import { FC } from 'react'

import { Image } from '../../Image'
import { WidgetIcon } from '../WidgetIcon'
import { SpotifyPlaylistData, SpotifySong, WidgetConfig } from '../WidgetProps'
import { spotify } from '../constants'
import { durationToTime } from '../utils'
import Widget from './Widget'
import { WidgetPlayButton } from './WidgetPlayButton'

const PlayItem: FC<{ index: number; song: SpotifySong }> = ({ song }) => {
  return (
    <li className="last-of-type:hidden md:last-of-type:block">
      <div
        className="group/item flex w-full flex-row items-center justify-between py-2"
        role="button"
      >
        <div className="flex flex-row items-center">
          <div className="relative h-[40px] w-[40px] flex-none">
            <div className="relative rounded-lg">
              <Image
                className="rounded-lg object-cover pointer-events-none select-none"
                width={40}
                height={40}
                src={song.thumbnail}
                alt={song.name}
              />
              <WidgetPlayButton className="absolute inset-0 w-full h-full flex items-center justify-center !rounded-lg !p-0 !gap-0 opacity-0 transition-opacity group-hover/item:opacity-100" />
              <div className="pointer-events-none absolute inset-0 border border-black/10 rounded-lg"></div>
            </div>
          </div>
          <div className="mx-3 flex flex-col text-left">
            <div className="line-clamp-1 text-sm text-slate-950 dark:text-slate-50">
              {song.name}
            </div>
            <div className="line-clamp-1 text-xs text-black/60 dark:text-slate-400">
              {song.artists?.join(', ')}
            </div>
          </div>
        </div>
        <div className="w-fit flex-none text-sm tabular-nums text-black/40 dark:text-slate-500">
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
      <a className="block w-full h-full" href={config.url}>
        <div className="flex h-full flex-col">
          <WidgetIcon url={config.url} />

          <div className="mt-2 md:mt-3 flex-1">
            <h3 className="line-clamp-1 text-sm leading-[1.2] text-slate-950 dark:text-slate-50">
              {config.data.overrides?.title || config.data.name}
            </h3>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate">
              {config.data.numSongs} songs
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
              <h3 className="mt-1 line-clamp-2 md:line-clamp-3 md:mt-2 text-sm leading-[1.2] text-slate-950 dark:text-slate-50">
                {config.data.overrides?.title || config.data.name}
              </h3>
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate">
                {config.data.numSongs} songs
              </div>
            </div>

            <div className="inline-flex">
              <WidgetPlayButton playText="Play" pauseText="Pause" />
            </div>
          </div>

          <div className="flex-1"></div>

          <div className="relative aspect-square rounded-xl bg-[#f2f2f2]">
            {config.data.imageUrl && (
              <Image
                className="h-full w-full rounded-xl object-cover pointer-events-none select-none"
                src={config.data.imageUrl}
                width={120}
                height={120}
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
              <h3 className="line-clamp-2 text-sm text-slate-950 dark:text-slate-50">
                {config.data.overrides?.title || config.data.name}
              </h3>
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate">
                {config.data.numSongs} songs
              </div>
            </div>
          </div>
          <div className="flex-1"></div>

          <ul className="flex w-full flex-col">
            {config.data.songs?.slice(0, 4).map((song, index) => (
              <PlayItem key={index} index={index} song={song} />
            ))}
          </ul>
        </div>
      </a>
    )
  }
}

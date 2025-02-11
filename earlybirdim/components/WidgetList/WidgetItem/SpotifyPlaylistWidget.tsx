import { FC } from 'react'

import { Image } from '../../Image'
import { WidgetIcon } from '../WidgetIcon'
import { SpotifyPlaylistData, SpotifySong, WidgetConfig } from '../WidgetProps'
import { spotify } from '../constants'
import { durationToTime } from '../utils'
import Widget from './Widget'
import { WidgetPlayButton2 } from './WidgetPlayButton'

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
              <WidgetPlayButton2 className="absolute inset-0 w-full h-full flex items-center justify-center !rounded-lg !p-0 !gap-0 opacity-0 transition-opacity group-hover/item:opacity-100" />
              <div className="pointer-events-none absolute inset-0 border border-black/10 rounded-lg"></div>
            </div>
          </div>
          <div className="mx-3 flex flex-col text-left">
            <div className="line-clamp-1 text-sm text-[var(--jingle-widget-title)]">
              {song.name}
            </div>
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
      <a
        className="block w-full h-full p-[var(--widget-padding)] max-[400px]:p-[calc(0.9*var(--widget-padding))] max-[360px]:p-[calc(0.75*var(--widget-padding))]"
        href={config.shortLinkURL}
      >
        <div className="flex h-full flex-col">
          <WidgetIcon url={config.url} />

          <div className="mt-2 md:mt-3 flex-1">
            <h3 className="widget-headline line-clamp-1 text-sm leading-[1.2] text-[var(--jingle-widget-title)]">
              {config.data.overrides?.title || config.data.name}
            </h3>
            <div className="mt-1 text-xs text-[var(--jingle-widget-meta)] truncate">
              {config.data.numSongs} songs
            </div>
          </div>

          <div className="inline-flex">
            <WidgetPlayButton2 playText="Play" />
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
              <div className="mt-1 text-xs text-[var(--jingle-widget-meta)] truncate">
                {config.data.numSongs} songs
              </div>
            </div>

            <div className="inline-flex">
              <WidgetPlayButton2 playText="Play" />
            </div>
          </div>

          <div className="flex-1"></div>

          <div className="relative h-full aspect-square rounded-xl bg-[#f2f2f2]">
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
                <WidgetPlayButton2 playText="Play" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="widget-headline line-clamp-2 text-sm text-[var(--jingle-widget-title)]">
                {config.data.overrides?.title || config.data.name}
              </h3>
              <div className="mt-1 text-xs text-[var(--jingle-widget-meta)] truncate">
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

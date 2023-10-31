import { WidgetIcon } from '../WidgetIcon'
import { SpotifyArtistData, WidgetConfig, WidgetPost } from '../WidgetProps'
import { spotify } from '../constants'
import { formatNumber } from '../utils'
import Widget from './Widget'
import { WidgetFollowButton } from './WidgetFollowButton'
import { WidgetPostList } from './WidgetPostList'

export default class SpotifyArtistWidget<T extends SpotifyArtistData> extends Widget<T> {
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
          <h3 className="line-clamp-3 text-sm leading-[1.2] text-gray-900">
            {config.data.overrides?.title || config.data.name}
          </h3>
        </div>

        <div className="inline-flex">
          <WidgetFollowButton followers={config.data.followers} />
        </div>
      </div>
    )
  }

  // 2x1
  override Render2x1(config: WidgetConfig<T>) {
    return (
      <div className="flex h-full">
        <div className="flex h-full flex-col">
          <WidgetIcon url={config.url} />

          <div className="mt-3 flex-1">
            <h3 className="line-clamp-3 text-sm leading-[1.2] text-gray-900">
              {config.data.overrides?.title || config.data.name}
            </h3>
          </div>

          <div className="inline-flex">
            <WidgetFollowButton followers={config.data.followers} />
          </div>
        </div>
        <div className="flex-1"></div>

        <WidgetPostList
          className="relative ml-6 !block aspect-[1.78] h-full w-[180px]"
          itemClassNames={[
            '!absolute aspect-square left-0 top-0 h-full w-[75%] shadow-[0_0_0_4px_#EDFCF3] group-hover:shadow-[0_0_0_4px_#E7F9EE] z-[20]',
            '!absolute aspect-square left-[12.5%] top-0 h-full w-[75%] shadow-[0_0_0_4px_#EDFCF3] group-hover:shadow-[0_0_0_4px_#E7F9EE] z-[10]',
            '!absolute aspect-square left-[25%] top-0 h-full w-[75%]'
          ]}
          maxCount={3}
          posts={config.data.albums as unknown as WidgetPost[]}
        />
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
              <WidgetFollowButton followers={config.data.followers} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="line-clamp-2 text-sm leading-[1.2] text-gray-900">
              {config.data.overrides?.title || config.data.name}
            </h3>
            <div className="mt-1 text-xs text-gray-500">
              {formatNumber(config.data.followers)} monthly listeners
            </div>
          </div>
        </div>
        <div className="flex-1"></div>

        <WidgetPostList
          className="relative mt-6 !block aspect-[9/5] w-full"
          itemClassNames={[
            '!absolute aspect-square left-0 top-0 h-full w-[60%] shadow-[0_0_0_4px_#EDFCF3] group-hover:shadow-[0_0_0_4px_#E7F9EE] z-[20]',
            '!absolute aspect-square left-[20%] top-0 h-full w-[60%] shadow-[0_0_0_4px_#EDFCF3] group-hover:shadow-[0_0_0_4px_#E7F9EE] z-[10]',
            '!absolute aspect-square left-[40%] top-0 h-full w-[60%]'
          ]}
          maxCount={3}
          posts={config.data.albums as unknown as WidgetPost[]}
        />
      </div>
    )
  }
}

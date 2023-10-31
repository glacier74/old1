import { pickObject } from '@heyooo-inc/utils'
import { FC, useMemo } from 'react'

import { WidgetConfig, WidgetGridData, WidgetType } from '../WidgetProps'
import { parseURL } from '../utils'
import BehanceWidget from './BehanceWidget'
import GithubWidget from './GithubWidget'
import { GroupTitleWidget } from './GroupTitleWidget'
import MapWidget from './MapWidget'
import MediaWidget from './MediaWidget'
import SpotifyAlbumWidget from './SpotifyAlbumWidget'
import SpotifyArtistWidget from './SpotifyArtistWidget'
import SpotifyPlaylistWidget from './SpotifyPlaylistWidget'
import SpotifyTrackWidget from './SpotifyTrackWidget'
import TwitterWidget from './TwitterWidget'
import WebsiteWidget from './WebsiteWidget'

const WidgetItem: FC<WidgetGridData> = ({ id, type, size, url, data = {}, overrides }) => {
  const customURL = useMemo(() => parseURL(url, type), [url, type])
  const config: WidgetConfig = useMemo(() => {
    return {
      id,
      type: customURL.provider as WidgetType,
      size,
      url: customURL.url,
      data: {
        ...data,
        ...pickObject(customURL as AnyMap, ['longitude', 'latitude', 'zoom']),
        overrides
      }
    }
  }, [customURL, data, overrides, size])

  switch (customURL.provider) {
    case 'behance':
    case 'dribbble':
    case 'figma':
    case 'instagram':
    case 'steam_profiles':
    case 'steam_id':
    case 'tiktok':
    case 'youtube':
      return new BehanceWidget(config).getComponent()

    case 'github':
      return new GithubWidget(config).getComponent()

    case 'twitter':
      return new TwitterWidget(config).getComponent()

    case 'spotify_album':
      return new SpotifyAlbumWidget(config).getComponent()

    case 'spotify_artist':
      return new SpotifyArtistWidget(config).getComponent()

    case 'spotify_playlist':
      return new SpotifyPlaylistWidget(config).getComponent()

    case 'spotify_track':
      return new SpotifyTrackWidget(config).getComponent()

    case 'google_map':
      return new MapWidget(config).getComponent()

    case 'group_title':
      return new GroupTitleWidget(config).getComponent()

    case 'image':
    case 'video':
      return new MediaWidget(config).getComponent()

    default:
      return new WebsiteWidget(config).getComponent()
  }
}

export default WidgetItem

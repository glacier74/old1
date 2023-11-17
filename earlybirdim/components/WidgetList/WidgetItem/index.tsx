import { UniqueIdentifier } from '@dnd-kit/core/dist/types/other'
import { useSortable } from '@dnd-kit/sortable'
import { useGlobalContext } from '@earlybirdim/components'
import { WidgetActions } from '@earlybirdim/components/WidgetList/WidgetItem/WidgetActions'
import { pickObject } from '@heyooo-inc/utils'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { FC, useMemo, useState } from 'react'

import { WidgetConfig, WidgetGridData, WidgetType } from '../WidgetProps'
import { sizeClassNames } from '../constants'
import { parseURL } from '../utils'
import BehanceWidget from './BehanceWidget'
import EmailCaptureWidget from './EmailCaptureWidget'
import GithubWidget from './GithubWidget'
import { GroupTitleWidget } from './GroupTitleWidget'
import MapWidget from './MapWidget'
import MediaWidget from './MediaWidget'
import PaymentWidget from './PaymentWidget'
import SpotifyAlbumWidget from './SpotifyAlbumWidget'
import SpotifyArtistWidget from './SpotifyArtistWidget'
import SpotifyPlaylistWidget from './SpotifyPlaylistWidget'
import SpotifyTrackWidget from './SpotifyTrackWidget'
import TwitterWidget from './TwitterWidget'
import WebsiteWidget from './WebsiteWidget'

interface WidgetActiveItemProps {
  activeId?: UniqueIdentifier | null
  list: WidgetGridData[]
}

interface WidgetItemProps extends WidgetGridData {
  activeId?: UniqueIdentifier | null
  allowActions?: boolean
}

export const WidgetActiveItem: FC<WidgetActiveItemProps> = ({ activeId, list }) => {
  const config = useMemo(() => {
    if (activeId && list) {
      return list.find(w => w.id === activeId)
    }
  }, [activeId, list])

  if (!config) {
    return null
  }

  return <WidgetItem allowActions={false} {...config} />
}

const WidgetItem: FC<WidgetItemProps> = ({
  id,
  type,
  size: rawSize,
  url,
  data = {},
  overrides,
  activeId,
  allowActions = true
}) => {
  const { isPreview } = useGlobalContext()
  const [isHovered, setHovered] = useState(false)

  const size = useMemo(() => {
    if (type === 'group_title') {
      return 'full'
    } else {
      return rawSize || '1x1'
    }
  }, [rawSize, type])

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
  }, [customURL, data, id, overrides, size])

  const { listeners, setNodeRef, transform, transition } = useSortable({
    id: config.id
  })

  const isActive = useMemo(() => config.id === activeId, [activeId, config.id])

  const style = useMemo(
    () => ({
      transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : 'none',
      transition
    }),
    [transform, transition]
  )

  const children = useMemo(() => {
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

      case 'payment':
        return new PaymentWidget(config).getComponent()

      case 'email_capture':
        return new EmailCaptureWidget(config).getComponent()

      default:
        return new WebsiteWidget(config).getComponent()
    }
  }, [config, customURL.provider])

  function handleMouseEnter() {
    if (isPreview && !isActive && allowActions) {
      setHovered(true)
    }
  }

  function handleMouseLeave() {
    setHovered(false)
  }

  return (
    <motion.div
      transition={{
        type: 'spring',
        duration: 0.3
      }}
      className={clsx(`widget widget-${size.replace(/\./g, '_')} ${sizeClassNames[size]}`, {
        'group/widget relative': isPreview,
        'widget-active': isActive
      })}
      data-id={config.id}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full h-full" ref={setNodeRef} {...listeners}>
        {children}
      </div>

      {isHovered && (
        <WidgetActions
          className={clsx({
            '!justify-start left-4': config.type === 'group_title'
          })}
          config={config}
        />
      )}
    </motion.div>
  )
}

export default WidgetItem

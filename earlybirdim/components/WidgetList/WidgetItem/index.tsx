import { UniqueIdentifier } from '@dnd-kit/core/dist/types/other'
import { useSortable } from '@dnd-kit/sortable'
import { useGlobalContext } from '@earlybirdim/components'
import { pickObject } from '@heyooo-inc/utils'
import { isEmpty } from '@nily/utils'
import clsx from 'clsx'
import { FC, useMemo, useState } from 'react'
import { Flipped, spring } from 'react-flip-toolkit'

import { WidgetConfig, WidgetGridData, WidgetType } from '../WidgetProps'
import { sizeClassNames } from '../constants'
import { useShortLinkURL } from '../hook'
import { parseURL } from '../utils'
import BehanceWidget from './BehanceWidget'
import EmailCaptureWidget from './EmailCaptureWidget'
import ExperienceWidget from './ExperienceWidget'
import GithubWidget from './GithubWidget'
import { GroupTitleWidget } from './GroupTitleWidget'
import MapWidget from './MapWidget'
import MediaWidget from './MediaWidget'
import PaymentWidget from './PaymentWidget'
import PhoneWidget from './PhoneWidget'
import SkillsWidget from './SkillsWidget'
import SpotifyAlbumWidget from './SpotifyAlbumWidget'
import SpotifyArtistWidget from './SpotifyArtistWidget'
import SpotifyPlaylistWidget from './SpotifyPlaylistWidget'
import SpotifyTrackWidget from './SpotifyTrackWidget'
import TwitterWidget from './TwitterWidget'
import WebsiteWidget from './WebsiteWidget'
import { WidgetActions } from './WidgetActions'

interface WidgetActiveItemProps {
  activeId?: UniqueIdentifier | null
  list: WidgetGridData[]
  isDragOverlay?: boolean
}

interface WidgetItemProps extends WidgetGridData {
  disableMetadata?: boolean
  activeId?: UniqueIdentifier | null
  allowActions?: boolean
  isDragOverlay?: boolean
}

export const WidgetActiveItem: FC<WidgetActiveItemProps> = ({ activeId, list, isDragOverlay }) => {
  const config = useMemo(() => {
    if (activeId && list) {
      return list.find(w => w.id === activeId)
    }
  }, [activeId, list])

  if (!config) {
    return null
  }

  return <WidgetItem allowActions={false} isDragOverlay={isDragOverlay} {...config} />
}

const WidgetItem: FC<WidgetItemProps> = ({
  id,
  type,
  size: rawSize,
  url,
  disableMetadata,
  data = {},
  overrides,
  activeId,
  allowActions = true,
  isDragOverlay = false
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
  const shortLinkURL = useShortLinkURL(id)
  const config: WidgetConfig = useMemo(() => {
    return {
      id,
      type: customURL.provider as WidgetType,
      size,
      url: customURL.url,
      shortLinkURL,
      data: {
        ...data,
        ...pickObject(customURL as AnyMap, ['longitude', 'latitude', 'zoom']),
        overrides
      }
    }
  }, [customURL, data, disableMetadata, id, overrides, size])

  const { listeners, setNodeRef, transform, transition } = useSortable({
    id: config.id,
    transition: {
      easing: 'ease-in-out',
      duration: 100
    }
  })

  const isActive = useMemo(() => config.id === activeId, [activeId, config.id])

  const style = useMemo(
    () => ({
      transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
      transition
    }),
    [transform, transition]
  )

  const WidgetComponent = useMemo(() => {
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

      case 'skills':
        return new SkillsWidget(config).getComponent()

      case 'experience':
        return new ExperienceWidget(config).getComponent()

      case 'phone':
        return new PhoneWidget(config).getComponent()

      default:
        return new WebsiteWidget(config).getComponent()
    }
  }, [config, customURL.provider])

  function handleMouseEnter() {
    if (isPreview && !isActive && allowActions && !isDragOverlay) {
      setHovered(true)
    }
  }

  function handleMouseLeave() {
    if (!isDragOverlay) {
      setHovered(false)
    }
  }

  const children = useMemo(
    () => (
      <div
        className={clsx(`widget widget-${size.replace(/\./g, '_')} ${sizeClassNames[size]}`, {
          'group/widget relative': isPreview,
          'widget-active': isActive,
          'cursor-grab': isDragOverlay
        })}
        data-id={config.id}
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full h-full" ref={setNodeRef} {...listeners}>
          {WidgetComponent}
        </div>

        {isHovered && (
          <WidgetActions
            className={clsx({
              '!justify-start left-4': config.type === 'group_title'
            })}
            config={config}
          />
        )}
      </div>
    ),
    [WidgetComponent, config, isActive, isHovered, isPreview, listeners, setNodeRef, size, style]
  )

  function handleAppear(el: HTMLElement) {
    spring({
      onUpdate(val: any) {
        el.style.opacity = val
        el.style.transform = `scale(${val})`
        el.style.transformOrigin = 'center'
      }
    })
  }

  function handleExit(el: HTMLElement, _index: number, removeElement: () => void) {
    spring({
      onUpdate(val: any) {
        el.style.opacity = String(1 - val)
        el.style.transform = `scale(${1 - val})`
        el.style.transformOrigin = 'center'
      },
      onComplete: removeElement
    })
  }

  if (isPreview && !isDragOverlay) {
    return (
      <Flipped
        flipId={config.id}
        shouldFlip={() => isEmpty(activeId)}
        onAppear={handleAppear}
        onExit={handleExit}
      >
        {children}
      </Flipped>
    )
  }

  return children
}

export default WidgetItem

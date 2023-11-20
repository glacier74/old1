import {
  isAppleMusic,
  isApplePodcasts,
  isAppleStore,
  isBehance,
  isBuyMeCoffee,
  isDiscord,
  isDribbble,
  isFacebook,
  isFigma,
  isGithub,
  isGooglePlay,
  isGumroad,
  isInstagram,
  isKofi,
  isLayers,
  isLinkedin,
  isMedium,
  isProducthunt,
  isReddit,
  isSpotify,
  isSteam,
  isStripe,
  isSubstack,
  isTiktok,
  isTwitch,
  isTwitter,
  isYoutube,
  toCustomURL
} from '@tinaryan/dp'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useMemo } from 'react'

import { WidgetIconProps } from '../WidgetProps'
import { IconAppStore } from './IconAppStore'
import { IconAppleMusic } from './IconAppleMusic'
import { IconBehance } from './IconBehance'
import { IconBuyMeCoffee } from './IconBuyMeCoffee'
import { IconDiscord } from './IconDiscord'
import { IconDribbble } from './IconDribbble'
import { IconEarlyBird } from './IconEarlyBird'
import { IconEmailCapture } from './IconEmailCapture'
import { IconFacebook } from './IconFacebook'
import { IconFigma } from './IconFigma'
import { IconGithub } from './IconGithub'
import { IconGooglePlay } from './IconGooglePlay'
import { IconGumroad } from './IconGumroad'
import { IconInstagram } from './IconInstagram'
import { IconKofi } from './IconKofi'
import { IconLayers } from './IconLayers'
import { IconLinkedin } from './IconLinkedin'
import { IconMedium } from './IconMedium'
import { IconPodcast } from './IconPodcast'
import { IconProductHunt } from './IconProductHunt'
import { IconReddit } from './IconReddit'
import { IconSpotify } from './IconSpotify'
import { IconSteam } from './IconSteam'
import { IconStripe } from './IconStripe'
import { IconSubstack } from './IconSubstack'
import { IconTiktok } from './IconTiktok'
import { IconTwitch } from './IconTwitch'
import { IconTwitter } from './IconTwitter'
import { IconYouTube } from './IconYouTube'

const earlyBirdDomains = ['help.earlybird.im', 'earlybird.im']

function isEarlyBird(href: string) {
  const customURL = toCustomURL(href)

  if (customURL && earlyBirdDomains.includes(customURL.hostname)) {
    return customURL
  }
}

const websites = [
  {
    match: isAppleMusic,
    icon: IconAppleMusic,
    fill: '#FE253A'
  },
  {
    match: isAppleStore,
    icon: IconAppStore,
    fill: '#2072F3'
  },
  {
    match: isBehance,
    icon: IconBehance,
    fill: '#0057FF'
  },
  {
    match: isBuyMeCoffee,
    icon: IconBuyMeCoffee,
    fill: '#FFDD06 '
  },
  {
    match: isDiscord,
    icon: IconDiscord,
    fill: '#5865F2'
  },
  {
    match: isDribbble,
    icon: IconDribbble,
    fill: '#EA64D9'
  },
  {
    match: isEarlyBird,
    icon: IconEarlyBird,
    fill: '#fff'
  },
  {
    match: isFacebook,
    icon: IconFacebook,
    fill: '#0163E0'
  },
  {
    match: isFigma,
    icon: IconFigma,
    fill: '#3E3E3E'
  },
  {
    match: isGithub,
    icon: IconGithub,
    fill: '#000000'
  },
  {
    match: isGooglePlay,
    icon: IconGooglePlay,
    fill: '#fff '
  },
  {
    match: isGumroad,
    icon: IconGumroad,
    fill: '#FF90E8'
  },
  {
    match: isInstagram,
    icon: IconInstagram,
    fill: '#C837AB'
  },
  {
    match: isKofi,
    icon: IconKofi,
    fill: '#fff '
  },
  {
    match: isLayers,
    icon: IconLayers,
    fill: '#fff '
  },
  {
    match: isLinkedin,
    icon: IconLinkedin,
    fill: '#006699'
  },
  {
    match: isMedium,
    icon: IconMedium,
    fill: '#000000'
  },
  {
    match: isApplePodcasts,
    icon: IconPodcast,
    fill: '#B349FF'
  },
  {
    match: isProducthunt,
    icon: IconProductHunt,
    fill: '#fff'
  },
  {
    match: isReddit,
    icon: IconReddit,
    fill: '#FF4500'
  },
  {
    match: isSpotify,
    icon: IconSpotify,
    fill: '#1ED760'
  },
  {
    match: isSteam,
    icon: IconSteam,
    fill: '#111D2E'
  },
  {
    match: isStripe,
    icon: IconStripe,
    fill: '#635BFF'
  },
  {
    match: isSubstack,
    icon: IconSubstack,
    fill: '#FF6719'
  },
  {
    match: isTiktok,
    icon: IconTiktok,
    fill: '#1D141D'
  },
  {
    match: isTwitch,
    icon: IconTwitch,
    fill: '#65459B'
  },
  {
    match: isTwitter,
    icon: IconTwitter,
    fill: '#55ACEE'
  },
  {
    match: isYoutube,
    icon: IconYouTube,
    fill: '#FF0000'
  }
]

export function getWidgetIcon(url: string, type: string) {
  switch (type) {
    case 'email_capture':
      return {
        fill: '#FCFDF8',
        icon: IconEmailCapture
      }

    case 'payment':
      return {
        fill: '#635BFF',
        icon: IconStripe
      }

    default:
      return url ? websites.find(row => row.match(url)) : undefined
  }
}

export const WidgetIcon: FC<WidgetIconProps> = ({
  className,
  type,
  url,
  title,
  faviconUrl,
  ...restProps
}) => {
  const children = useMemo(() => {
    if (type) {
      switch (type) {
        case 'payment':
          return <IconStripe className="h-full w-full" />

        case 'email_capture':
          return <IconEmailCapture className="h-full w-full" />
      }
    } else if (url) {
      const website = websites.find(row => row.match(url))

      if (website) {
        return <website.icon className="h-full w-full" />
      } else if (faviconUrl) {
        return (
          <div className="p-1.5">
            <Image
              className="block h-full w-full object-cover"
              src={faviconUrl}
              alt={title!}
              width={28}
              height={28}
            />
          </div>
        )
      }

      return null
    }
  }, [faviconUrl, title, type, url])

  return (
    <div
      className={clsx(
        'relative flex max-[400px]:w-8 max-[400px]:h-8 h-10 w-10 items-center justify-center rounded-lg',
        className
      )}
      {...restProps}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 border border-black/10 rounded-lg"></div>
    </div>
  )
}

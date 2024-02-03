import { IconWorld } from '@tabler/icons'
import {
  isAppleMusic,
  isApplePodcasts,
  isAppleStore,
  isBehance,
  isBuyMeCoffee,
  isDiscord,
  isDouban,
  isDribbble,
  isFacebook,
  isFigma,
  isGithub,
  isGooglePlay,
  isGumroad,
  isImdb,
  isInstagram,
  isKofi,
  isLayers,
  isLinkedin,
  isMastodon,
  isMedium,
  isOpenAI,
  isProducthunt,
  isReddit,
  isSpotify,
  isSteam,
  isStripe,
  isSubstack,
  isThreads,
  isTiktok,
  isTwitch,
  isTwitter,
  isYoutube,
  toCustomURL
} from '@tinaryan/dp'
import clsx from 'clsx'
import {
  IconAppStore,
  IconAppleMusic,
  IconBehance,
  IconBuyMeCoffee,
  IconDiscord,
  IconDouban,
  IconDribbble,
  IconEarlyBird,
  IconEmailCapture,
  IconFacebook,
  IconFigma,
  IconGithub,
  IconGooglePlay,
  IconGumroad,
  IconImdb,
  IconInstagram,
  IconKofi,
  IconLayers,
  IconLinkedin,
  IconMastodon,
  IconMedium,
  IconOpenAI,
  IconPayment,
  IconPhone,
  IconPodcast,
  IconProductHunt,
  IconReddit,
  IconSpotify,
  IconSteam,
  IconStripe,
  IconSubstack,
  IconThreads,
  IconTiktok,
  IconTwitch,
  IconTwitter,
  IconYouTube
} from 'earlybirdim/internalIcons'
import Image from 'next/image'
import { FC, useMemo, useState } from 'react'

import { WidgetIconProps } from '../WidgetProps'

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
    match: isOpenAI,
    icon: IconOpenAI,
    fill: '#75A99C'
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
  },
  {
    match: isDouban,
    icon: IconDouban,
    fill: '#00B51D'
  },
  {
    match: isImdb,
    icon: IconImdb,
    fill: '#F5C518'
  },
  {
    match: isMastodon,
    icon: IconMastodon,
    fill: '#6364ff'
  },
  {
    match: isMastodon,
    icon: IconMastodon,
    fill: '#6364ff'
  },
  {
    match: isThreads,
    icon: IconThreads,
    fill: '#000000'
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
        fill: '#0267AB',
        icon: IconPayment
      }

    case 'text':
      return {
        fill: '#28D330',
        icon: IconPhone
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
  const [isErrored, setErrored] = useState(false)

  const children = useMemo(() => {
    if (type) {
      switch (type) {
        case 'payment':
          return <IconPayment className="h-full w-full" />

        case 'email_capture':
          return <IconEmailCapture className="h-full w-full" />

        case 'text':
          return <IconPhone className="h-full w-full" />
      }
    } else if (url) {
      const website = websites.find(row => row.match(url))

      if (website) {
        return <website.icon className="h-full w-full" />
      } else if (faviconUrl) {
        return (
          <div className={clsx('w-full h-full', isErrored ? 'p-0.5' : 'p-1')}>
            {isErrored ? (
              <IconWorld className="text-slate-500 dark:text-slate-400" />
            ) : (
              <Image
                className="block h-full w-full object-cover rounded-md"
                src={faviconUrl}
                alt={title || ''}
                width={28}
                height={28}
                onError={() => setErrored(true)}
              />
            )}
          </div>
        )
      }

      return null
    }
  }, [faviconUrl, isErrored, title, type, url])

  return (
    <div
      className={clsx(
        'widget-favicon relative flex max-[400px]:w-8 max-[400px]:h-8 h-10 w-10 items-center justify-center rounded-lg',
        className
      )}
      {...restProps}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 border border-black/10 dark:border-white/20 rounded-lg"></div>
    </div>
  )
}

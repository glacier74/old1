import { Input } from '@heyforms/ui'
import { isValid } from '@nily/utils'
import {
  IconBehance,
  IconBuyMeCoffee,
  IconDribbble,
  IconFigma,
  IconGithub,
  IconGumroad,
  IconInstagram,
  IconKofi,
  IconLayers,
  IconLinkedin,
  IconMedium,
  IconProductHunt,
  IconReddit,
  IconSubstack,
  IconTiktok,
  IconTwitch,
  IconTwitter,
  IconYouTube
} from 'earlybirdim/internalIcons'
import { nanoid } from 'nanoid'
import { useTranslation } from 'next-i18next'
import router from 'next/router'
import { FC, useCallback, useContext, useState } from 'react'

import templates from '~/layout/builder3/templates'
import { schemasToOptions } from '~/layout/builder3/utils'
import { ProductService } from '~/service'
import { useStore } from '~/store'

import { StepContainer } from './StepContainer'
import { StepsStoreContext } from './context'

interface SocialItemProps {
  name: string
  icon: FC<any>
  onChange: (name: string, value?: string) => void
}

const SOCIAL_ITEMS = [
  {
    name: 'twitter',
    label: 'Twitter',
    url: 'https://twitter.com/@{username}',
    icon: IconTwitter
  },
  {
    name: 'tiktok',
    label: 'TikTok',
    url: 'https://www.tiktok.com/@{username}',
    icon: IconTiktok
  },
  {
    name: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/{username}',
    icon: IconLinkedin
  },
  {
    name: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/{username}',
    icon: IconInstagram
  },
  {
    name: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/{username}',
    icon: IconYouTube
  },
  {
    name: 'twitch',
    label: 'Twitch',
    url: 'https://www.twitch.tv/{username}',
    icon: IconTwitch
  },
  {
    name: 'reddit',
    label: 'Reddit',
    url: 'https://www.reddit.com/user/{username}',
    icon: IconReddit
  },
  {
    name: 'buymecoffee',
    label: 'Buy Me a Coffee',
    url: 'https://www.buymeacoffee.com/{username}',
    icon: IconBuyMeCoffee,
    className: '!text-[11px]'
  },
  {
    name: 'gumroad',
    label: 'Gumroad',
    url: 'https://www.gumroad.com/{username}',
    icon: IconGumroad
  },
  {
    name: 'medium',
    label: 'Medium',
    url: 'https://medium.com/{username}',
    icon: IconMedium
  },
  {
    name: 'producthunt',
    label: 'Product Hunt',
    url: 'https://www.producthunt.com/products/{username}',
    icon: IconProductHunt
  },
  {
    name: 'dribbble',
    label: 'Dribbble',
    url: 'https://dribbble.com/{username}',
    icon: IconDribbble
  },
  {
    name: 'figma',
    label: 'Figma',
    url: 'https://www.figma.com/@{username}',
    icon: IconFigma
  },
  {
    name: 'behance',
    label: 'Behance',
    url: 'https://www.behance.net/{username}',
    icon: IconBehance
  },
  {
    name: 'github',
    label: 'Github',
    url: 'https://github.com/{username}',
    icon: IconGithub
  },
  {
    name: 'layers',
    label: 'Layers',
    url: 'https://layers.to/{username}',
    icon: IconLayers
  },
  {
    name: 'substack',
    label: 'Substack',
    url: 'https://{username}.substack.com',
    icon: IconSubstack
  },
  {
    name: 'kofi',
    label: 'Kofi',
    url: 'https://ko-fi.com/{username}',
    icon: IconKofi
  }
]

const SocialItem: FC<SocialItemProps> = ({ name, icon: Icon, onChange }) => {
  const social = SOCIAL_ITEMS.find(s => s.name === name)!

  function handleChange(value: string) {
    const url = isValid(value) ? social.url.replace('{username}', value.trim()) : undefined

    onChange(name, url)
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-[38px] h-[38px]">
        <Icon className="w-full h-full" />
        <div className="pointer-events-none absolute inset-0 border border-black/10 rounded-lg"></div>
      </div>
      <Input className="flex-1" leading="@" placeholder="username" onChange={handleChange} />
    </div>
  )
}

export const StepJingleBioSocial = () => {
  const { t } = useTranslation('dashboard')
  const { user } = useStore()
  const { state } = useContext(StepsStoreContext)

  const [socials, setSocials] = useState<AnyMap>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const handleChange = useCallback(
    (name: string, value?: string) => {
      setSocials({
        ...socials,
        [name]: value
      })
    },
    [socials]
  )

  const handleCreate = useCallback(async () => {
    setLoading(true)
    setError(undefined)

    try {
      const blocks = schemasToOptions(templates['jingle-bio'].schemas)

      // Update Jingle Bio block
      blocks.personal_info = {
        name: state.name,
        avatar: user.avatar,
        description: ''
      }

      const urls = Object.values(socials).filter(isValid)

      if (isValid(urls)) {
        blocks.main.socials = urls.map(url => ({
          id: nanoid(8),
          url,
          size: '1x1'
        }))
      }

      const productId = await ProductService.create({
        name: state.name,
        logo: user.avatar,
        template: 'jingle-bio',
        blocks,
        category: '',
        tagline: '',
        isJingleBio: true
      })

      await router.replace(`/product/${productId}/edit`)
    } catch (err: any) {
      setError(err.message)
    }

    setLoading(false)
  }, [socials, state.name, user.avatar])

  return (
    <StepContainer isNextButtonLoading={loading} onNextButtonClick={handleCreate}>
      <div className="flex items-center mb-8 text-3xl font-semibold text-slate-950">
        {t('createProduct.jbHeading2')}
      </div>

      <div className="space-y-4 mb-8 h-[320px] overflow-y-auto scrollbar">
        {SOCIAL_ITEMS.map(row => (
          <SocialItem name={row.name} icon={row.icon} onChange={handleChange} />
        ))}
      </div>

      {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
    </StepContainer>
  )
}

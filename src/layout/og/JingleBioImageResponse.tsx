import { getWidgetIcon } from '@earlybirdim/components/WidgetList/WidgetIcon'
import { FC } from 'react'

import { PackerRect } from '~/utils'

interface JingleBioImageResponseProps {
  domain: string
  profile: any
  socials: any[]
}

interface SocialItemProps {
  size: string
  type: string
  url: string
  imageUrl: string
  faviconUrl: string
}

const IMAGE_CONVERT_URL = process.env.NEXT_IMAGE_CONVERT_URL as string
const JINGLE_BIO_DOMAIN = process.env.NEXT_PUBLIC_JINGLE_BIO_DOMAIN as string

const SocialItemIcon: FC<SocialItemProps & { icon?: FC<any>; style?: any }> = ({
  type,
  icon: Icon,
  imageUrl,
  faviconUrl,
  style
}) => {
  if (Icon) {
    return (
      <Icon
        style={{
          width: 76,
          height: 76,
          ...style
        }}
      />
    )
  } else if (type === 'image' && imageUrl) {
    return <img width="76" height="76" src={imageUrl} style={style} />
  } else if (faviconUrl) {
    console.log(`${IMAGE_CONVERT_URL}/?url=${encodeURIComponent(faviconUrl)}`, style)

    return (
      <img
        width="24"
        height="24"
        src={`${IMAGE_CONVERT_URL}/?url=${encodeURIComponent(faviconUrl)}`}
        style={style}
      />
    )
  }

  return null
}

const SocialItem: FC<SocialItemProps & PackerRect> = props => {
  const result = getWidgetIcon(props.url, props.type)
  const isSize2x05 = props.size === '2x0.5'

  const style = (() => {
    if (isSize2x05) {
      return {
        width: 24,
        height: 24
      }
    } else if (props.type === 'image') {
      return {
        width: props.w,
        height: props.h
      }
    } else {
      return {
        width: 76,
        height: 76
      }
    }
  })()

  return (
    <div
      tw="flex absolute rounded-2xl"
      style={{
        width: props.w,
        height: props.h,
        left: props.x,
        top: props.y,
        backgroundColor: result?.fill || '#fff'
      }}
    >
      <div tw="flex items-center rounded-2xl overflow-hidden">
        <SocialItemIcon icon={result?.icon} style={style} {...props} />
      </div>
      <div tw="absolute inset-0 border-[2px] border-black/5 shadow-sm rounded-2xl"></div>
    </div>
  )
}

export const JingleBioImageResponse: FC<JingleBioImageResponseProps> = ({
  domain,
  profile,
  socials
}) => {
  return (
    <div tw="flex w-full h-full pt-[75px] pb-[95px] px-[75px] bg-white">
      <div tw="flex justify-between items-center w-full h-full">
        <div tw="flex flex-col justify-start w-[230px]">
          {profile.avatar && (
            <img
              width="140"
              height="140"
              src={profile.avatar}
              style={{
                borderRadius: 70
              }}
            />
          )}
          <div tw="flex w-full text-[36px] mt-[32px] font-bold text-slate-900">{profile.name}</div>
          <div tw="flex text-[16px] text-slate-600">
            {JINGLE_BIO_DOMAIN}/{domain}
          </div>
        </div>
        <div tw="relative flex w-[340px] h-[252px] overflow-hidden">
          {socials.map((row: any) => (
            <SocialItem key={row.id} {...row} />
          ))}
        </div>
      </div>
    </div>
  )
}

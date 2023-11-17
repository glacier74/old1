import { getWidgetIcon } from '@earlybirdim/components/WidgetList/WidgetIcon'
import { FC } from 'react'

import { PackerRect } from '~/utils'

interface JingleBioImageResponseProps {
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

const SocialItemIcon: FC<SocialItemProps & { icon?: FC<any> }> = ({
  icon: Icon,
  imageUrl,
  faviconUrl
}) => {
  if (Icon) {
    return (
      <Icon
        style={{
          width: 76,
          height: 76
        }}
      />
    )
  } else if (imageUrl) {
    return <img width="76" height="76" src={imageUrl} />
  } else if (faviconUrl) {
    return (
      <img
        tw="p-5"
        width="76"
        height="76"
        src={`https://image-proxy-nu.vercel.app/?url=${encodeURIComponent(faviconUrl)}`}
      />
    )
  }

  return null
}

const SocialItem: FC<SocialItemProps & PackerRect> = props => {
  const result = getWidgetIcon(props.url, props.type)

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
      <div tw="flex w-[76px] h-[76px] rounded-2xl overflow-hidden">
        <SocialItemIcon icon={result?.icon} {...props} />
      </div>
      <div tw="absolute inset-0 border-[2px] border-black/5 shadow-sm rounded-2xl"></div>
    </div>
  )
}

export const JingleBioImageResponse: FC<JingleBioImageResponseProps> = ({ profile, socials }) => {
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
          <div tw="w-full text-[36px] mt-[32px] font-bold text-slate-900">{profile.name}</div>
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

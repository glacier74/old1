import { FC, useMemo } from 'react'

import { urlBuilder } from '~/utils'

interface ProducthuntBadgeProps extends ComponentProps {
  badge: ProducthuntBadgeInfo
}

export const ProducthuntBadge: FC<ProducthuntBadgeProps> = ({ badge, ...restProps }) => {
  const href = useMemo(() => {
    return urlBuilder(badge.url, {
      utm_source: `badge-${badge.type}`,
      utm_medium: 'badge',
      utm_souce: `badge-${badge.slug}`
    })
  }, [badge.slug, badge.type, badge.url])

  const src = useMemo(() => {
    return urlBuilder(`https://api.producthunt.com/widgets/embed-image/v1/${badge.type}.svg`, {
      post_id: badge.id,
      period: badge.period,
      theme: badge.theme
    })
  }, [badge.type, badge.id, badge.period, badge.theme])

  const alt = useMemo(() => {
    return `${badge.name} - ${badge.tagline} | Product Hunt`
  }, [badge.name, badge.tagline])

  return (
    <a href={href} target="_blank" rel="noreferrer" {...restProps}>
      <img key={src} className="min-w-[13.875rem] h-12 w-auto" src={src} alt={alt} />
    </a>
  )
}

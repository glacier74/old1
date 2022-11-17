import { FC } from 'react'

import { RoundImage } from '~/components'

export const PublicSiteHeader: FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="py-10 mt-10 text-center">
      <a href="/" title={product.name}>
        <RoundImage src={product.logo} size={100} />
      </a>
      <h2 className="mt-7 text-4xl text-black">{product.name}</h2>
      <div className="mt-2 text-xl text-slate-500">{product.tagline}</div>
    </div>
  )
}

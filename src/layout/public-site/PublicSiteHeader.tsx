import { FC } from 'react'

import { RoundImage } from '~/components'

export const PublicSiteHeader: FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="py-24 my-10 text-center">
      <a href="/" title={product.name}>
        <RoundImage src={product.logo} size={125} />
      </a>
      <h2 className="mt-12 text-5xl text-slate-900 font-bold">{product.name}</h2>
      <div className="mt-4 max-w-3xl text-2xl text-slate-500 mx-auto">{product.tagline}</div>
    </div>
  )
}

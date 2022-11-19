import { FC } from 'react'

import { RoundImage } from '~/components'

export const PublicSiteHeader: FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="max-w-6xl mx-auto py-24 my-10 sm:text-center text-left">
      <a href="/" title={product.name}>
        <RoundImage src={product.logo} size={125} />
      </a>
      <h2 className="mt-12 sm:text-5xl text-3xl text-slate-900 font-bold">{product.name}</h2>
      <div className="mt-4 max-w-3xl text-xl text-slate-500 mx-auto">{product.tagline}</div>
    </div>
  )
}

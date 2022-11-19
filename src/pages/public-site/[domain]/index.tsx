import { conv } from '@nily/utils'
import { FC } from 'react'

import { BaseLayout, PublicBlocks, PublicSiteFooter, PublicSiteHeader } from '~/layout'
import { withTranslations } from '~/utils'

interface PublicSiteProps {
  product: Product
}

const PublicSite: FC<PublicSiteProps> = ({ product }) => (
  <BaseLayout
    seo={{
      title: product.siteSetting.metaTitle || product.name,
      description: product.siteSetting.metaDescription || product.tagline
    }}
  >
    <div className="px-4 sm:px-6 lg:px-8">
      <PublicSiteHeader product={product} />
      <PublicBlocks productId={product.id} blocks={product.siteSetting.content} />
      <PublicSiteFooter product={product} />
    </div>
  </BaseLayout>
)

export const getServerSideProps = withTranslations(async context => {
  const domain = context.params.domain
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/product/${domain}`)
  const product: Product = await result.json()

  if ((product as AnyMap<number>).statusCode || product.isSitePrivate) {
    return {
      notFound: true
    }
  }

  product.siteSetting.content = conv.json<Block[]>(product.siteSetting.content, [])!

  return {
    props: {
      product
    }
  }
})

export default PublicSite

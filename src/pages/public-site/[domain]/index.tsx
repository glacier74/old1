import { conv } from '@nily/utils'
import { FC } from 'react'

import { BaseLayout } from '~/layout'
import { FeaturePreview } from '~/layout/builder/blocks/Feature'
import { FooterPreview } from '~/layout/builder/blocks/Footer'
import { HeadingPreview } from '~/layout/builder/blocks/Heading'
import { HeroSectionPreview } from '~/layout/builder/blocks/HeroSection'
import { ImagePreview } from '~/layout/builder/blocks/Image'
import { ListPreview } from '~/layout/builder/blocks/List'
import { PaymentPreview } from '~/layout/builder/blocks/Payment'
import { SlideGalleryPreview } from '~/layout/builder/blocks/SlideGallery'
import { TextPreview } from '~/layout/builder/blocks/Text'
import { withTranslations } from '~/utils'

interface PublicSiteProps {
  product: Product
}

const Block: FC<{ product: Product; siteSetting: SiteSettings; block: any }> = ({
  product,
  siteSetting,
  block
}) => {
  switch (block.type) {
    case 'heroSection':
      return <HeroSectionPreview key={block.id} block={block} product={product} />

    case 'footer':
      return (
        <FooterPreview key={block.id} block={block} product={product} siteSetting={siteSetting} />
      )

    case 'slideGallery':
      return <SlideGalleryPreview key={block.id} block={block} />

    case 'payment':
      return <PaymentPreview key={block.id} product={product} block={block} />

    case 'feature':
      return <FeaturePreview key={block.id} block={block} />

    case 'list':
      return <ListPreview key={block.id} block={block} />

    case 'heading':
      return <HeadingPreview key={block.id} block={block} />

    case 'image':
      return <ImagePreview key={block.id} block={block} />

    default:
      return <TextPreview key={block.id} block={block} />
  }
}

const PublicSite: FC<PublicSiteProps> = ({ product }) => (
  <BaseLayout
    seo={{
      title: product.siteSetting.metaTitle || product.name,
      description: product.siteSetting.metaDescription || product.tagline
    }}
  >
    {product.siteSetting.content.map(block => (
      <Block key={block.id} product={product} block={block} siteSetting={product.siteSetting} />
    ))}
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

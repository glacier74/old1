import { EmptyStates } from '@heyforms/ui'
import { conv } from '@nily/utils'
import Link from 'next/link'
import { FC } from 'react'

import { IconLogo, Plausible } from '~/components'
import { BaseLayout } from '~/layout'
import { FeaturePreview } from '~/layout/builder/blocks/Feature'
import { FooterPreview } from '~/layout/builder/blocks/Footer'
import { HeadingPreview } from '~/layout/builder/blocks/Heading'
import { HeroSectionPreview } from '~/layout/builder/blocks/HeroSection'
import { ImagePreview } from '~/layout/builder/blocks/Image'
import { ListPreview } from '~/layout/builder/blocks/List'
import { NavigationPreview } from '~/layout/builder/blocks/Navigation'
import { PaymentPreview } from '~/layout/builder/blocks/Payment'
import { SlideGalleryPreview } from '~/layout/builder/blocks/SlideGallery'
import { TextPreview } from '~/layout/builder/blocks/Text'
import { cropImage, withTranslations } from '~/utils'

interface PublicSiteProps {
  product: Product
  paymentStatus?: 'success'
}

const Block: FC<{ product: Product; siteSetting: SiteSettings; block: any }> = ({
  product,
  siteSetting,
  block
}) => {
  switch (block.type) {
    case 'navigation':
      return <NavigationPreview key={block.id} block={block} product={product} />

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

const PublicSite: FC<PublicSiteProps> = ({ product, paymentStatus }) => (
  <BaseLayout
    shortName={product.name}
    favicon={cropImage(product.logo, 120, 120)}
    seo={{
      title: product.metaTitle || product.name,
      description: product.metaDescription || product.tagline,
      openGraph: {
        siteName: product.metaTitle || product.name,
        images: {
          url: product.metaImage
        }
      }
    }}
  >
    {paymentStatus === 'success' ? (
      <EmptyStates
        className="payment-successful"
        title="Your payment is successful!"
        description="Thank you for your payment! An automated payment receipt will be sent to the email address provided very shortly."
        icon="🎉"
        action={
          <Link href="/" className="link-button link-button-success">
            Back to {product.name}
          </Link>
        }
      />
    ) : (
      product.siteSetting.blocks.map(block => (
        <Block key={block.id} product={product} block={block} siteSetting={product.siteSetting} />
      ))
    )}

    <div className="fixed rounded shadow bg-white text-sm text-slate-700 z-10 px-4 py-2 right-5 bottom-5 md:right-12 md:bottom-6">
      <a href={process.env.NEXT_PUBLIC_HOMEPAGE}>
        <IconLogo className="w-6 inline" /> Made with EarlyBird
      </a>
    </div>

    <Plausible apiURI="https://analytics.earlybird.im" domain={product.analyticId} />
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

  product.siteSetting.blocks = conv.json<Block[]>(product.siteSetting.blocks, [])!

  return {
    props: {
      product,
      // `undefined` cannot be serialized as JSON
      paymentStatus: context.query.paymentStatus || null
    }
  }
})

export default PublicSite

import { EmptyStates, Form, Input } from '@heyforms/ui'
import { isValid } from '@nily/utils'
import AES from 'crypto-js/aes'
import JsCookie from 'js-cookie'
import { useTranslation } from 'next-i18next'
import { NextSeoProps } from 'next-seo'
import Script from 'next/script'
import { FC } from 'react'

import { IconLogo } from '~/components'
import { PublicSiteLayout } from '~/layout'
import { EmailCapturePreview } from '~/layout/builder/blocks/EmailCapture'
import { FaqPreview } from '~/layout/builder/blocks/Faq'
import { FeaturePreview } from '~/layout/builder/blocks/Feature'
import { FooterPreview } from '~/layout/builder/blocks/Footer'
import { HeaderPreview } from '~/layout/builder/blocks/Header'
import { HeadingPreview } from '~/layout/builder/blocks/Heading'
import { HeroSectionPreview } from '~/layout/builder/blocks/HeroSection'
import { ImagePreview } from '~/layout/builder/blocks/Image'
import { ListPreview } from '~/layout/builder/blocks/List'
import { PaymentPreview } from '~/layout/builder/blocks/Payment'
import { SlideGalleryPreview } from '~/layout/builder/blocks/SlideGallery'
import { TestimonialPreview } from '~/layout/builder/blocks/Testimonial'
import { TextPreview } from '~/layout/builder/blocks/Text'
import { PublicSiteDangerouslyHTML } from '~/layout/public-site/PublicSiteDangerouslyHTML'
import { ProductService } from '~/service'
import { cropImage, getPrivateToken, setPrivateToken, withTranslations } from '~/utils'

interface PublicSiteProps {
  isSiteAccessible?: boolean
  product: Product
  paymentStatus?: 'success'
}

const Block: FC<{ product: Product; block: any }> = ({ product, block }) => {
  switch (block.type) {
    case 'header':
      return <HeaderPreview key={block.id} block={block} product={product} />

    case 'heroSection':
      return <HeroSectionPreview key={block.id} block={block} />

    case 'footer':
      return <FooterPreview key={block.id} block={block} product={product} />

    case 'emailCapture':
      return <EmailCapturePreview key={block.id} block={block} product={product} />

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

    case 'faq':
      return <FaqPreview key={block.id} block={block} />

    case 'testimonial':
      return <TestimonialPreview key={block.id} block={block} />

    default:
      return <TextPreview key={block.id} block={block} />
  }
}

function getSeoProps(product: Product, isSiteAccessible?: boolean): NextSeoProps {
  const title = product.metaTitle || product.name

  // Private site
  if (!isSiteAccessible) {
    return {
      title,
      noindex: true,
      nofollow: true,
      description: undefined,
      openGraph: undefined
    }
  }

  const description = product.metaDescription || product.tagline
  const openGraphImage = product.openGraphImage || product.tempOpenGraphImage

  const seo: NextSeoProps = {
    title,
    description,
    canonical: product.canonicalURL,
    openGraph: {
      type: 'website',
      title,
      description,
      siteName: title,
      locale: product.language
    }
  }

  if (isValid(openGraphImage)) {
    seo.openGraph!.images = [
      {
        url: openGraphImage
      }
    ]
  }

  return seo
}

const PublicSite: FC<PublicSiteProps> = ({ isSiteAccessible, product, paymentStatus }) => {
  const { t } = useTranslation()
  const seo = getSeoProps(product, isSiteAccessible)

  async function handleFinish(values: AnyMap<string>) {
    const { token } = await ProductService.verifyPassword(product.id, values.password)

    setPrivateToken(JsCookie, token)
    setTimeout(() => {
      window.location.reload()
    }, 10)
  }

  if (product.isRestricted) {
    return (
      <PublicSiteLayout
        shortName={product.name}
        favicon={cropImage(product.logo, 120, 120)}
        seo={seo}
      >
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div>
              <h1 className="text-center text-3xl font-bold text-slate-900">
                Access to the landing page is restricted
              </h1>
              <p className="text-sm text-slate-700">
                This landing page is temporarily restricted from access. If you think this is an
                error, please get in touch with us.
              </p>
            </div>
          </div>
        </div>
      </PublicSiteLayout>
    )
  }

  if (!isSiteAccessible) {
    return (
      <PublicSiteLayout
        shortName={product.name}
        favicon={cropImage(product.logo, 120, 120)}
        seo={seo}
      >
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div>
              <h1 className="text-center text-3xl font-bold text-slate-900">
                {t('publicSite.privateHeading')}
              </h1>
            </div>

            <div className="mt-8 mx-5 md:mx-0">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="mt-6">
                  <Form.Custom
                    submitText={t('publicSite.accessSite')}
                    submitOptions={{
                      type: 'success',
                      className: 'mt-2',
                      block: true
                    }}
                    request={handleFinish}
                  >
                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: t('publicSite.invalidPassword') }]}
                    >
                      <Input.Password placeholder={t('publicSite.password')} />
                    </Form.Item>
                  </Form.Custom>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PublicSiteLayout>
    )
  }

  return (
    <PublicSiteLayout
      shortName={product.name}
      favicon={cropImage(product.logo, 120, 120)}
      seo={seo}
      theme={product.siteSetting.theme}
      integrations={product.integrations}
    >
      {paymentStatus === 'success' ? (
        <EmptyStates
          className="payment-successful"
          title="Your payment is successful!"
          description="Thank you for your payment! An automated payment receipt will be sent to the email address provided very shortly."
          icon="🎉"
          action={
            <a href="/" className="link-button link-button-success">
              Back to {product.name}
            </a>
          }
        />
      ) : (
        <div className="earlybird-blocks">
          {product.siteSetting.blocks.map(block => (
            <Block key={block.id} product={product} block={block} />
          ))}
        </div>
      )}

      {!product.isBrandingRemoved && (
        <div className="earlybird-branding">
          <a href={process.env.NEXT_PUBLIC_HOMEPAGE}>
            <IconLogo className="w-4 inline" /> Made with EarlyBird
          </a>
        </div>
      )}

      <PublicSiteDangerouslyHTML html={product.customCode} />

      <Script
        data-domain={product.analyticId}
        src="https://analytics.earlybird.im/js/plausible.js"
      />
    </PublicSiteLayout>
  )
}

export const getServerSideProps = withTranslations(async context => {
  const domain = context.params.domain
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/product/${domain}`)
  const product: Product = await result.json()

  if ((product as AnyMap<number>).statusCode) {
    return {
      notFound: true
    }
  }

  // Protection with a simple shared password
  if (product.isSitePrivate) {
    let isSiteAccessible = false
    const token = getPrivateToken(context.req.cookies)

    if (isValid(token)) {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/product/${product.id}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      })
      const json = await result.json()

      if (json.verified) {
        isSiteAccessible = true
      }
    }

    if (!isSiteAccessible) {
      return {
        props: {
          product: {
            id: product.id,
            name: product.name,
            metaTitle: product.metaTitle
          },
          isSiteAccessible: false,
          language: product.language
        }
      }
    }
  }

  if (!product.openGraphImage) {
    const title = (product.metaTitle || product.name).slice(0, 72)
    const e = AES.encrypt(title, process.env.NEXT_API_VERIFICATION_KEY!).toString()

    product.openGraphImage = `${process.env.NEXT_PUBLIC_HOMEPAGE}/api/og?e=${encodeURIComponent(e)}`
  }

  return {
    props: {
      product,
      isSiteAccessible: true,
      language: product.language,
      // `undefined` cannot be serialized as JSON
      paymentStatus: context.query.paymentStatus || null
    }
  }
})

export default PublicSite

import { GlobalContext } from '@earlybirdim/components'
import { Form, Input } from '@heyforms/ui'
import { isValid, objectPath } from '@nily/utils'
import { IconCheck } from '@tabler/icons'
import { isGoogleMap } from '@tinaryan/dp'
import JsCookie from 'js-cookie'
import { useTranslation } from 'next-i18next'
import { NextSeoProps } from 'next-seo'
import imageLoader from 'next/dist/shared/lib/image-loader'
import Script from 'next/script'
import party from 'party-js'
import { FC, useEffect, useMemo } from 'react'

import { IconLogo } from '~/components'
import { PublicSiteLayout } from '~/layout'
import components from '~/layout/builder2/components'
import { SchemaTypeEnum } from '~/layout/builder3/constants'
import templates from '~/layout/builder3/templates'
import { findSchemaPaths } from '~/layout/builder3/utils'
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
import { PublicSiteHiddenBlocksStyle } from '~/layout/public-site/PublicSiteHiddenBlocksStyle'
import { ProductService } from '~/service'
import { JingleBioService } from '~/service/jinglebio'
import { PublicApiService } from '~/service/public-api'
import { getPrivateToken, setPrivateToken, withTranslations } from '~/utils'

interface PublicSiteProps {
  isSiteAccessible?: boolean
  product: Product
  paymentStatus?: 'success'
  successMessage?: string
}

const Block: FC<{ product: Product; schema: number; block: any }> = ({
  product,
  schema,
  block
}) => {
  const component = useMemo(() => {
    if (block.componentId) {
      return components[block.componentId]
    }
  }, [block.componentId])

  if (schema === 2) {
    if (!component) {
      return null
    }

    return <component.render productId={product.id} block={block} />
  }

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

const PaymentSuccess: FC<Partial<PublicSiteProps>> = ({ product, successMessage }) => {
  useEffect(() => {
    party.confetti(document.querySelector('.payment-success-party')! as HTMLElement, {
      count: party.variation.range(20, 40)
    })
  }, [])

  return (
    <div className="fixed inset-0 z-[98] flex h-screen w-screen items-center p-5">
      <div className="payment-success-party absolute inset-0 z-[99] bg-black/20"></div>
      <div className="relative z-[100] mx-auto w-full max-w-[600px] rounded-2xl bg-white px-8 py-12 shadow-2xl">
        <div className="flex justify-center">
          <div className="bg-emerald-600 flex items-center justify-center w-[60px] h-[60px] rounded-full">
            <IconCheck className="text-white w-[32px] h-[32px]" />
          </div>
        </div>
        <div className="mt-8 text-lg text-slate-800 font-medium text-center">
          {successMessage ||
            'Thank you for your payment! An automated payment receipt will be sent to the email address provided very shortly.'}
        </div>
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-block px-5 py-1.5 text-emerald-600 border border-emerald-600 rounded-[999px]"
          >
            Back to {product?.name}
          </a>
        </div>
      </div>
    </div>
  )
}

const PublicSite: FC<PublicSiteProps> = ({
  isSiteAccessible,
  product,
  paymentStatus,
  successMessage
}) => {
  const { t } = useTranslation(['publicSite'])
  const seo = getSeoProps(product, isSiteAccessible)
  const faviconURL = useMemo(() => {
    if (isValid(product.logo)) {
      return imageLoader({
        config: process.env.__NEXT_IMAGE_OPTS as any,
        src: product.logo,
        quality: 95,
        width: 32
      })
    }
  }, [product.logo])

  async function handleFinish(values: AnyMap<string>) {
    const { token } = await ProductService.verifyPassword(product.id, values.password)

    setPrivateToken(JsCookie, token)
    setTimeout(() => {
      window.location.reload()
    }, 10)
  }

  if (product.isRestricted) {
    return (
      <PublicSiteLayout shortName={product.name} favicon={faviconURL} seo={seo}>
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div>
              <h1 className="text-center text-2xl font-bold text-slate-900">Access restricted</h1>
              <p className="text-center text-sm text-slate-700">
                Access to this landing page is currently restricted. If you believe this is a
                mistake, please contact us.
              </p>
            </div>
          </div>
        </div>
      </PublicSiteLayout>
    )
  }

  if (!isSiteAccessible) {
    return (
      <PublicSiteLayout shortName={product.name} favicon={faviconURL} seo={seo}>
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div>
              <h1 className="text-center text-3xl font-bold text-slate-900">
                {t('privateHeading')}
              </h1>
            </div>

            <div className="mt-8 mx-5 md:mx-0">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="mt-6">
                  <Form.Custom
                    submitText={t('accessSite')}
                    submitOptions={{
                      type: 'success',
                      className: 'mt-2',
                      block: true
                    }}
                    request={handleFinish}
                  >
                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: t('invalidPassword') }]}
                    >
                      <Input.Password placeholder={t('password')} />
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
      favicon={faviconURL}
      seo={seo}
      schema={product.siteSetting.schema}
      theme={product.siteSetting.theme}
      integrations={product.integrations}
    >
      {product.siteSetting.schema === 3 ? (
        <GlobalContext.Provider
          value={{
            productId: product.id
          }}
        >
          {isValid(product.siteSetting.blocks)
            ? templates[product.siteSetting.template]?.render({
                product,
                options: product.siteSetting.blocks,
                hiddenBlocks: product.siteSetting.hiddenBlocks
              })
            : null}
        </GlobalContext.Provider>
      ) : (
        <div className="earlybird-blocks">
          {product.siteSetting.blocks.map((block: any) => (
            <Block
              key={block.id}
              product={product}
              schema={product.siteSetting.schema}
              block={block}
            />
          ))}
        </div>
      )}

      {paymentStatus === 'success' && (
        <PaymentSuccess product={product} successMessage={successMessage} />
      )}

      {!product.isBrandingRemoved && (
        <div className="earlybird-branding">
          <a href={process.env.NEXT_PUBLIC_HOMEPAGE}>
            <IconLogo className="w-4 inline" /> Made with EarlyBird
          </a>
        </div>
      )}

      <PublicSiteDangerouslyHTML html={product.siteSetting.customCode} />
      <PublicSiteHiddenBlocksStyle hiddenBlocks={product.siteSetting.hiddenBlocks} />

      <Script
        dangerouslySetInnerHTML={{ __html: `window.captcha = ${JSON.stringify(product.captcha)}` }}
        strategy="beforeInteractive"
      />
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${product.captcha.recaptcha}`}
        strategy="beforeInteractive"
      />
      <Script
        data-domain={product.analyticId}
        src="https://analytics.earlybird.im/js/plausible.js"
      />
    </PublicSiteLayout>
  )
}

export const getServerSideProps = withTranslations(
  async context => {
    const domain = context.params.domain
    let product: Product

    try {
      product = await PublicApiService.product(domain)
    } catch (err: any) {
      console.error(err)

      return {
        notFound: true
      }
    }

    // Protection with a simple shared password
    if (product.isSitePrivate) {
      let isSiteAccessible = false
      const token = getPrivateToken(context.req.cookies)

      if (isValid(token)) {
        const json = await PublicApiService.verifyToken(product.id, token)

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
      product.openGraphImage = `${process.env.NEXT_PUBLIC_HOMEPAGE}/api/og/${product.domain}?v=${product.siteSetting.version}`
    }

    if (product.isJingleBio) {
      const widgetListPaths = findSchemaPaths(
        templates[product.siteSetting.template].schemas,
        SchemaTypeEnum.widgetList
      )

      if (isValid(widgetListPaths)) {
        const urlPaths: any[] = []

        for (const path of widgetListPaths) {
          objectPath.get(product.siteSetting.blocks, path).forEach((row: any, index: number) => {
            if (isValid(row.url) && !isGoogleMap(row.url)) {
              urlPaths.push({
                url: row.url,
                path: [path, index].join('.')
              })
            }
          })
        }

        if (isValid(urlPaths)) {
          try {
            const result = await JingleBioService.metadata(
              product.id,
              urlPaths.map(p => p.url)
            )

            urlPaths.forEach((row, index) => {
              const data = objectPath.get(product.siteSetting.blocks, row.path)

              objectPath.set(product.siteSetting.blocks, row.path, {
                ...data,
                ...result[index]
              })
            })
          } catch (err: any) {
            console.error(err.message)
          }
        }
      }
    }

    return {
      props: {
        product,
        isSiteAccessible: true,
        language: product.language,
        // `undefined` cannot be serialized as JSON
        paymentStatus: context.query.paymentStatus || null,
        successMessage: context.query.successMessage || null
      }
    }
  },
  ['publicSite']
)

export default PublicSite

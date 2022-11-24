import { conv } from '@nily/utils'
import { FC } from 'react'

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

const PublicSite: FC<PublicSiteProps> = ({ product }) => (
  <BaseLayout
    shortName={product.name}
    favicon={cropImage(product.logo, 16, 16)}
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
    {product.siteSetting.blocks.map(block => (
      <Block key={block.id} product={product} block={block} siteSetting={product.siteSetting} />
    ))}

    <div className="fixed rounded shadow bg-white text-sm text-slate-700 z-10 px-4 py-2 right-5 bottom-5 md:right-12 md:bottom-6">
      <a href={process.env.NEXT_PUBLIC_HOMEPAGE}>
        <img
          className="w-6 inline"
          alt="EarlyBird"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8IS0tIENyZWF0b3I6IENvcmVsRFJBVyAyMDIwICg2NC1CaXQpIC0tPg0KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIzNC41ODI3bW0iIGhlaWdodD0iMzQuNTgyN21tIiB2ZXJzaW9uPSIxLjEiIHN0eWxlPSJzaGFwZS1yZW5kZXJpbmc6Z2VvbWV0cmljUHJlY2lzaW9uOyB0ZXh0LXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IGltYWdlLXJlbmRlcmluZzpvcHRpbWl6ZVF1YWxpdHk7IGZpbGwtcnVsZTpldmVub2RkOyBjbGlwLXJ1bGU6ZXZlbm9kZCINCnZpZXdCb3g9IjAgMCAxNy4zNyAxNy4zNyINCiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayINCiB4bWxuczp4b2RtPSJodHRwOi8vd3d3LmNvcmVsLmNvbS9jb3JlbGRyYXcvb2RtLzIwMDMiPg0KIDxkZWZzPg0KICA8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KICAgPCFbQ0RBVEFbDQogICAgLmZpbDMge2ZpbGw6bm9uZX0NCiAgICAuZmlsMCB7ZmlsbDojMTBCOTgxfQ0KICAgIC5maWwxIHtmaWxsOiNGRkQzNER9DQogICAgLmZpbDIge2ZpbGw6d2hpdGV9DQogICBdXT4NCiAgPC9zdHlsZT4NCiA8L2RlZnM+DQogPGcgaWQ9Ik9CSkVDVFMiPg0KICA8bWV0YWRhdGEgaWQ9IkNvcmVsQ29ycElEXzBDb3JlbC1MYXllciIvPg0KICA8ZyBpZD0iXzI2MTgxMTQ5MTIiPg0KICAgPHBhdGggY2xhc3M9ImZpbDAiIGQ9Ik01LjM3IDUuMTRjLTAuNzUsMC40MyAtMS43MywwLjg5IC0yLjQ5LDEuNjkgLTEuMTEsMSAtMS43NSwyLjUxIC0xLjU4LDQuMTEgMC4yOCwyLjY2IDIuNjUsNC41OCA1LjI5LDQuMyAxLjA4LC0wLjExIDIuMDMsLTAuNTggMi43NywtMS4yNiAwLjM3LDAuMzcgMC43MiwwLjc4IDEuMDQsMS4xNyAwLjEsMC4xMyAwLjA3LDAuMTMgMC4xNywwLjAyIDAuNDIsLTAuNDUgMC44NCwtMC45IDEuMjYsLTEuMzYgLTAuMjUsMC4wMiAtMC43LDAuMTQgLTEuMzUsMC44MiAtMC4yOSwtMC4zNSAtMC41LC0wLjYzIC0wLjg0LC0wLjk1IDAuODgsLTAuOTggMS4zNiwtMi4zMyAxLjIxLC0zLjc1IC0wLjEsLTAuOSAtMC4zOSwtMS44MyAtMC44NSwtMi42NyAtMC4zMywtMC42IC0wLjMxLC0xLjI3IDAuMTMsLTEuNiAwLjYyLC0wLjQ1IDEuMDMsLTEuMTkgMS4wMywtMi4wMiAwLC0xLjM4IC0xLjEyLC0yLjUgLTIuNSwtMi41IC0xLjM4LDAgLTIuNSwxLjEyIC0yLjUsMi41IDAsMC41NCAtMC4wOCwxLjA4IC0wLjgxLDEuNDl6bS0wLjEzIDEwLjJjMC4wMSwwLjQxIC0wLjAxLDEuMzEgLTAuMDMsMS40MSAtMC4wMywwLjE0IC0wLjAxLDAuMTMgMC4wOSwwLjEzIDAuNjIsMCAxLjIsMCAxLjgxLDAgLTAuMTgsLTAuMTggLTAuNTIsLTAuNCAtMS40NiwtMC40MSAwLDAgMC4wMSwtMC40NSAtMCwtMS4wNyAtMC4xNCwtMC4wMSAtMC4yNywtMC4wMyAtMC40MSwtMC4wNXoiLz4NCiAgIDxwYXRoIGNsYXNzPSJmaWwxIiBkPSJNMTAuODcgMi4xOWMxLjY0LC0wLjg2IDQuMjgsLTEuNjYgNS4xNSwtMS43MSAwLjA3LC0wIDAuMDksMCAwLjAxLDAuMDMgLTEuMTEsMC4zOSAtMy4yMSwxLjE5IC00LjksMi4yIC0wLjA3LC0wLjE5IC0wLjE2LC0wLjM2IC0wLjI3LC0wLjUyeiIvPg0KICAgPHBhdGggY2xhc3M9ImZpbDIiIGQ9Ik04LjI3IDYuMDZjLTIuODksLTEuMDIgLTUuNTksMC44MSAtNi40NywyLjU2IDAuODUsLTIuMDQgMy42OSwtNCA2LjQ3LC0yLjU2em0xLjExIC0zLjgzYy0wLjE4LDAuMDMgLTAuMzEsMC4yIC0wLjI4LDAuMzkgMC4wMywwLjE4IDAuMiwwLjMxIDAuMzksMC4yOCAwLjE4LC0wLjAzIDAuMzEsLTAuMiAwLjI4LC0wLjM5IC0wLjAzLC0wLjE4IC0wLjIsLTAuMzEgLTAuMzksLTAuMjh6bS0xLjA1IC0wLjg2Yy0xLjA0LDAuMyAtMS44MiwxLjM4IC0xLjkxLDIuMzggLTAuMDUsLTEuMDEgMC42OSwtMi4xNiAxLjkxLC0yLjM4eiIvPg0KICA8L2c+DQogIDxyZWN0IGNsYXNzPSJmaWwzIiB4PSIwIiB5PSItMCIgd2lkdGg9IjE3LjM3IiBoZWlnaHQ9IjE3LjM3Ii8+DQogPC9nPg0KPC9zdmc+DQo="
        />{' '}
        Made with EarlyBird
      </a>
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

  product.siteSetting.blocks = conv.json<Block[]>(product.siteSetting.blocks, [])!

  return {
    props: {
      product
    }
  }
})

export default PublicSite

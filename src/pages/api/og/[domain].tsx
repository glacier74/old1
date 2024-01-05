import { parseURL } from '@earlybirdim/components/WidgetList/utils'
import { isValid } from '@nily/utils'
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

import { DefaultImageResponse, JingleBioImageResponse } from '~/layout/og'
import { PublicApiService } from '~/service/public-api'
import { BOX_SIZES, CELL_GAP, packer } from '~/utils/waterfall'

export const config = {
  runtime: 'edge'
}

const GROUP_TITLE_TYPE = 'group_title'
const WEBSITE_TYPE = 'website'

export default async function handler(req: NextRequest) {
  try {
    const domain = new URL(req.url).searchParams.get('domain')!
    const product = await PublicApiService.product(domain)

    if (product.isJingleBio) {
      const { personal_info, main } = product.siteSetting.blocks
      const socials = packer(
        main.socials
          ?.filter((s: any) => s.type !== GROUP_TITLE_TYPE)
          .map((s: any) => ({
            id: s.id,
            type: parseURL(s.url, s.type).provider,
            size: s.size,
            url: s.url,
            imageUrl: s.data?.imageUrl || s.overrides?.imageUrl,
            ...BOX_SIZES[s.size]
          })),
        {
          maxWidth: 340,
          gapX: CELL_GAP,
          gapY: CELL_GAP
        }
      ).filter(s => s.y < 252)

      const urls = socials.filter((s: any) => s.type === WEBSITE_TYPE).map((s: any) => s.url)

      if (isValid(urls)) {
        const metadata = await PublicApiService.metadata(urls)

        urls.forEach((url, index) => {
          socials
            .filter((s: any) => s.url === url)
            .forEach((s: any) => {
              s.faviconUrl = metadata[index].faviconUrl
            })
        })
      }

      return new ImageResponse(
        <JingleBioImageResponse domain={domain} profile={personal_info} socials={socials} />,
        {
          width: 800,
          height: 420,
          debug: false
        }
      )
    }

    return new ImageResponse(
      (
        <DefaultImageResponse
          name={product.name}
          metaTitle={product.metaTitle}
          metaDescription={product.metaDescription || product.tagline}
        />
      ),
      {
        width: 800,
        height: 420
      }
    )
  } catch (err: any) {
    console.error(err)
    console.error(err.stack)

    return new Response(`Failed to generate the image`, {
      status: 500
    })
  }
}

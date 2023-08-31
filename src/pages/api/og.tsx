import { conv } from '@nily/utils'
import { ImageResponse } from '@vercel/og'
import { enc } from 'crypto-js'
import AES from 'crypto-js/aes'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge'
}

const interRegularFontFunc = fetch(
  new URL('../../../public/static/Inter-Regular.ttf', import.meta.url)
).then(res => res.arrayBuffer())

const interBoldFontFunc = fetch(
  new URL('../../../public/static/Inter-Bold.ttf', import.meta.url)
).then(res => res.arrayBuffer())

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    if (!searchParams.has('e')) {
      return new Response('The params is not allowed to be empty', {
        status: 400
      })
    }

    const e = decodeURIComponent(searchParams.get('e')!)
    const payload = AES.decrypt(e, process.env.NEXT_API_VERIFICATION_KEY!).toString(enc.Utf8)

    const { name, metaTitle, metaDescription } = conv.json<AnyMap<string>>(payload)!

    const [interRegularFont, interBoldFont] = await Promise.all([
      interRegularFontFunc,
      interBoldFontFunc
    ])

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage:
              'radial-gradient(60% 100%,#fff,rgba(255,255,255,0.1)),radial-gradient(100% 30% at 50% 0px, #fff 60%, rgba(255,255,255,0.1)),linear-gradient(120.7deg,#fbddf0 10.68%,#c2f2ff 88.93%)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%'
          }}
        >
          <div tw="h-[140px] pt-[20px] px-[60px] w-full flex items-center justify-center">
            <div tw="text-[32px] text-slate-900 text-center font-bold">{metaTitle}</div>
          </div>
          <div tw="w-full px-[60px] h-[280px] flex flex-col">
            <div tw="relative w-full h-full p-[40px] flex flex-col bg-white/70 rounded-t-[16px]">
              <div tw="absolute top-[16px] left-[16px] flex">
                <div tw="w-[16px] h-[16px] rounded-full bg-[#EC6A5F]"></div>
                <div tw="w-[16px] h-[16px] ml-[8px] rounded-full bg-[#F4BF4F]"></div>
                <div tw="w-[16px] h-[16px] ml-[8px] rounded-full bg-[#61C454]"></div>
              </div>

              <div tw="mt-[12px] w-full flex items-center justify-center">
                <div tw="text-[28px] text-slate-700 text-center font-bold">{name}</div>
              </div>
              <div tw="mt-[24px] flex-1 w-full flex items-center justify-center">
                <div tw="text-[20px] text-slate-500 text-center font-bold">{metaDescription}</div>
              </div>
              <div tw="mt-[24px] w-full flex items-center justify-center">
                <div tw="px-8 py-2 bg-slate-900 rounded-full text-white text-lg">Get started</div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 800,
        height: 420,
        fonts: [
          {
            name: 'Inter',
            data: interRegularFont,
            style: 'normal',
            weight: 400
          },
          {
            name: 'Inter',
            data: interBoldFont,
            style: 'normal',
            weight: 700
          }
        ]
      }
    )
  } catch (e: any) {
    console.log(`Failed to generate og: ${e.message}`)

    return new Response(`Failed to generate the image`, {
      status: 500
    })
  }
}

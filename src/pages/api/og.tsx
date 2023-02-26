import { ImageResponse } from '@vercel/og'
import { enc } from 'crypto-js'
import AES from 'crypto-js/aes'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge'
}

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    if (!searchParams.has('e')) {
      return new Response('The params is not allowed to be empty', {
        status: 400
      })
    }

    const e = decodeURIComponent(searchParams.get('e')!)
    const title = AES.decrypt(e, process.env.NEXT_API_VERIFICATION_KEY!).toString(enc.Utf8)

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage: 'linear-gradient(135deg, #b721ff 0%, #21d4fd 100%)',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap'
          }}
        >
          <div
            style={{
              marginLeft: 60,
              marginRight: 60,
              fontSize: 54,
              lineHeight: 1.2,
              color: '#fff'
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        width: 800,
        height: 420
      }
    )
  } catch (e: any) {
    console.log(`Failed to generate og: ${e.message}`)

    return new Response(`Failed to generate the image`, {
      status: 500
    })
  }
}

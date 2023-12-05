import { AwesomeQR, QRCodeBrowser } from '@qrcode-js/browser'
import imageLoader from 'next/dist/shared/lib/image-loader'
import { FC, useEffect, useMemo, useRef } from 'react'

interface QRCodeProps extends ComponentProps {
  canvasClassName?: string
  text: string
  icon: string
}

export const QRCode: FC<QRCodeProps> = ({ canvasClassName, text, icon, ...restProps }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const qrcodeRef = useRef<AwesomeQR<HTMLCanvasElement> | null>(null)

  const logo = useMemo(() => {
    if (!icon) {
      return
    }

    return {
      round: 1,
      scale: 0.3,
      image: imageLoader({
        config: process.env.__NEXT_IMAGE_OPTS as any,
        src: icon,
        quality: 100,
        width: 256
      })
    }
  }, [icon])

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    if (!qrcodeRef.current) {
      qrcodeRef.current = QRCodeBrowser(canvasRef.current)
    }

    qrcodeRef.current.setOptions({
      text,
      color: '#123456',
      size: 360,
      logo,
      background: {
        colorBelow: '#fff'
      },
      margin: {
        color: '#fff',
        size: 32
      },
      dots: {
        scale: 1,
        round: 0
      },
      finder: {
        round: 0.5
      },
      gradient: (ctx, size) => {
        const gradient = ctx.createLinearGradient(0, 0, size, size)

        gradient.addColorStop(0, '#10b981')
        gradient.addColorStop(1, '#38bdf8')

        return gradient
      },
      qr: {
        correctLevel: 3
      }
    })
    qrcodeRef.current.draw()
  }, [text, logo])

  return (
    <div {...restProps}>
      <canvas ref={canvasRef} className={canvasClassName} />
    </div>
  )
}

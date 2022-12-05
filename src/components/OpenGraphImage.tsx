import canvasTxt from 'canvas-txt'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

interface OpenGraphImageProps {
  text: string
  width: number
  height: number
}

export interface OpenGraphImageInstance {
  toBase64: () => string | undefined
}

export const OpenGraphImage = forwardRef<OpenGraphImageInstance, OpenGraphImageProps>(
  ({ text, width, height }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    function toBase64(): string | undefined {
      return canvasRef.current?.toDataURL()
    }

    useEffect(() => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d')!
        ctx.clearRect(0, 0, width, height)

        const grd = ctx.createLinearGradient(0, height, width, 0)

        grd.addColorStop(0, '#fdef84')
        grd.addColorStop(0.5, '#f7c6a9')
        grd.addColorStop(1, '#15bac4')

        ctx.fillStyle = grd
        ctx.fillRect(0, 0, width, height)

        canvasTxt.font =
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
        canvasTxt.fontSize = 54
        canvasTxt.fontWeight = 700
        canvasTxt.lineHeight = 54 * 1.2

        ctx.fillStyle = '#fff'
        canvasTxt.drawText(ctx, text, 60, 0, width - 120, height)
      }
    }, [canvasRef.current, text])

    useImperativeHandle(ref, () => ({
      toBase64
    }))

    return <canvas className="w-full h-auto" ref={canvasRef} width={width} height={height} />
  }
)

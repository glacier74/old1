import isURL from 'validator/lib/isURL'
import { isValid, qs } from '@nily/utils'

const rules = [
  {
    match: /^https?:\/\//i,
    handler(src: string, width: number, height: number) {
      return src + (src.includes('?') ? '&' : '?') + qs.stringify({ w: width, h: height })
    }
  },
  {
    match: /^https:\/\/images\.unsplash\.com/i,
    handler(src: string, width: number, height: number) {
      src = src!.replace(/&(w|h)=\d+/g, '')

      if (width === height) {
        src = src!.replace(/&fit=[^&]+/i, '&fit=crop')
      }

      return `${src}&w=${width}&h=${height}`
    }
  }
]

export function cropImage(
  src?: string,
  width = 0,
  height = 0,
  pixelRatio = true
): string | undefined {
  if (isValid(src) && isURL(src!)) {
    if (pixelRatio) {
      width = Math.ceil(width * window.devicePixelRatio)
      height = Math.ceil(height * window.devicePixelRatio)
    }

    for (const rule of rules) {
      if (rule.match.test(src!)) {
        return rule.handler(src!, width, height)
      }
    }

    return src
  }
}

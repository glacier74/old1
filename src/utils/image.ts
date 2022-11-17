import { isValid, qs } from '@nily/utils'
import isURL from 'validator/lib/isURL'

function handler(src: string, width: number, height: number) {
  const param: AnyMap<number> = {}

  if (width > 0) param.w = width
  if (height > 0) param.h = height

  return src + (src.includes('?') ? '&' : '?') + qs.stringify(param)
}

const rules = [
  {
    match: /^https?:\/\//i,
    handler
  },
  {
    match: /^https:\/\/images\.unsplash\.com/i,
    handler(src: string, width: number, height: number) {
      src = src!.replace(/&(w|h)=\d+/g, '')

      if (width === height) {
        src = src!.replace(/&fit=[^&]+/i, '&fit=crop')
      }

      return handler(src, width, height)
    }
  }
]

export function cropImage(
  src?: string,
  width = 0,
  height = 0,
  devicePixelRatio?: number
): string | undefined {
  if (isValid(src) && isURL(src!)) {
    if (devicePixelRatio && devicePixelRatio >= 1) {
      width = Math.ceil(width * devicePixelRatio)
      height = Math.ceil(height * devicePixelRatio)
    }

    for (const rule of rules) {
      if (rule.match.test(src!)) {
        return rule.handler(src!, width, height)
      }
    }

    return src
  }
}

import { isValid, isValidArray, qs } from '@nily/utils'
import isURL from 'validator/lib/isURL'

const rules = [
  {
    url: process.env.NEXT_PUBLIC_STORAGE_URI,
    handler(src: string, width: number, height: number) {
      const matches = src.match(/(\.[^.\-_]+)$/)
      const ext = matches ? matches[0] : ''
      const param: string[] = []

      if (width > 0) {
        param.push(`w${width}`)
      }

      if (height > 0) {
        param.push(`h${height}`)
      }

      if (isValidArray(param)) {
        return [src, ...param].join('_') + ext
      }

      return src
    }
  },
  {
    regex: /^https:\/\/images\.unsplash\.com/i,
    handler(src: string, width: number, height: number) {
      src = src!.replace(/&(w|h)=\d+/g, '')

      if (width === height) {
        src = src!.replace(/&fit=[^&]+/i, '&fit=crop')
      }

      const param: AnyMap<number> = {}

      if (width > 0) param.w = width
      if (height > 0) param.h = height

      return src + (src.includes('?') ? '&' : '?') + qs.stringify(param)
    }
  }
]

export function cropImage(src?: string, width = 0, height = 0, scale = 1.5): string | undefined {
  if (isValid(src) && isURL(src!)) {
    width = Math.ceil(width * scale)
    height = Math.ceil(height * scale)

    for (const rule of rules) {
      const isMatched = rule.regex ? rule.regex.test(src!) : src!.startsWith(rule.url as string)

      if (isMatched) {
        return rule.handler(src!, width, height)
      }
    }

    return src
  }
}

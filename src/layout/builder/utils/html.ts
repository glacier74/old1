import { isEmpty } from '@nily/utils'
import sanitizeHtml from 'sanitize-html'

const { allowedTags, allowedAttributes } = sanitizeHtml.defaults
const COLOR_REGEX = [
  /^#(0x)?[0-9a-f]+$/i,
  /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/
]

export function sanitizeHTML(html?: string) {
  if (isEmpty(html)) {
    return ''
  }

  return sanitizeHtml(html!, {
    allowedTags: [...allowedTags, 'strike'],
    allowedAttributes: {
      ...allowedAttributes,
      div: ['style'],
      p: ['style']
    },
    allowedStyles: {
      '*': {
        // Match HEX and RGB
        color: COLOR_REGEX,
        'background-color': COLOR_REGEX,
        'text-align': [/^left$/, /^right$/, /^center$/],
        // Match any number with px, em, or %
        'font-size': [/^\d+(?:px|em|%)$/]
      }
    }
  })
}

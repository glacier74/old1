import { isString, isValid, isValidArray } from '@nily/utils'
import { parse as html5Parse } from 'html5parser'
import { IAttribute } from 'html5parser/src/types'

interface HTMLWalkOptions {
  allowedTags?: string[]
  allowedAttributes?: string[]
  plain?: boolean
}

const ALLOWED_ATTRIBUTES = ['href', 'class', 'data-mention', 'contenteditable', 'style']
const ALLOWED_TAGS = ['text', 'span', 'bold', 'strong', 'code', 'a', 'b', 'i', 'u', 's', 'mention']

function getAttributes(row: IAttribute[], allowedAttributes: string[] = []): Record<string, any> {
  const result: Record<string, any> = {}

  if (isValidArray(row)) {
    row.forEach(a => {
      const name = a.name.value.toLowerCase()

      if (allowedAttributes.includes(name)) {
        result[name] = a.value?.value
      }
    })
  }

  return result
}

function walk(node: any, option: HTMLWalkOptions): any[] | string | undefined {
  let tag = (node.name || node.type).toLowerCase()

  if (option.allowedTags!.includes(tag)) {
    const text = node.value

    if (tag === 'text') {
      return text
    }

    let attributes = getAttributes(node.attributes, option.allowedAttributes)
    const mentionId = attributes['data-mention']

    if (tag === 'span' && isValid(mentionId)) {
      tag = 'mention'
      attributes = {
        id: mentionId
      }
    }

    const schema: any[] = [tag]

    if (isValidArray(node.body)) {
      const body = node.body!.map((child: any) => walk(child, option))

      if (isValidArray(body)) {
        schema.push(body)
      }
    }

    if (isValid(attributes)) {
      schema.push(attributes)
    }

    return schema
  }
}

function parse(html: string, option?: HTMLWalkOptions): any[] {
  const result = html5Parse(html)
  const customOption: HTMLWalkOptions = {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    ...option
  }

  return result.map(node => walk(node, customOption)).filter(Boolean)
}

function serialize(schemas?: any[], option?: HTMLWalkOptions): string {
  if (!isValidArray(schemas)) {
    return ''
  }

  const customOption: HTMLWalkOptions = {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    ...option
  }

  return schemas!
    .map(schema => {
      if (isString(schema)) {
        return schema
      }

      if (!isValidArray(schema)) {
        return ''
      }

      let [tag, attributes] = schema
      const [body] = schema

      if (!customOption.allowedTags!.includes(tag)) {
        return ''
      }

      if (customOption.plain) {
        return serialize(body!, customOption)
      }

      let property = ''

      if (isValid(attributes)) {
        if (tag === 'mention') {
          attributes = {
            class: 'mention',
            contenteditable: 'false',
            'data-mention': attributes.id
          }
        }

        property = Object.keys(attributes!)
          .filter(key => customOption.allowedAttributes!.includes(key))
          .map(key => ` ${key}="${attributes![key]}"`)
          .join('')
      }

      if (tag === 'mention') {
        tag = 'span'
      }

      return `<${tag}${property}>${serialize(body!, customOption)}</${tag}>`
    })
    .join('')
}

function plain(html: string, limit = 24) {
  let result = html
    .replace(/<style[^<>]*>((?!<\/).)*<\/style>/gi, '')
    .replace(/<script[^<>]*>((?!<\/).)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

  if (limit > 0) {
    result = result.slice(0, limit)

    if (result.length >= limit) {
      result += '...'
    }
  }

  return result
}

export const html = {
  parse,
  serialize,
  plain
}

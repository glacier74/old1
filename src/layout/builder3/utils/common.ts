import {
  isArray,
  isEmpty,
  isPlainObject,
  isTrue,
  isValid,
  isValidArray,
  objectPath
} from '@nily/utils'
import { nanoid } from 'nanoid'

import { SchemaTypeEnum } from '../constants'

const FORM_TYPES = [SchemaTypeEnum.contact, SchemaTypeEnum.emailCapture, SchemaTypeEnum.payment]

export function formOptionWalker(value: any) {
  const ipo = isPlainObject(value)

  if (!ipo && !isArray(value)) {
    return
  }

  let arr = value

  if (ipo) {
    if (FORM_TYPES.includes(value.type)) {
      if (!value.id) {
        value.id = nanoid(8)
      }

      return
    }

    arr = Object.values(value)
  }

  for (const row of arr) {
    formOptionWalker(row)
  }
}

export function schemasToOptions(schemas: AnyMap<any>[]) {
  const options = schemaConverter(schemas)
  const formDefaultValues: any[] = []

  formWalker(schemas, undefined, formDefaultValues)

  formDefaultValues.forEach(row => {
    const value = objectPath.get(options, row.name) as any

    objectPath.set(options, row.name, {
      type: row.type,
      // 兼容 schema v2
      blockId: row.name,
      ...value
    })
  })

  return options
}

export function schemasToDefaultOptions(
  schemas: AnyMap<any>[],
  parent: AnyMap<any> = {}
): AnyMap<any> {
  schemas.forEach(schema => {
    if (Array.isArray(schema.fields) && schema.type !== SchemaTypeEnum.list) {
      parent[schema.name] = schemasToDefaultOptions(schema.fields, {})
    } else {
      parent[schema.name] = schema.default
    }
  })

  return parent
}

function schemaConverter(schemas: AnyMap<any>[], parent: AnyMap<any> = {}): AnyMap<any> {
  schemas.forEach(schema => {
    if (Array.isArray(schema.fields)) {
      if (schema.type === SchemaTypeEnum.list) {
        parent[schema.name] = schema.default.map((r: any) => {
          // listSchemaConverter(schema.fields, r)

          return {
            id: nanoid(8),
            ...r
          }
        })
      } else {
        parent[schema.name] = schemaConverter(schema.fields, {})
      }
    } else {
      parent[schema.name] = schema.default
      // if (schema.ai) {
      //   parent[schema.name] = schema.type === SchemaTypeEnum.textList ? [] : ''
      // } else {
      //   parent[schema.name] = schema.default
      // }
    }
  })

  return parent
}

function listSchemaConverter(schemas: AnyMap<any>[], values: AnyMap<any> = {}) {
  schemas.forEach(schema => {
    if (Array.isArray(schema.fields)) {
      listSchemaConverter(schema.fields, values[schema.name])
    } else if (schema.ai) {
      values[schema.name] = schema.type === SchemaTypeEnum.textList ? [] : ''
    }
  })
}

function formWalker(schemas: any[], parentName: any, values: any[]) {
  schemas.forEach(schema => {
    const name = [parentName, schema.name].filter(Boolean).join('.')
    const schemaTypes = [SchemaTypeEnum.emailCapture, SchemaTypeEnum.payment]

    if (schemaTypes.includes(schema.type)) {
      values.push({
        type: schema.type,
        name
      })
    } else if (schema.fields) {
      if (schema.type === SchemaTypeEnum.list) {
        if (isValid(schema.fields)) {
          schema.default.forEach((_: any, index: number) => {
            formWalker(schema.fields, [name, index].join('.'), values)
          })
        }
      } else {
        formWalker(schema.fields, name, values)
      }
    }
  })
}

export function schemasToCompletions(schemas: any[], parent?: any) {
  return schemas
    .map(schema => {
      if (!schema.ai && isEmpty(schema.fields)) {
        return null
      }

      let count = 1

      if (schema.type === SchemaTypeEnum.list || schema.type === SchemaTypeEnum.textList) {
        count = schema.default?.length || parent?.default[schema.name]?.length
      }

      const result: AnyMap<any> = {
        name: schema.name,
        type: schema.type,
        title: schema.title,
        count: count || 1,
        ai: isTrue(schema.ai),
        maxWords: schema.max_words
      }

      if (isValidArray(schema.fields)) {
        result.fields = schemasToCompletions(schema.fields, schema)
      }

      if (!schema.ai && isEmpty(result.fields)) {
        return null
      }

      return result
    })
    .filter(Boolean)
}

export function schemaFieldsToValue(fields: any[]): any {
  return fields.reduce(
    (prev: any, next: any) => {
      switch (next.type) {
        case SchemaTypeEnum.textList:
          return {
            ...prev,
            [next.name]: []
          }

        case SchemaTypeEnum.emailCapture:
        case SchemaTypeEnum.payment:
          // Add type to form
          return {
            ...prev,
            [next.name]: {
              type: next.type,
              ...schemaFieldsToValue(next.fields)
            }
          }

        default:
          return { ...prev, [next.name]: null }
      }
    },
    {
      id: nanoid(8)
    }
  )
}

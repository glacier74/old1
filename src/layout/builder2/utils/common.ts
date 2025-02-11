import { isEmpty, isValid } from '@nily/utils'
import { v4 } from 'uuid'

export function decamelize(camelCaseString: string) {
  return camelCaseString.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export function getObjectPath(...paths: any[]) {
  return paths.filter(isValid).join('.')
}

function schemaToSetting(schema: any, isNewListChild: boolean) {
  const setting = {
    type: schema.type,
    ...schema.default
  }

  // A unique ID for sorting or deleting to avoid conflicting issues
  if (isEmpty(setting.id)) {
    setting.id = v4()
  }

  if (isNewListChild) {
    if (setting.type === 'text' || setting.type === 'html') {
      setting.html = ''
    }
  }

  return setting
}

export function getBlockSetting(schemas: any, isNewListChild = false) {
  return schemas.reduce(
    (prev: any, curr: any) => {
      let setting = isValid(curr.name)
        ? {
            [curr.name]: schemaToSetting(curr, isNewListChild)
          }
        : schemaToSetting(curr, isNewListChild)

      if (curr.type === 'schema_group' || curr.type === 'schema_link') {
        const children = curr.children

        if (isValid(children)) {
          const groupSetting = {
            ...schemaToSetting(curr, isNewListChild),
            ...getBlockSetting(children, isNewListChild)
          }

          if (curr.name) {
            setting[curr.name] = groupSetting
          } else {
            setting = groupSetting
          }
        }
      } else if (curr.type === 'schema_list') {
        const children = curr.children

        if (isValid(children)) {
          setting[curr.name] = children.map((c: any) => ({
            id: v4(),
            ...getBlockSetting([c], isNewListChild)
          }))
        }
      }

      return { ...prev, ...setting }
    },
    {
      id: v4()
    }
  )
}

export function createListChildSetting(schema: any) {
  const setting = getBlockSetting([schema.children[0] as any], true)

  switch (setting.type) {
    case 'button':
      delete setting.icon
      delete setting.text
      delete setting.url
      setting.isInNewTab = false
      break

    case 'link':
      delete setting.text
      delete setting.url
      break

    case 'icon':
      delete setting.src
      delete setting.name
      delete setting.text
      break

    case 'image':
    case 'video':
      delete setting.src
      delete setting.alt
      break

    case 'text':
    case 'html':
      delete setting.html
      break
  }

  return setting
}

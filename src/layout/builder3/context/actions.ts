import { deepClone, objectPath, type } from '@nily/utils'

export interface IState {
  isBuilderMode: boolean
  options: AnyMap<any>
  version: number

  isSyncing: boolean
  lastSyncedAt: number

  // AI
  completions: any[]
  selectedCompletionName?: string
  selectedCompletionTitle?: string

  // List
  selectedListId?: string

  // Jingle Bio
  selectedSection?: {
    type: 'section' | 'widget' | 'add-widget'
    name?: string
    id?: string
  }
  widgetIds: string[]

  // Preview anchor link
  selectedOptionName?: string

  // View the desktop or mobile version of the landing page
  previewMode: 'desktop' | 'tablet' | 'mobile'
}

export interface UpdateStateAction {
  type: 'updateState'
  payload: Partial<IState>
}

export interface UpdateOptionsAction {
  type: 'updateOptions'
  payload: {
    options: any
  }
}

export function updateState(state: IState, updates: UpdateStateAction['payload']): IState {
  return {
    ...state,
    ...updates
  }
}

const BASIC_TYPES = ['string', 'number', 'boolean', 'undefined']
const OLD_TYPES = [...BASIC_TYPES, 'undefined']

function isSameType(oldValue: any, newValue: any) {
  const oldType = type(oldValue)
  const newType = type(newValue)

  return (
    oldType === newType ||
    (BASIC_TYPES.includes(oldType) && BASIC_TYPES.includes(newType)) ||
    (OLD_TYPES.includes(newType) && BASIC_TYPES.includes(oldType))
  )
}

export function updateOptions(state: IState, { options }: UpdateOptionsAction['payload']): IState {
  Object.keys(options).forEach(key => {
    const oldValue = objectPath.get(state.options, key)
    const newValue = options[key]

    if (isSameType(oldValue, newValue)) {
      objectPath.set(state.options, key, options[key])
    }
  })

  return {
    ...state,
    options: deepClone(state.options)
  }
}

import { widgetListPath } from '@earlybirdim/components/WidgetList/constants'
import { parseURL } from '@earlybirdim/components/utils'
import { useMemo } from 'react'

import { WIDGET_URL_PROVIDERS } from '~/layout/builder3/constants'
import { useBuilderContext, useOptions } from '~/layout/builder3/context'

import { OptionsContainer } from '../OptionsContainer'
import { WidgetItemOption } from './WidgetItemOption'

export const WidgetOptions = () => {
  const { state } = useBuilderContext()
  const { value: listValue } = useOptions<AnyMap<any>[]>(widgetListPath, [])

  const index = useMemo(
    () => listValue.findIndex(v => v.id === state.selectedSection!.id),
    [listValue, state.selectedSection]
  )
  const value = useMemo(
    () => listValue.find(v => v.id === state.selectedSection!.id),
    [listValue, state.selectedSection]
  )

  const customURL = useMemo(() => parseURL(value?.url, value?.type), [value?.type, value?.url])

  return (
    <OptionsContainer title={WIDGET_URL_PROVIDERS[customURL.provider]}>
      <WidgetItemOption parentName={widgetListPath} index={index} provider={customURL.provider} />
    </OptionsContainer>
  )
}

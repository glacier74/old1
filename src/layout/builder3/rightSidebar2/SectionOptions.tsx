import { useMemo } from 'react'

import { useStore } from '~/store'

import { SchemaTypeEnum } from '../constants'
import { useBuilderContext } from '../context'
import { Option } from '../rightSidebar/OptionGroup'
import templates from '../templates'
import { OptionsContainer } from './OptionsContainer'

export const SectionOptions = () => {
  const { state, dispatch } = useBuilderContext()
  const { siteSettings } = useStore()

  const schema = useMemo(
    () =>
      templates[siteSettings.template]?.schemas.find(
        (s: any) => s.name === state.selectedSection!.name
      ),
    [siteSettings.template, state.selectedSection]
  )

  function handleClose() {
    dispatch({
      type: 'updateState',
      payload: {
        selectedSection: undefined
      }
    })
  }

  if (!schema) {
    return null
  }

  return (
    <OptionsContainer title={schema.title}>
      <div className="px-5">
        {schema.type === SchemaTypeEnum.list ? (
          <Option schema={schema} />
        ) : (
          schema.fields.map((child: any) => (
            <Option key={child.name} parentName={schema.name} schema={child} />
          ))
        )}
      </div>
    </OptionsContainer>
  )
}

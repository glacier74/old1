import { Checkbox } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import { FC, useCallback, useContext } from 'react'

import { AIStoreContext } from '~/layout/builder3/ai/context'
import { useBuilderContext } from '~/layout/builder3/context'

import { AIContainer } from './AIContainer'

interface SectionItemProps {
  completion: AnyMap<any>
  isChecked?: boolean
  onChange: (isChecked: boolean, value: string) => void
}

const SectionItem: FC<SectionItemProps> = ({ completion, isChecked, onChange }) => {
  return (
    <div className="relative flex items-start py-4">
      <div className="min-w-0 flex-1 text-sm leading-6">
        <label htmlFor={completion.name} className="select-none font-medium text-slate-900">
          {completion.title}
        </label>
      </div>
      <div className="ml-3 flex h-6 items-center">
        <Checkbox
          id={completion.name}
          className="h-4 w-4 rounded border-slate-300 text-emerald-600"
          checked={isChecked}
          value={completion.name}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export const AISections = () => {
  const { state: builderState } = useBuilderContext()
  const { state, dispatch } = useContext(AIStoreContext)

  const handleChange = useCallback(
    (isChecked: boolean, value: string) => {
      dispatch({
        type: 'setState',
        payload: {
          sections: isChecked ? [...state.sections, value] : state.sections.filter(s => s !== value)
        }
      })
    },
    [state.sections]
  )

  return (
    <AIContainer isNextButtonDisabled={isEmpty(state.sections)}>
      <div className="space-y-6 text-sm text-slate-700">
        <h2 className="text-2xl leading-6 font-bold text-slate-900">Select sections</h2>

        <div>
          <div className="text-base font-semibold leading-6 text-slate-900">Sections</div>
          <div className="h-[320px] scrollbar">
            <div className="mt-4 -mr-6 pr-6 divide-y divide-slate-200 border-b border-t border-slate-200">
              {builderState.completions.map(completion => (
                <SectionItem
                  key={completion.name}
                  completion={completion}
                  isChecked={state.sections.includes(completion.name)}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AIContainer>
  )
}

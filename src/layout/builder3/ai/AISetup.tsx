import clsx from 'clsx'
import { FC, useCallback, useContext, useState } from 'react'

import { AIContainer } from './AIContainer'
import { AIStoreContext } from './context'

interface AIRatioItemProps {
  title: string
  description: string
  isChecked?: boolean
  value: string
  onChange: (value: string) => void
}

const AIRatioItem: FC<AIRatioItemProps> = ({ title, description, isChecked, value, onChange }) => {
  function handleChange() {
    onChange(value)
  }

  return (
    <label className="relative flex cursor-pointer p-4 focus:outline-none">
      <input
        type="radio"
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-emerald-600 border-slate-300 focus:ring-transparent"
        checked={isChecked}
        onChange={handleChange}
      />
      <div className="ml-3 flex flex-col text-sm">
        <div className={clsx('font-medium', isChecked ? 'text-emerald-700' : 'text-slate-900')}>
          {title}
        </div>
        <div className={clsx(isChecked ? 'text-emerald-700/80' : 'text-slate-500')}>
          {description}
        </div>
      </div>
    </label>
  )
}

const RATIO_OPTIONS = [
  {
    value: 'all',
    title: 'Entire page',
    description: 'Generate copy for all available sections of the entire page.'
  },
  {
    value: 'partial',
    title: 'Specific sections',
    description: 'Generate copy for your chosen sections in the following step.'
  }
]

export const AISetup = () => {
  const { state, dispatch } = useContext(AIStoreContext)
  const [sectionRange, setSectionRange] = useState(state.sectionRange)

  function handleChange(newValue: any) {
    setSectionRange(newValue)
  }

  const handleNext = useCallback(() => {
    dispatch({
      type: 'setSectionRange',
      payload: sectionRange
    })
  }, [sectionRange, state.steps])

  return (
    <AIContainer onNextButtonClick={handleNext}>
      <div className="text-sm text-slate-700">
        <h1 className="text-2xl leading-6 font-bold text-slate-900">
          Welcome to EarlyBird's AI Assistant!
        </h1>

        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <div>
              This is an innovative feature powered by cutting-edge AI technology, designed to help
              you create high-converting landing pages with ease.
            </div>
            <div>To get started, simply choose the option that best suits your needs:</div>
          </div>

          <div className="border rounded-md divide-y divide-slate-200">
            {RATIO_OPTIONS.map(row => (
              <AIRatioItem
                key={row.value}
                title={row.title}
                description={row.description}
                value={row.value}
                isChecked={sectionRange === row.value}
                onChange={handleChange}
              />
            ))}
          </div>

          <div>
            Remember, our AI assistant is here to guide you every step of the way in your landing
            page creation journey.
          </div>
        </div>
      </div>
    </AIContainer>
  )
}

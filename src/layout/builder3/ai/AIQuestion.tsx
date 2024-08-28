import { Input, Select } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import { FC, useContext, useMemo } from 'react'

import { AIContainer } from './AIContainer'
import { AIStoreContext } from './context'

export interface AIQuestionData {
  index: number
  question: string
  prompt: string
  type: 'select' | 'input' | 'textarea'
  options?: any[]
  description?: string
  rows?: number
  isLast?: boolean
}

interface AIQuestionProps {
  data: AIQuestionData
}

export const AIQuestion: FC<AIQuestionProps> = ({ data }) => {
  const { state, dispatch } = useContext(AIStoreContext)
  const value = useMemo(() => state.answers[data.index], [data.index, state.answers])

  function handleChange(newValue: any) {
    dispatch({
      type: 'setState',
      payload: {
        answers: state.answers.map((row, index) => (index === data.index ? newValue : row))
      }
    })
  }

  const children = useMemo(() => {
    switch (data.type) {
      case 'textarea':
        return (
          <Input.Textarea
            className="w-full"
            rows={data.rows}
            value={value}
            onChange={handleChange}
          />
        )

      case 'select':
        return (
          <Select className="w-full" options={data.options} value={value} onChange={handleChange} />
        )

      default:
        return <Input className="w-full" value={value} onChange={handleChange} />
    }
  }, [data.options, data.rows, data.type, value])

  function handleNext() {
    if (data.isLast) {
      return dispatch({
        type: 'setState',
        payload: {
          isGenerating: true
        }
      })
    }

    dispatch({
      type: 'toNext'
    })
  }

  return (
    <AIContainer isNextButtonDisabled={isEmpty(value)} onNextButtonClick={handleNext}>
      <div className="flex h-full items-center">
        <div className="w-full text-sm text-slate-700">
          <h2 className="text-xl leading-6 font-bold text-slate-900">{data.question}</h2>
          <p className="mt-3">{data.description}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </AIContainer>
  )
}

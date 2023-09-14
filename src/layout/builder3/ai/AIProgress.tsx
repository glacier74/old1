import { isEmpty } from '@nily/utils'
import party from 'party-js'
import { startTransition, useContext, useEffect, useMemo, useRef, useState } from 'react'

import { IconAI } from '~/components'
import { useBuilderContext, useMergeOptions } from '~/layout/builder3/context'
import { ProductService } from '~/service'
import { useStore } from '~/store'

import { AIStoreContext } from './context'

export const QUESTIONS = [
  {
    question: 'First of all, what kind of landing page are you creating?',
    prompt: 'Industry of my product/service',
    type: 'select',
    options: [
      { label: 'E-commerce', value: 'E-commerce' },
      { label: 'Service offering', value: 'Service offering' },
      { label: 'Fitness', value: 'Fitness' },
      { label: 'Health', value: 'Health' },
      { label: 'Travel', value: 'Travel' },
      { label: 'Event', value: 'Event' },
      { label: 'Financial', value: 'Financial' },
      { label: 'App download', value: 'App download' },
      { label: 'Food', value: 'Food' },
      { label: 'Restaurant', value: 'Restaurant' },
      { label: 'Lead generation', value: 'Lead generation' },
      { label: 'Ebook', value: 'Ebook' },
      { label: 'Online course', value: 'Online course' },
      { label: 'Non-profit donation', value: 'Non-profit donation' },
      { label: 'Job application', value: 'Job application' },
      { label: 'Pet care', value: 'Pet care' },
      { label: 'Education', value: 'Education' },
      { label: 'Fashion', value: 'Fashion' },
      { label: 'Clothing', value: 'Clothing' },
      { label: 'Technology', value: 'Technology' },
      { label: 'Wedding ', value: 'Wedding ' },
      { label: 'Automotive', value: 'Automotive' },
      { label: 'Dating', value: 'Dating' },
      { label: 'SaaS product', value: 'SaaS product' },
      { label: 'Software', value: 'Software' },
      { label: 'Hardware', value: 'Hardware' },
      { label: 'Matchmaking', value: 'Matchmaking' },
      { label: 'Legal services', value: 'Legal services' },
      { label: 'Gaming', value: 'Gaming' }
    ]
  },
  {
    question: 'What is the primary goal of your landing page?',
    prompt: 'Primary goal of my product/service',
    description:
      'Examples: "To sell a product", "To collect email addresses for a newsletter", "To provide information about a service", "To encourage downloads of an app".',
    type: 'input'
  },
  {
    question: 'Who is your target audience?',
    prompt: 'My target audience of my product/service',
    description:
      'Examples: "Small business owners", "Fitness enthusiasts", "Educators", "Teenagers interested in gaming".',
    type: 'input'
  },
  {
    question:
      'What is the unique selling proposition (USP) or key benefit of your product/service?',
    prompt: 'Unique selling proposition or key benefit of my product/service',
    description:
      'Examples: "Our fitness app provides personalized workout routines", "Our online course helps small business owners maximize their revenue".',
    type: 'textarea',
    rows: 4
  },
  {
    question: 'Do you have any specific style or tone preferences for your landing page copy?',
    prompt: 'Specific style or tone preferences for my landing page copy',
    description:
      'Examples: "Professional and authoritative", "Friendly and conversational", "Inspirational and motivational", "Informative and straightforward".',
    type: 'input',
    isLast: true
  }
]

export const AIProgress = () => {
  const { siteSettings, closeAIModal } = useStore()
  const { state: builderState, dispatch: builderDispatch } = useBuilderContext()
  const { state } = useContext(AIStoreContext)
  const mergeOptions = useMergeOptions()

  const completions = useMemo(() => {
    if (state.sectionRange === 'all') {
      return builderState.completions
    }

    return builderState.completions.filter(c => state.sections.includes(c.name))
  }, [builderState.completions, state.sectionRange, state.sections])

  const completionCount = completions.length

  const list = useRef(completions)
  const loadingRef = useRef(false)

  const needs = useMemo(
    () => QUESTIONS.map((q, index) => `${q.prompt}: ${state.answers[index]}`).join('\n'),
    [state.answers]
  )

  const [isFailed, setFailed] = useState(false)
  const [finishedCount, setFinishedCount] = useState(0)

  const percent = useMemo(
    () => (100 * finishedCount) / completionCount + '%',
    [completionCount, finishedCount]
  )

  async function handleCompletions() {
    if (loadingRef.current || list.current.length < 1) {
      return
    }

    setFailed(false)
    loadingRef.current = true

    const selected = list.current[0]

    builderDispatch({
      type: 'updateState',
      payload: {
        selectedCompletionName: selected.name,
        selectedCompletionTitle: selected.title
      }
    })

    await ProductService.completions(siteSettings.productId, selected, needs, {
      onMessage: data => {
        startTransition(() => {
          mergeOptions(selected.name, data[selected.name])
        })
      },
      onFinish: async (err?: string, data?: AnyMap<any>) => {
        loadingRef.current = false

        if (err) {
          return setFailed(true)
        }

        // Generating again if error occurred in GPT response.
        if (isEmpty(data) || isEmpty(data![selected.name])) {
          return setFailed(true)
        }

        // 删除第一个
        list.current.shift()
        setFinishedCount(f => f + 1)

        if (list.current.length > 0) {
          return setTimeout(() => {
            handleCompletions()
          }, 2_000)
        }

        party.confetti(document.querySelector('.ai-progress') as HTMLElement, {
          count: [40, 80],
          speed: [800, 1_600]
        })

        builderDispatch({
          type: 'updateState',
          payload: {
            selectedCompletionName: undefined,
            selectedCompletionTitle: undefined
          }
        })

        closeAIModal()
      }
    })
  }

  useEffect(() => {
    handleCompletions()
  }, [])

  return (
    <div className="ai-progress p-8 h-[525px]">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <IconAI className="w-[64px] h-[64px] text-emerald-600" />
        <div className="mt-[90px] text-sm text-slate-900">
          {isFailed ? (
            <>
              <span>Failed to generate copy for {builderState.selectedCompletionTitle}.</span>{' '}
              <button
                className="text-sm text-emerald-600 hover:text-emerald-700"
                onClick={handleCompletions}
              >
                Click here to retry
              </button>
            </>
          ) : (
            <span>Generating copy for {builderState.selectedCompletionTitle}</span>
          )}
        </div>
        <div className="mt-[16px] h-[6px] w-[240px] rounded-[3px] bg-slate-100">
          <div
            className="h-full rounded-[3px] bg-emerald-600"
            style={{
              width: percent
            }}
          />
        </div>
      </div>
    </div>
  )
}

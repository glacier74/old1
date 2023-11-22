import { arrayUnique, isFalse } from '@nily/utils'
import { useContext, useMemo, useReducer } from 'react'

import { ProductService } from '~/service'
import { useStore } from '~/store'
import { useAsyncEffect } from '~/utils'

import { StepInitial } from './StepInitial'
import { StepJingleBioProfile } from './StepJingleBioProfile'
import { StepJingleBioSocial } from './StepJingleBioSocial'
import { StepName } from './StepName'
import { StepTemplate } from './StepTemplate'
import { Step, StepsStoreContext, StepsStoreReducer } from './context'

export const PAGE_STEPS: Step[] = [
  {
    type: 'step',
    value: 'initial',
    isAllowToPrev: false
  },
  {
    type: 'landingPage',
    value: 'template',
    isNextButtonShow: false
  },
  {
    type: 'landingPage',
    value: 'name'
  },
  {
    type: 'bioPage',
    value: 'profile'
  },
  {
    type: 'bioPage',
    value: 'social'
  }
]

const StepComponent = () => {
  const { state } = useContext(StepsStoreContext)

  switch (state.active) {
    case 'initial':
      return <StepInitial />

    case 'template':
      return <StepTemplate />

    case 'name':
      return <StepName />

    case 'profile':
      return <StepJingleBioProfile />

    case 'social':
      return <StepJingleBioSocial />

    default:
      return null
  }
}

export const Steps = () => {
  const { user } = useStore()

  const type = useMemo(() => (user.isJingleBio ? 'bioPage' : 'landingPage'), [user.isJingleBio])
  const steps = useMemo(() => {
    if (user.isJingleBio) {
      const steps = PAGE_STEPS.filter(s => s.type === 'bioPage')

      steps[0].isAllowToPrev = false
      return steps
    }

    return PAGE_STEPS.filter(s => s.type !== 'bioPage')
  }, [user.isJingleBio])

  const [state, dispatch] = useReducer(StepsStoreReducer, {
    templates: [],
    categories: [],
    steps: steps.map((s: any) => ({
      value: s.value,
      isAllowToPrev: !isFalse(s.isAllowToPrev),
      isNextButtonShow: !isFalse(s.isNextButtonShow)
    })),
    type,
    active: steps[0].value
  })
  const storeValue = useMemo(() => ({ state, dispatch }), [state])

  useAsyncEffect(async () => {
    dispatch({
      type: 'setState',
      payload: {
        isTemplateLoading: true
      }
    })

    const templates = await ProductService.templates()
    const categories = arrayUnique(templates.map(t => t.categoryId))

    dispatch({
      type: 'setState',
      payload: {
        templates,
        categories,
        isTemplateLoading: false
      }
    })
  }, [])

  return (
    <StepsStoreContext.Provider value={storeValue}>
      <StepComponent />
    </StepsStoreContext.Provider>
  )
}

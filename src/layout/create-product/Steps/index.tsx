import { arrayUnique, isFalse } from '@nily/utils'
import { useContext, useEffect, useMemo, useReducer } from 'react'

import { ProductService } from '~/service'
import { useStore } from '~/store'
import { useAsyncEffect } from '~/utils'

import { StepInitial } from './StepInitial'
import { StepName } from './StepName'
import { StepTemplate } from './StepTemplate'
import { StepsStoreContext, StepsStoreReducer } from './context'

const STEPS = [
  {
    value: 'initial',
    component: StepInitial,
    isAllowToPrev: false
  },
  {
    value: 'template',
    component: StepTemplate,
    isAllowToPrev: false,
    isNextButtonShow: false
  },
  {
    value: 'name',
    component: StepName
  }
]

const StepComponent = () => {
  const { state } = useContext(StepsStoreContext)

  return useMemo(() => {
    const Component = STEPS.find(s => s.value === state.active)?.component

    if (Component) {
      return <Component />
    }

    return null
  }, [state.active])
}

export const Steps = () => {
  const { setProduct } = useStore()

  const [state, dispatch] = useReducer(StepsStoreReducer, {
    templates: [],
    categories: [],
    steps: STEPS.map((s: any) => ({
      value: s.value,
      isAllowToPrev: !isFalse(s.isAllowToPrev),
      isNextButtonShow: !isFalse(s.isNextButtonShow)
    })),
    active: STEPS[0].value
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

  useEffect(() => {
    return () => {
      setProduct(undefined)
    }
  }, [])

  return (
    <StepsStoreContext.Provider value={storeValue}>
      <StepComponent />
    </StepsStoreContext.Provider>
  )
}

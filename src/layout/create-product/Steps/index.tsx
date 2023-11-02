import { arrayUnique, isFalse } from '@nily/utils'
import { useContext, useEffect, useMemo, useReducer } from 'react'

import { StepJingleBio } from '~/layout/create-product/Steps/StepJingleBio'
import { ProductService } from '~/service'
import { useStore } from '~/store'
import { useAsyncEffect } from '~/utils'

import { StepInitial } from './StepInitial'
import { StepName } from './StepName'
import { StepTemplate } from './StepTemplate'
import { StepsStoreContext, StepsStoreReducer } from './context'

export const LANDING_PAGE_STEPS = [
  {
    value: 'initial',
    component: StepInitial,
    isAllowToPrev: false
  },
  {
    value: 'template',
    component: StepTemplate,
    isNextButtonShow: false
  },
  {
    value: 'name',
    component: StepName
  }
]

export const BIO_PAGE_STEPS = [
  {
    value: 'initial',
    component: StepInitial,
    isAllowToPrev: false
  },
  {
    value: 'jingleBio',
    component: StepJingleBio
  }
]

const StepComponent = () => {
  const { state } = useContext(StepsStoreContext)
  const { user } = useStore()

  if (user.isJingleBio) {
    return <StepJingleBio />
  }

  const Component = (state.type === 'landingPage' ? LANDING_PAGE_STEPS : BIO_PAGE_STEPS).find(
    s => s.value === state.active
  )?.component

  if (Component) {
    return <Component />
  }

  return null
}

export const Steps = () => {
  const { setProduct } = useStore()

  const [state, dispatch] = useReducer(StepsStoreReducer, {
    templates: [],
    categories: [],
    steps: LANDING_PAGE_STEPS.map((s: any) => ({
      value: s.value,
      isAllowToPrev: !isFalse(s.isAllowToPrev),
      isNextButtonShow: !isFalse(s.isNextButtonShow)
    })),
    type: 'landingPage',
    active: LANDING_PAGE_STEPS[0].value
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

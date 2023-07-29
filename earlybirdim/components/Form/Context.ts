import { useContext } from 'react'

import { createIContext, createIReducer } from '../Context'
import { FormState } from './FormProps'

const actions = {
  setLoading(state: FormState, loading: boolean): FormState {
    return {
      ...state,
      loading
    }
  },

  setErrorMessage(state: FormState, errorMessage?: string): FormState {
    return {
      ...state,
      errorMessage
    }
  }
}

export const FormContext = createIContext<FormState>({} as FormState)

export const useFormContext = () => {
  return useContext(FormContext)
}

export const FormReducer = createIReducer<FormState>(actions, (_, newState) => {
  return newState
})

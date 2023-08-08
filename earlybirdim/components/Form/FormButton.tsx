import clsx from 'clsx'
import { FC } from 'react'

import Spin from '../Spin/Spin'
import { useFormContext } from './Context'
import { FormButtonProps } from './FormProps'

const FormButton: FC<FormButtonProps> = ({ rootClassName, children, ...restProps }) => {
  const { state } = useFormContext()

  return (
    <div className={clsx('relative', rootClassName)}>
      <button type="submit" {...restProps}>
        <span
          className={clsx({
            'opacity-0': state.loading
          })}
        >
          {children}
        </span>
        {state.loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Spin className="w-7 h-7" />
          </span>
        )}
      </button>
    </div>
  )
}

export default FormButton

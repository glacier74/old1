import { isFunction } from '@nily/utils'
import { FC, useState } from 'react'

interface $ConditionProps {
  isActive?: boolean
  children: (isActive: boolean, toggle: () => void) => JSX.Element
}

export const $Condition: FC<$ConditionProps> = ({ isActive: rawIsActive = false, children }) => {
  const [isActive, setActive] = useState(rawIsActive)

  function toggle() {
    setActive(isActive => !isActive)
  }

  if (!isFunction(children)) {
    throw new Error('The child of Condition must be a function')
  }

  return children(isActive, toggle)
}

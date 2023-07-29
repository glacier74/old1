import { FC, useState } from 'react'

import { ToggleProps } from './ToggleProps'

const Toggle: FC<ToggleProps> = ({ isActive: rawIsActive = false, children }) => {
  const [isActive, setActive] = useState(rawIsActive)

  function toggle() {
    setActive(x => !x)
  }

  return children(isActive, toggle)
}

export default Toggle

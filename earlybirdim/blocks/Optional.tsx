import { FC } from 'react'

interface $OptionalProps extends ComponentProps {
  show?: boolean
}

export const $Optional: FC<$OptionalProps> = ({ show = true, children }) => {
  return (show ? children : null) as any
}

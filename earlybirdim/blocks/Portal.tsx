import { FC, ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps {
  visible?: boolean
  container?: HTMLElement
  children: ReactNode
}

export const Portal: FC<PortalProps> = ({ visible, container, children }) => {
  const [isMounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (isMounted && visible && children) {
    return createPortal(children, container || document.body)
  }

  return null
}

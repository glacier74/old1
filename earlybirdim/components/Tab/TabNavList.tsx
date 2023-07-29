import toArray from 'rc-util/lib/Children/toArray'
import { FC, ReactNode, cloneElement, useMemo } from 'react'

const TabNavList: FC<ComponentProps> = ({ children, ...restProps }) => {
  const items = useMemo(
    () =>
      toArray(children).map<ReactNode>(child =>
        cloneElement(child, {
          ...child.props,
          _key: child.key
        })
      ),
    [children]
  )

  return (
    <div role="tablist" {...restProps}>
      {items}
    </div>
  )
}

export default TabNavList

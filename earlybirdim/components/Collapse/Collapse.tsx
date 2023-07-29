import toArray from 'rc-util/lib/Children/toArray'
import { FC, ReactNode, cloneElement, useMemo, useReducer } from 'react'

import CollapseItem from './CollapseItem'
import { CollapseProps } from './CollapseProps'
import { CollapseContext, CollapseReducer } from './Context'

const Collapse: FC<CollapseProps> = ({ as: Tag = 'ul', accordion, children, ...restProps }) => {
  const [state, dispatch] = useReducer(CollapseReducer, {
    accordion,
    activeKeys: new Set<string>()
  })
  const value = useMemo(
    () => ({
      state,
      dispatch
    }),
    [state]
  )

  const items = useMemo(
    () =>
      toArray(children).map<ReactNode>((child, index) =>
        cloneElement(child, {
          ...child.props,
          _key: child.key ?? String(index)
        })
      ),
    [children]
  )

  return (
    <CollapseContext.Provider value={value}>
      <Tag {...restProps}>{items}</Tag>
    </CollapseContext.Provider>
  )
}

export default Object.assign(Collapse, {
  Item: CollapseItem
})

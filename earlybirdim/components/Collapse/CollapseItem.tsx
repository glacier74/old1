import { FC, useCallback, useEffect, useMemo } from 'react'

import { CollapseItemProps } from './CollapseProps'
import { useCollapseContext } from './Context'

const CollapseItem: FC<CollapseItemProps & SharedProps> = ({ _key, expanded, children }) => {
  const { state, dispatch } = useCollapseContext()
  const isExpanded = useMemo(() => state.activeKeys.has(_key), [_key, state.activeKeys])

  const toggle = useCallback(() => {
    dispatch({
      type: isExpanded ? 'close' : 'open',
      payload: _key
    })
  }, [_key, dispatch, isExpanded])

  useEffect(() => {
    if (expanded) {
      dispatch({
        type: 'open',
        payload: expanded
      })
    }
  }, [dispatch, expanded])

  return children(isExpanded, toggle)
}

export default CollapseItem as FC<CollapseItemProps>

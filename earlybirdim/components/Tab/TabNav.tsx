import { FC, useCallback, useMemo } from 'react'

import { useTabContext } from './Context'
import { TabNavProps } from './TabProps'

const TabNav: FC<TabNavProps & SharedProps> = ({ _key, children }) => {
  const { state, dispatch } = useTabContext()
  const isSelected = useMemo(() => state.activeKey === _key, [_key, state.activeKey])

  const select = useCallback(() => {
    dispatch({
      type: 'setActiveKey',
      payload: _key
    })
  }, [_key, dispatch])

  return children(isSelected, select)
}

export default TabNav as FC<TabNavProps>

import { FC, useMemo, useReducer } from 'react'

import { TabContext, TabReducer } from './Context'
import TabNav from './TabNav'
import TabNavList from './TabNavList'
import TabPanel from './TabPanel'
import { TabProps } from './TabProps'

const Tab: FC<TabProps> = ({ defaultActiveKey, children }) => {
  const [state, dispatch] = useReducer(TabReducer, {
    activeKey: defaultActiveKey
  })
  const value = useMemo(
    () => ({
      state,
      dispatch
    }),
    [state]
  )

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>
}

export default Object.assign(Tab, {
  NavList: TabNavList,
  Nav: TabNav,
  Panel: TabPanel
})

import { FC } from 'react'

import { useTabContext } from './Context'
import { TabPanelProps } from './TabProps'

const TabPanel: FC<TabPanelProps> = ({ children }) => {
  const { state } = useTabContext()

  return children(state.activeKey!)
}

export default TabPanel

import { ReactNode } from 'react'

export interface TabState {
  activeKey?: string
}

export interface TabProps {
  defaultActiveKey?: string
  children: ReactNode
}

export interface TabNavProps {
  children: (isSelected: boolean, select: () => void) => JSX.Element
}

export interface TabPanelProps {
  children: (key: string) => JSX.Element
}

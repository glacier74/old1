export interface CollapseState {
  accordion?: boolean
  activeKeys: Set<string>
}

export interface CollapseProps extends ComponentProps {
  as?: any
  accordion?: boolean
}

export interface CollapseItemProps {
  collapsible?: boolean
  expanded: boolean
  children: (isExpanded: boolean, toggle: () => void) => JSX.Element
}

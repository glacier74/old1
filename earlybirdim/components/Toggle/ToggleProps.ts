export interface ToggleProps {
  isActive?: boolean
  children: (isActive: boolean, toggle: () => void) => JSX.Element
}

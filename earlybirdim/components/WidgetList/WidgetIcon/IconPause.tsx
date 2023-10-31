import { FC, SVGProps } from 'react'

export const IconPause: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 13 13"
      role="img"
      aria-label="pause"
      {...props}
    >
      <rect width="3" height="12" x="1.5" y="0.5" rx="1" fill="currentColor" />
      <rect width="3" height="12" x="8.5" y="0.5" rx="1" fill="currentColor" />
    </svg>
  )
}

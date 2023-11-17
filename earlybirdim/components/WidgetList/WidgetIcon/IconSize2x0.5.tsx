import { FC, SVGProps } from 'react'

export const IconSize2x05: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="0.75"
        y="7.75"
        width="18.5"
        height="3.5"
        rx="1.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

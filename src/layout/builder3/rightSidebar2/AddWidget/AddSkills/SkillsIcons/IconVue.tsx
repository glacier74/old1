import { FC, SVGProps } from 'react'

export const IconVue: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="vue"
      {...props}
    >
      <g clipPath="url(#clip0_14_15)">
        <path
          d="M12 0H4C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0Z"
          fill="white"
        />
        <path d="M3 4L8 12.5714L13 4H11.0357L8 9.17857L4.96429 4H3Z" fill="#41B883" />
        <path
          d="M4.96428 4L7.99999 9.17857L11.0357 4H9.24999L8.02331 6.14736L6.74999 4H4.96428Z"
          fill="#35495E"
        />
      </g>
      <defs>
        <clipPath id="clip0_14_15">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

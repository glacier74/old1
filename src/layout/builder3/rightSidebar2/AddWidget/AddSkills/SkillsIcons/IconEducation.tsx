import { FC, SVGProps } from 'react'

export const IconEducation: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="education"
      {...props}
    >
      <g clipPath="url(#clip0_46_17)">
        <path
          d="M12 0H4C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0Z"
          fill="#10B981"
        />
        <path d="M13 7L8 5L3 7L8 9L13 7V10Z" fill="white" />
        <path
          d="M13 7L8 5L3 7L8 9L13 7ZM13 7V10"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 8V10.7C5 11.0978 5.31607 11.4794 5.87868 11.7607C6.44129 12.042 7.20435 12.2 8 12.2C8.79565 12.2 9.55871 12.042 10.1213 11.7607C10.6839 11.4794 11 11.0978 11 10.7V8"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_46_17">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

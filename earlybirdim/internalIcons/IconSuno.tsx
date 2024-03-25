import { FC, SVGProps } from 'react'

export const IconSuno: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_333_2)">
        <path
          d="M12 0H4C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0Z"
          fill="#1A202C"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.875 3C11.6009 3 13 5.23858 13 8H9.25C9.25 10.7614 7.85089 13 6.125 13C4.39911 13 3 10.7614 3 8H6.75C6.75 5.23858 8.14911 3 9.875 3Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_333_2">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

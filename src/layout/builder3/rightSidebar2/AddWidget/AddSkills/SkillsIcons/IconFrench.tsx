import { FC, SVGProps } from 'react'

export const IconFrench: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="french"
      {...props}
    >
      <g clipPath="url(#clip0_36_83)">
        <path
          d="M12 0H4C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0Z"
          fill="white"
        />
        <path
          d="M8 13C10.7614 13 13 10.7614 13 8C13 5.23858 10.7614 3 8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13Z"
          fill="#F0F0F0"
        />
        <path
          d="M13 8C13 5.85018 11.6431 4.01746 9.73912 3.311V12.689C11.6431 11.9825 13 10.1498 13 8Z"
          fill="#D80027"
        />
        <path
          d="M3 8C3 10.1498 4.35689 11.9825 6.26088 12.689V3.311C4.35689 4.01746 3 5.85018 3 8Z"
          fill="#0052B4"
        />
      </g>
      <defs>
        <clipPath id="clip0_36_83">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

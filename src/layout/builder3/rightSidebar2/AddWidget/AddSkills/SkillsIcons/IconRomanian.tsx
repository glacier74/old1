import { FC, SVGProps } from 'react'

export const IconRomanian: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="romanian"
      {...props}
    >
      <g clipPath="url(#clip0_36_99)">
        <path
          d="M12 0H4C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0Z"
          fill="white"
        />
        <path
          d="M9.73912 3.31098C9.19744 3.11002 8.6116 3 8 3C7.3884 2.99998 6.80254 3.11002 6.26088 3.31098L5.82609 7.99998L6.26088 12.689C6.80252 12.89 7.38838 13 8 13C8.61158 13 9.19746 12.89 9.73912 12.689L10.1739 8L9.73912 3.31098Z"
          fill="#FFDA44"
        />
        <path
          d="M13 8C13 5.8502 11.6431 4.01744 9.73912 3.311V12.689C11.6431 11.9825 13 10.1498 13 8Z"
          fill="#D80027"
        />
        <path
          d="M3 7.99998C3 10.1498 4.35688 11.9825 6.26084 12.689L6.26086 3.31102C4.35687 4.01746 3 5.85016 3 7.99998Z"
          fill="#0052B4"
        />
      </g>
      <defs>
        <clipPath id="clip0_36_99">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

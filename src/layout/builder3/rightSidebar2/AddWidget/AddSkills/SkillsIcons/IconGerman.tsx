import { FC, SVGProps } from 'react'

export const IconGerman: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="german"
      {...props}
    >
      <g clipPath="url(#clip0_36_85)">
        <path
          d="M12 0H4C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0Z"
          fill="white"
        />
        <path
          d="M3.311 9.73912C4.01746 11.6431 5.85018 13 8 13C10.1498 13 11.9825 11.6431 12.689 9.73912L8 9.30436L3.311 9.73912Z"
          fill="#FFDA44"
        />
        <path
          d="M8 3C5.85018 3 4.01746 4.35688 3.311 6.26088L8 6.69564L12.689 6.26086C11.9825 4.35687 10.1498 3 8 3Z"
          fill="black"
        />
        <path
          d="M3.311 6.26088C3.11002 6.80254 3 7.3884 3 8C3 8.6116 3.11002 9.19746 3.311 9.73912H12.689C12.89 9.19746 13 8.6116 13 8C13 7.3884 12.89 6.80252 12.689 6.26086L3.311 6.26088Z"
          fill="#D80027"
        />
      </g>
      <defs>
        <clipPath id="clip0_36_85">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

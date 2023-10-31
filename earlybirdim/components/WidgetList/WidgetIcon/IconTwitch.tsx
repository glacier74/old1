import { FC, SVGProps } from 'react'

export const IconTwitch: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="twitch"
      {...props}
    >
      <g clipPath="url(#clip0_2936_96)">
        <path
          d="M12 0H4C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0Z"
          fill="#65459B"
        />
        <path
          d="M10.1046 11.5979H8.20971L6.94755 12.8H5.68539V11.5979H3.37085V5.20081L4.00031 3.60001H12.6289V9.19973L10.1046 11.5979ZM11.7897 8.80109V4.40041H4.84283V10.1995H6.73771V11.3985L7.99991 10.1995H10.3144L11.7897 8.80109Z"
          fill="white"
          fillRule="evenodd"
          clipRule="evenodd"
        />
        <path
          d="M9.47215 6.00121V8.40241H10.3147V6.00121H9.47215ZM7.15759 8.39933H8.00015V6.00121H7.15759V8.39933Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_2936_96">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

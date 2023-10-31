import { FC, SVGProps } from 'react'

export const IconFacebook: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="facebook"
      {...props}
    >
      <g clipPath="url(#clip0_2937_126)">
        <path
          d="M12 0H4C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0Z"
          fill="url(#paint0_linear_2937_126)"
        />
        <path
          d="M10.0971 8.58255L10.3798 6.78641H8.61145V5.62136C8.61145 5.12986 8.85805 4.6505 9.65009 4.6505H10.4545V3.12136C10.4545 3.12136 9.72477 3 9.02741 3C7.57036 3 6.61895 3.86043 6.61895 5.41745V6.78641H5V8.58255H6.61895V12.9248C6.94395 12.9745 7.27645 13 7.61518 13C7.95391 13 8.28645 12.9745 8.61145 12.9248V8.58255H10.0971Z"
          fill="white"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2937_126"
          x1="8"
          y1="0"
          x2="8"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#18ACFE" />
          <stop offset="1" stopColor="#0163E0" />
        </linearGradient>
        <clipPath id="clip0_2937_126">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

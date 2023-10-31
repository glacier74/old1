import { FC, SVGProps } from 'react'

export const IconAppleMusic: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="apple-music"
      {...props}
    >
      <g clipPath="url(#clip0_2936_107)">
        <path
          d="M12 0H4C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0Z"
          fill="url(#paint0_linear_2936_107)"
        />
        <path
          d="M6.70964 10.8427V6.57901C6.70964 6.41913 6.79844 6.32145 6.97612 6.28589L10.6535 5.53977C10.8489 5.50421 10.9555 5.59305 10.9733 5.80625V9.05729C10.9733 9.32377 10.5736 9.50141 9.77412 9.59025C8.2552 9.83005 8.49504 12.3883 10.5736 11.6954C11.373 11.4023 11.5062 10.6295 11.5062 9.85673V3.62112C11.5062 3.62112 11.5062 3.08816 11.0532 3.2214L6.52308 4.15405C6.52308 4.15405 6.17668 4.20737 6.17668 4.63373V10.0433C6.17668 10.3097 5.77696 10.4874 4.97752 10.5762C3.45858 10.8161 3.6984 13.3743 5.77696 12.6814C6.5764 12.3883 6.70964 11.6155 6.70964 10.8427Z"
          fill="white"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2936_107"
          x1="8"
          y1="0"
          x2="8"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F46277" />
          <stop offset="1" stopColor="#FE253A" />
        </linearGradient>
        <clipPath id="clip0_2936_107">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

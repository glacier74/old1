import { FC, SVGProps } from 'react'

export const IconKotlin: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="kotlin"
      {...props}
    >
      <g clipPath="url(#clip0_14_145)">
        <path
          d="M12 0H4C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0Z"
          fill="white"
        />
        <path
          d="M3.5 4V13H12.5V12.9849L10.2661 10.7349L8.03214 8.48264L10.2661 6.22879L12.4801 4H3.5Z"
          fill="url(#paint0_linear_14_145)"
        />
        <path
          d="M8.10221 4L3.5 8.60221V13H3.53986L8.04243 8.49743L8.03246 8.48746L10.2661 6.23393L12.4801 4H8.10221Z"
          fill="url(#paint1_linear_14_145)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_14_145"
          x1="3.39959"
          y1="13.0887"
          x2="12.5095"
          y2="3.87711"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0296D8" />
          <stop offset="1" stopColor="#8371D9" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_14_145"
          x1="2.27986"
          y1="11.6535"
          x2="11.5988"
          y2="3.19138"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CB55C0" />
          <stop offset="1" stopColor="#F28E0E" />
        </linearGradient>
        <clipPath id="clip0_14_145">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

import { FC, SVGProps } from 'react'

export const IconEmailCapture: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="email-capture"
      {...props}
    >
      <g clipPath="url(#clip0_83_7)">
        <path
          d="M12 0H4C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0Z"
          fill="url(#paint0_linear_83_7)"
        />
        <path
          d="M13 5.76752V10.5C13 10.8826 12.8538 11.2508 12.5914 11.5291C12.3289 11.8075 11.9699 11.9751 11.588 11.9975L11.5 12H4.5C4.11739 12 3.74924 11.8539 3.47087 11.5914C3.1925 11.3289 3.02495 10.97 3.0025 10.588L3 10.5V5.76752L7.7225 8.91602L7.7805 8.94902C7.84885 8.98241 7.92392 8.99977 8 8.99977C8.07608 8.99977 8.15115 8.98241 8.2195 8.94902L8.2775 8.91602L13 5.76752Z"
          fill="white"
        />
        <path
          d="M11.5 4C12.04 4 12.5135 4.285 12.7775 4.7135L8 7.8985L3.2225 4.7135C3.34787 4.50988 3.52011 4.3392 3.72486 4.21569C3.9296 4.09218 4.16092 4.01943 4.3995 4.0035L4.5 4H11.5Z"
          fill="white"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_83_7"
          x1="0"
          y1="0"
          x2="10"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FABA22" />
          <stop offset="1" stopColor="#F5BC32" />
        </linearGradient>
        <clipPath id="clip0_83_7">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

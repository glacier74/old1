import { FC, SVGProps } from 'react'

export const IconSubstack: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="substack"
      {...props}
    >
      <g clipPath="url(#clip0_2937_198)">
        <path
          d="M12 0H4C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0Z"
          fill="#FF6719"
        />
        <path
          d="M3.75452 3.26337V4.38812H12.1347V3.26337H3.75452ZM3.75452 5.402V6.54256H12.1347V5.402H3.75452ZM3.75452 7.5406V12.7842C4.09702 12.6853 4.44114 12.4171 4.75254 12.2433L6.84362 11.0755C7.10254 10.931 7.36214 10.7876 7.61986 10.6411C7.7041 10.5932 7.84658 10.474 7.94582 10.4758C8.04358 10.4776 8.18558 10.5976 8.26938 10.6455C8.51074 10.7835 8.75434 10.9187 8.99806 11.0526C9.7349 11.4572 10.4632 11.8774 11.2001 12.2821C11.485 12.4386 11.8178 12.7116 12.1347 12.7842V7.5406H3.75452Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_2937_198">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

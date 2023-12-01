import { FC, SVGProps } from 'react'

export const IconAngular: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="angular"
      {...props}
    >
      <g clipPath="url(#clip0_14_3)">
        <path
          d="M12 0H4C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0Z"
          fill="white"
        />
        <path d="M3 4.66667L7.6875 3V13L3.72917 10.8125L3 4.66667Z" fill="#DE3641" />
        <path d="M7.6875 3L12.4792 4.64062L11.6979 10.7865L7.6875 13V3Z" fill="#B13138" />
        <path
          d="M7.68749 4.11978L10.7344 10.6302H9.6927L9.04166 9.14582H7.68749V8.26041H8.67707L7.68749 6.21353L6.85416 8.26041H7.68749V9.14582H6.44791L5.86457 10.6302H4.74478L7.68749 4.11978Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_14_3">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

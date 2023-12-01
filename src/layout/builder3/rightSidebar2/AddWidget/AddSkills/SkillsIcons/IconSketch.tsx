import { FC, SVGProps } from 'react'

export const IconSketch: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="sketch"
      {...props}
    >
      <g clipPath="url(#clip0_31_63)">
        <path
          d="M12 0H4C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0Z"
          fill="white"
        />
        <path
          d="M5.18181 4.28221L8 4L10.8182 4.28221L13 7.05643L8 12.5714L3 7.05643L5.18181 4.28221Z"
          fill="#FDB300"
          fillRule="evenodd"
          clipRule="evenodd"
        />
        <path
          d="M5.02523 7.05646L7.99996 12.5715L3 7.05646H5.02523ZM10.9748 7.05646L7.99996 12.5715L13 7.05646"
          fill="#EA6C00"
        />
        <path
          d="M5.02531 7.05646H10.9748L8.00006 12.5715"
          fill="#FDAD00"
          fillRule="evenodd"
          clipRule="evenodd"
        />
        <path
          d="M8.00006 4L5.18188 4.28216L5.02531 7.05639L8.00006 4ZM8.00006 4L10.8183 4.28216L10.9748 7.05639"
          fill="#FDD231"
        />
        <path
          d="M13 7.0564L10.8182 4.28217L10.9748 7.0564H13ZM3 7.0564L5.18179 4.28217L5.02523 7.0564"
          fill="#FDAD00"
        />
        <path
          d="M8.00006 4L5.02531 7.05639H10.9748"
          fill="#FEEEB7"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="clip0_31_63">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

import { FC, SVGProps } from 'react'

export const IconClaude: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="claude"
      {...props}
    >
      <g clipPath="url(#clip0_31_578)">
        <path
          d="M12 0H4C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0Z"
          fill="white"
        />
        <g clipPath="url(#clip1_31_578)">
          <path
            d="M10.9651 3H5.0349C3.91106 3 3 3.91853 3 5.0516V10.9484C3 12.0815 3.91106 13 5.0349 13H10.9651C12.0889 13 13 12.0815 13 10.9484V5.0516C13 3.91853 12.0889 3 10.9651 3Z"
            fill="#CC9B7A"
          />
          <path
            d="M9.22387 5.92552H8.37684L9.91887 10.0744L10.7659 10.0745L9.22387 5.92552ZM6.7761 5.92552L5.23407 10.0745H6.09843L6.4096 9.20324L8.02768 9.20316L8.34227 10.0745H9.20663L7.6612 5.92552H6.7761ZM6.69307 8.43218L7.21866 6.97318L7.74762 8.43218H6.69307Z"
            fill="#1F1F1E"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_31_578">
          <rect width="16" height="16" fill="white" />
        </clipPath>
        <clipPath id="clip1_31_578">
          <rect width="10" height="10" fill="white" transform="translate(3 3)" />
        </clipPath>
      </defs>
    </svg>
  )
}

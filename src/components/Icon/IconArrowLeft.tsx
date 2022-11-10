import { FC } from 'react'

export const IconArrowLeft: FC = props => {
  return (
    <svg width="10" height="24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9 1 1 12l8 11"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

import { FC } from 'react'

export const IconArrowRight: FC = props => {
  return (
    <svg width="10" height="24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m1 1 8 11-8 11"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

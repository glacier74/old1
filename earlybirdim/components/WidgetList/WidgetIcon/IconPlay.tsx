import { FC, SVGProps } from 'react'

export const IconPlay: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="play"
      {...props}
    >
      <path
        d="M3 13.1231V2.87688C3 1.42024 4.55203 0.520516 5.77196 1.26995L14.1114 6.39307C15.2962 7.12093 15.2962 8.87907 14.1114 9.60693L5.77196 14.73C4.55203 15.4795 3 14.5798 3 13.1231Z"
        fill="currentColor"
      />
    </svg>
  )
}

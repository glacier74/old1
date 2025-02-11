import { FC } from 'react'

export const IconUserCase1: FC = props => {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      {...props}
    >
      <mask id=":rko:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
        <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
      </mask>
      <g mask="url(#:rko:)">
        <rect width="36" height="36" fill="#4eb3de"></rect>
        <rect
          x="0"
          y="0"
          width="36"
          height="36"
          transform="translate(7 7) rotate(297 18 18) scale(1)"
          fill="#fcf09f"
          rx="6"
        ></rect>
        <g transform="translate(3.5 3.5) rotate(7 18 18)">
          <path d="M13,19 a1,0.75 0 0,0 10,0" fill="#000000"></path>
          <rect x="12" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
          <rect x="22" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
        </g>
      </g>
    </svg>
  )
}

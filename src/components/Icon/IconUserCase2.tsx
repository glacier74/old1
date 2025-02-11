import { FC } from 'react'

export const IconUserCase2: FC = props => {
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
      <mask id=":r12:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
        <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
      </mask>
      <g mask="url(#:r12:)">
        <rect width="36" height="36" fill="#ff7752"></rect>
        <rect
          x="0"
          y="0"
          width="36"
          height="36"
          transform="translate(-4 -4) rotate(188 18 18) scale(1.2)"
          fill="#ffb752"
          rx="36"
        ></rect>
        <g transform="translate(-4 -2) rotate(-8 18 18)">
          <path d="M15 21c2 -1 4 -1 6 0" stroke="#000000" fill="none" strokeLinecap="round"></path>
          <rect x="11" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
          <rect x="23" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
        </g>
      </g>
    </svg>
  )
}

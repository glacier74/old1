import { SVGProps } from 'react'

export const IconFooter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 14H19C19.5523 14 20 14.4477 20 15V18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18V15C4 14.4477 4.44772 14 5 14Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M4 4H20M4 9H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

import { SVGProps } from 'react'

export const IconHeader = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.75 4H5.25C4.00736 4 3 4.89543 3 6V18C3 19.1046 4.00736 20 5.25 20H18.75C19.9926 20 21 19.1046 21 18V6C21 4.89543 19.9926 4 18.75 4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 7L19 7"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
)

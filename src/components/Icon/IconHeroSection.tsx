import { SVGProps } from 'react'

export const IconHeroSection = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 4H19C19.5523 4 20 4.44772 20 5V8C20 8.55228 19.5523 9 19 9H5C4.44772 9 4 8.55228 4 8V5C4 4.44772 4.44772 4 5 4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M4 19H20M4 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

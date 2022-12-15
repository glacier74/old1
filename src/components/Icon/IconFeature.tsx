import { SVGProps } from 'react'

export const IconFeature = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.5 4h-15C3.12 4 2 4.895 2 6v12c0 1.105 1.12 2 2.5 2h15c1.38 0 2.5-.895 2.5-2V6c0-1.105-1.12-2-2.5-2zM14 10h4M14 14h4"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x={5} y={9} width={6} height={6} rx={2} fill="currentColor" />
  </svg>
)

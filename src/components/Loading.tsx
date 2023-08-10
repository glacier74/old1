import clsx from 'clsx'

export function Spin({ className }: ComponentProps) {
  return (
    <svg
      className={clsx('w-5 h-5 text-emerald-500 animate-spin', className)}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" />
      <path
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Loading({ className }: ComponentProps) {
  return (
    <div className={clsx('flex flex-col justify-center items-center', className)}>
      <Spin />
    </div>
  )
}

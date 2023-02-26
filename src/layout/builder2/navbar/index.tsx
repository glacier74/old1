import { Button } from '@heyforms/ui'
import { IconChevronLeft } from '@tabler/icons'
import Link from 'next/link'
import { FC } from 'react'

export const Navbar: FC = () => {
  return (
    <div className="flex items-center justify-between h-[3.5rem] px-4 border-b border-gray-200">
      <Link
        className="inline-flex items-center text-sm -ml-0.5 pl-0.5 pr-3 py-1 rounded hover:bg-gray-100"
        href="/"
      >
        <IconChevronLeft className="w-6 h-6 text-gray-600" />
        <span className="ml-1">EarlyBird</span>
      </Link>

      <div className="flex items-center justify-end">
        <Button type="success" className="builder-publish">
          Publish
        </Button>

        <style jsx global>{`
          .builder-publish {
            @apply py-1.5 #{!important};
          }
        `}</style>
      </div>
    </div>
  )
}

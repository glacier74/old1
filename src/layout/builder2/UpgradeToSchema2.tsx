import { Button, EmptyStates } from '@heyforms/ui'
import { IconChevronLeft } from '@tabler/icons'
import Link from 'next/link'
import { FC } from 'react'

import { useProduct } from '~/layout'

export const UpgradeToSchema2: FC<{ loading: boolean; onClick: () => void }> = ({
  loading,
  onClick
}) => {
  const product = useProduct()

  return (
    <div className="flex flex-col w-full w-screen h-full h-screen overflow-hidden">
      <div className="flex items-center justify-between h-[3.5rem] px-4 border-b border-slate-200">
        <div className="flex-1">
          <Link
            className="inline-flex items-center text-sm -ml-3 pl-1 pr-3 py-1.5 rounded hover:bg-slate-100"
            href={`/product/${product.id}`}
          >
            <IconChevronLeft className="w-5 h-5 text-slate-500" />
            <span className="ml-1">{product.name}</span>
          </Link>
        </div>
      </div>
      <EmptyStates
        className="flex-1 pt-48 max-w-2xl mx-auto text-left"
        title="🔥 We've upgraded our builder"
        description={
          <div className="space-y-2 text-lg text-left text-slate-500">
            <p>
              We've just launched our new builder with more UI blocks, and your landing page
              currently uses an older block schema version. To edit the landing page, you must
              upgrade the schema to the latest version.
            </p>
            <p>
              Your website will still be available to visitors even if you choose not to upgrade.
              However, you won't be able to make any further edits to it.
            </p>
          </div>
        }
        action={
          <Button
            loading={loading}
            onClick={onClick}
            className="!bg-emerald-500 !text-white !py-2 !text-lg"
          >
            👉 Upgrade to the latest builder
          </Button>
        }
      />
    </div>
  )
}

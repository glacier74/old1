import { Button } from '@heyforms/ui'
import { IconChevronRight } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { useBuilderContext } from '~/layout/builder/context'
import { stripeConnectStep } from '~/layout/builder/utils'

export const PaymentSettings: FC<{ block: PaymentBlock }> = ({ block }) => {
  const { t } = useTranslation()
  const { dispatch } = useBuilderContext()

  function handleClick() {
    dispatch({
      type: 'update',
      payload: {
        stripeConnectBlock: block,
        stripeConnectStep: stripeConnectStep(block)
      }
    })
  }

  return (
    <div className="px-4">
      <Button.Link
        className="w-full !py-1.5 !justify-between !text-sm"
        trailing={<IconChevronRight />}
        onClick={handleClick}
      >
        {t('builder.payment.settings')}
      </Button.Link>
    </div>
  )
}

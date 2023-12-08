import { FC } from 'react'

import { AutoSizeTextarea } from '~/components'
import { useOptions } from '~/layout/builder3/context'

import { OptionProps } from '../OptionGroup'

export const PaymentLinkOption: FC<OptionProps> = ({ parentName, schema }) => {
  const { value, update } = useOptions<string>(
    [parentName, 'paymentLink'].filter(Boolean).join('.')
  )

  return (
    <div className="builder-option">
      <div className="builder-option__title"></div>
      <div className="builder-option__content">
        <AutoSizeTextarea value={value} minRows={2} onChange={update} />
      </div>
    </div>
  )
}

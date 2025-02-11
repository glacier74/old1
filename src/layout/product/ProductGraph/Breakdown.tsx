import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { FC, useState } from 'react'

import { AsyncRequest, Loading } from '~/components'
import { MainGraphProps, useProduct } from '~/layout'
import { ProductService } from '~/service'

interface BreakdownItemProps extends ComponentProps {
  label: string
  value: number
  percentage: number
}

const BreakdownItem: FC<BreakdownItemProps> = ({ className, label, value, percentage }) => {
  const { t } = useTranslation('dashboard')

  return (
    <div className="flex items-center justify-between text-sm">
      <div
        className="flex-1 w-full relative"
        style={{
          maxWidth: 'calc(100% - 5rem)'
        }}
      >
        <div
          className={clsx('absolute top-0 left-0 h-full bg-opacity-10', className)}
          style={{ width: `${percentage * 100}%` }}
        />
        <div className="w-full px-2 py-1 h-7 relative z-9 overflow-hidden truncate break-all">
          {t(label, { ns: 'country' })}
        </div>
      </div>
      <span className="font-medium w-20 text-right">{value}</span>
    </div>
  )
}

interface BreakdownProps extends MainGraphProps {
  sourceName: string
  propertyName: string
  propertyValue: string
  labelKey: string
  valueKey?: string
  backgroundClassName: string
}

export const Breakdown: FC<BreakdownProps> = ({
  className,
  date,
  period,
  sourceName,
  propertyName,
  propertyValue,
  labelKey = 'source',
  valueKey = 'visitors',
  backgroundClassName
}) => {
  const { t } = useTranslation('dashboard')
  const product = useProduct()
  const [data, setData] = useState<any[]>([])

  async function fetchData() {
    const data = await ProductService.breakdown(product.id, {
      property: propertyValue,
      date,
      period
    })
    const sum = data.reduce((prev, curr) => prev + curr[valueKey], 0)

    setData(
      data.map(r => ({
        label: r[labelKey],
        value: r[valueKey],
        percentage: r[valueKey] / sum
      }))
    )

    return data.length > 0
  }

  return (
    <div className={clsx('relative border border-slate-200 mb-8 md:mb-0 p-6 rounded', className)}>
      <div className="flex justify-between">
        <h3 className="font-bold dark:text-slate-100">{t(sourceName)}</h3>
      </div>
      <div className="flex flex-col flex-grow fade-enter-active">
        <div className="flex items-center justify-between mt-3 mb-2 text-xs font-semibold tracking-wide text-slate-800">
          <span>{t(propertyName)}</span>
          <div className="text-right">
            <span className="inline-block w-20">{t('productStats.visitors')}</span>
          </div>
        </div>

        <AsyncRequest
          className="relative flex-grow h-80"
          request={fetchData}
          deps={[product?.id, date, period]}
          skeleton={<Loading className="absolute inset-0" />}
          emptyState={
            <div className="flex items-center justify-center w-full h-full text-sm text-slate-500">
              No enough data
            </div>
          }
        >
          <div className="space-y-1">
            {data.map((row, index) => (
              <BreakdownItem key={index} className={backgroundClassName} {...row} />
            ))}
          </div>
        </AsyncRequest>
      </div>
    </div>
  )
}

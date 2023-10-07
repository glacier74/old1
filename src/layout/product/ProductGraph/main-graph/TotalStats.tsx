import { isValid } from '@nily/utils'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { FC, useMemo } from 'react'

import { durationFormatter, numberFormatter } from '~/utils'

interface StatsItemProps extends ComponentProps {
  label: string
  name: string
  data?: AnyMap<any>
}

const StatsItem: FC<StatsItemProps> = ({ className, label, name, data }) => {
  const isBounceRate = useMemo(() => name === 'bounce_rate', [name])
  const isVisitDuration = useMemo(() => name === 'visit_duration', [name])
  const value = useMemo(() => (data ? data[name] : undefined), [data])
  const growth = useMemo(
    () => value && (isBounceRate ? value.change < 0 : value.change > 0),
    [value]
  )
  const text = useMemo(() => {
    if (value) {
      return isBounceRate
        ? `${value.value}%`
        : isVisitDuration
        ? durationFormatter(value.value)
        : numberFormatter(value.value)
    }
  }, [value, isBounceRate, isVisitDuration])

  return (
    <div className={clsx('w-1/2 px-4 md:px-8 lg:w-auto border-r', className)}>
      <div className="text-xs font-semibold tracking-wide text-slate-800 uppercase dark:text-slate-400 whitespace-nowrap">
        {label}
      </div>
      <div className="flex items-center justify-between my-3 whitespace-nowrap">
        <strong className="mr-4 text-xl md:text-4xl">{text}</strong>
        {isValid(value?.change) && (
          <span className="text-xs dark:text-slate-100">
            <span className={clsx('font-bold', growth ? 'text-emerald-400' : 'text-red-400')}>
              {value.change > 0 ? '↑' : '↓'}
            </span>{' '}
            {Math.abs(value.change)}%
          </span>
        )}
      </div>
    </div>
  )
}

interface TotalStatsProps {
  totalStats?: AnyMap<any>
}

export function TotalStats({ totalStats }: TotalStatsProps) {
  const { t } = useTranslation('dashboard')

  return (
    <div className="flex flex-wrap">
      <StatsItem label={t('productStats.uniqueVisitors')} data={totalStats} name="visitors" />
      <StatsItem
        className="border-r-0 md:border-r"
        label={t('productStats.totalPageviews')}
        data={totalStats}
        name="pageviews"
      />
      <StatsItem
        className="mt-4 md:mt-0 md:border-r"
        label={t('productStats.bounceRate')}
        data={totalStats}
        name="bounce_rate"
      />
      <StatsItem
        className="mt-4 border-r-0 md:mt-0"
        label={t('productStats.visitDuration')}
        data={totalStats}
        name="visit_duration"
      />
    </div>
  )
}

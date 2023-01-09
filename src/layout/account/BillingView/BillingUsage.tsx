import { EmptyStates, Progress } from '@heyforms/ui'
import { IconDatabase } from '@tabler/icons'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { AsyncRequest } from '~/components'
import { SubscriptionService } from '~/service'

const Skeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="w-40 h-3 rounded-sm skeleton"></div>
        <div className="w-full h-2 rounded-sm skeleton"></div>
        <div className="w-52 h-2 rounded-sm skeleton"></div>
      </div>
      <div className="space-y-2">
        <div className="w-40 h-3 rounded-sm skeleton"></div>
        <div className="w-full h-2 rounded-sm skeleton"></div>
        <div className="w-52 h-2 rounded-sm skeleton"></div>
      </div>
      <div className="space-y-2">
        <div className="w-40 h-3 rounded-sm skeleton"></div>
        <div className="w-full h-2 rounded-sm skeleton"></div>
        <div className="w-52 h-2 rounded-sm skeleton"></div>
      </div>
    </div>
  )
}

export const BillingUsage = () => {
  const { t } = useTranslation()
  const [usage, setUsage] = useState<SubscriptionUsage>()

  async function request() {
    setUsage(await SubscriptionService.usage())
    return true
  }

  return (
    <AsyncRequest
      className="mt-5 space-y-5"
      request={request}
      skeleton={<Skeleton />}
      emptyState={
        <EmptyStates
          className="pt-60 flex flex-col justify-center"
          icon={<IconDatabase className="non-scaling-stroke" />}
          title={t('engagements.notFound.title')}
          description={t('engagements.notFound.description')}
        />
      }
    >
      <div className="space-y-1">
        <div className="text-base font-semibold">Landing page</div>
        <Progress type="green" percent={usage?.landingPage.percent || 0} />
        <div className="text-sm text-slate-500">
          {usage?.landingPage.used} of {usage?.landingPage.quota} pages
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-base font-semibold">Monthly visits</div>
        <Progress type="green" percent={usage?.visit.percent || 0} />
        <div className="text-sm text-slate-500">
          {usage?.visit.used} of {usage?.visit.quota} visits. Resets on{' '}
          {dayjs().startOf('month').add(1, 'month').format('MMM DD, YYYY')}
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-base font-semibold">Conversion action</div>
        <Progress type="green" percent={usage?.conversion.percent || 0} />
        <div className="text-sm text-slate-500">
          {usage?.conversion.used} of {usage?.conversion.quota} conversion actions.
        </div>
      </div>
    </AsyncRequest>
  )
}

import { Button, Modal } from '@heyforms/ui'
import dayjs from 'dayjs'
import Link from 'next/link'

import { PLAN_INTERVALS, PLAN_LEVELS, PLAN_NAMES } from '~/constants'
import { BillingUsage } from '~/layout/account/BillingView/BillingUsage'
import { SubscriptionService, UserService } from '~/service'
import { useStore } from '~/store'
import { currencyFormatter, useRequest, useSubscription, useVisible } from '~/utils'

const Skeleton = () => {
  return (
    <div>
      <div className="flex items-center h-16 py-4">
        <div className="w-40 h-4 rounded-sm skeleton"></div>
        <div className="w-40 h-4 rounded-sm skeleton"></div>
        <div className="w-40 h-4 rounded-sm skeleton"></div>
      </div>
      <div className="flex items-center h-16 py-4">
        <div className="w-40 h-4 rounded-sm skeleton"></div>
        <div className="w-40 h-4 rounded-sm skeleton"></div>
        <div className="w-40 h-4 rounded-sm skeleton"></div>
      </div>
    </div>
  )
}

export const BillingPlan = () => {
  const { user, updateUser } = useStore()
  const subscription = useSubscription(user)
  const [visible, open, close] = useVisible()

  const { loading, request } = useRequest(
    async () => {
      await SubscriptionService.cancel()

      // Update user
      const user = await UserService.user()

      updateUser(user)
      close()
    },
    [],
    {
      errorNotify: true
    }
  )

  return (
    <div>
      <div className="text-2xl font-bold">Plan</div>
      <div className="mt-2">
        {subscription ? (
          <>
            <div className="flex">
              <div className="flex-1 space-y-1">
                <div className="text-base font-semibold">{subscription.plan.name}</div>
                <div className="text-sm">
                  {currencyFormatter(subscription.price.currency, subscription.price.price)} /{' '}
                  {user.subscription.price.interval}
                </div>
                <div className="flex items-center space-x-2">
                  <Link className="link-button link-button-success" href="/account/plan">
                    Explore plans
                  </Link>
                  {!subscription.isCancelled && (
                    <Button loading={loading} onClick={open}>
                      Cancel subscription
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <div className="text-base font-semibold">Billing period</div>
                <div className="text-sm">
                  <span>{PLAN_INTERVALS[subscription.price.interval]}</span>
                  {subscription.isCancelled ? (
                    <span className="pl-1 text-slate-500">
                      (expires on {dayjs.unix(subscription.endsAt!).format('MMM DD, YYYY')})
                    </span>
                  ) : (
                    <span className="pl-1 text-slate-500">
                      (renews on {dayjs.unix(subscription.endsAt!).format('MMM DD, YYYY')})
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Modal.Confirm
              type="danger"
              visible={visible}
              title="Cancel your subscription?"
              description={
                <div className="space-y-2">
                  <p>
                    You can continue using {subscription.plan.name} plan until{' '}
                    {dayjs.unix(subscription.endsAt!).format('MMM DD, YYYY')}, at which point your
                    subscription will expire.
                  </p>
                  <p>
                    Once you confirm to cancel the plan, your products will no longer be able to
                    access features of {subscription.plan.name} plan.
                  </p>
                </div>
              }
              cancelLabel="Close"
              confirmLabel={`Cancel subscription`}
              confirmLoading={loading}
              onCancel={close}
              onClose={close}
              onConfirm={request}
            />
          </>
        ) : (
          <div>
            <div className="mb-1 text-base font-semibold">{PLAN_NAMES[PLAN_LEVELS.plan_free]}</div>
            <Link
              className="block md:!inline-block link-button link-button-success"
              href="/account/plan"
            >
              Upgrade plan
            </Link>
          </div>
        )}

        <BillingUsage />
      </div>
    </div>
  )
}

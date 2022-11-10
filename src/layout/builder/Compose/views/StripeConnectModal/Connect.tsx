import { Button } from '@heyforms/ui'
import { IconArrowUpRight } from '@tabler/icons'
import { FC, useState } from 'react'

import { Loading } from '~/components'
import { StripeService } from '~/service'
import { useRequest, useWindow } from '~/utils'

import { useComposeStore } from '../../store'

export const Connect: FC = () => {
  const { dispatch } = useComposeStore()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error>()

  const authorize = useRequest(async () => {
    const { authorizeUrl } = await StripeService.authorizeUrl()

    setLoading(true)
    openWindow(authorizeUrl)
  }, [])

  async function connect(stateQuery: string, code: string) {
    setError(undefined)

    try {
      const result = await StripeService.connect(stateQuery, code)

      dispatch({
        type: 'updateStripeConnect',
        payload: {
          stripeConnectStep: 'product',
          stripeConnectBlock: {
            stripeAccount: result.accountId,
            stripeEmail: result.email
          }
        }
      })
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  const openWindow = useWindow('EARLYBIRD_STRIPE_CONNECT', async (win, payload) => {
    win.close()

    if (payload.error) {
      return setError(new Error(`Failed to connect with stripe: ${payload.error_description}`))
    }

    await connect(payload.state, payload.code)
  })

  return (
    <div className="text-sm text-center">
      {loading ? (
        <div>
          <Loading />
          <p className="mt-2">Connecting with Stripe</p>
        </div>
      ) : (
        <div>
          <div className="space-y-3">
            <p>
              If you do not have a stripe account, you can create a free account with a valid email
              address and a bank account linked to an address.{' '}
              <a className="text-blue-700" href="https://stripe.com/connect" target="_blank">
                Head over to Stripe
              </a>{' '}
              to find out more.
            </p>
            <p>
              EarlyBird charges 5% commission per payment plus the{' '}
              <a className="text-blue-700" href="https://stripe.com/pricing" target="_blank">
                Stripe transaction fee
              </a>
              .
            </p>
          </div>

          <div className="flex justify-center pt-20">
            <Button
              className="w-80"
              type="primary"
              trailing={<IconArrowUpRight />}
              loading={authorize.loading}
              onClick={authorize.request}
            >
              Connect with Stripe
            </Button>
          </div>
        </div>
      )}

      {(error || authorize.error) && (
        <div className="mt-2 text-red-700">{(error || authorize.error)!.message}</div>
      )}
    </div>
  )
}

import { Button } from '@heyforms/ui'
import { FC, useState } from 'react'

import { useWindow } from '~/utils'

interface OAuthProps {
  name: string
  logo: string
  authorizeRequest: () => Promise<string>
  connectRequest: (code: string) => Promise<void>
}

export const OAuth: FC<OAuthProps> = ({ name, logo, authorizeRequest, connectRequest }) => {
  const [isAuthorizing, setAuthorizing] = useState(false)
  const [error, setError] = useState<Error>()

  const openWindow = useWindow(
    'EARLYBIRD_APPS_CONNECT',
    async (win, payload) => {
      win.close()

      if (payload.error) {
        setError(new Error(`Failed to connect with stripe: ${payload.error_description}`))
        setAuthorizing(false)

        return
      }

      try {
        await connectRequest(payload.code)
      } catch (err: any) {
        setError(err)
      }

      setAuthorizing(false)
    },
    () => {
      setAuthorizing(false)
    }
  )

  async function handleClick() {
    setAuthorizing(true)
    setError(undefined)

    try {
      const authorizeUrl = await authorizeRequest()
      openWindow(authorizeUrl)
    } catch (err: any) {
      setError(err)
      setAuthorizing(false)
    }
  }

  return (
    <div className="mb-6">
      <div className="text-sm font-semibold text-slate-700">Authorization</div>
      <div className="mt-1 text-sm text-slate-500">
        First off all, please authorize EarlyBird to access your {name} data.
      </div>
      <Button
        className="mt-2"
        leading={
          <div className="flex items-center justify-center p-1 rounded-full shadow">
            <img className="h-4 w-4 aspect-1 object-cover" src={logo} alt={name} />
          </div>
        }
        loading={isAuthorizing}
        onClick={handleClick}
      >
        Login to Mailchimp
      </Button>

      {error && <div className="mt-2 text-sm text-red-600">{error.message}</div>}
    </div>
  )
}

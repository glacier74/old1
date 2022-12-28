import { FC } from 'react'

import { Mailchimp } from './Mailchimp'
import { Sendy } from './Sendy'
import { Webhook } from './Webhook'

const Integration: FC<{ integration: Integration }> = ({ integration }) => {
  switch (integration.type) {
    case 'webhook':
      return <Webhook integration={integration} />

    case 'mailchimp':
      return <Mailchimp integration={integration} />

    case 'sendy':
      return <Sendy integration={integration} />
  }
}

export const Integrations: FC<{ integrations: Integration[] }> = ({ integrations }) => {
  return (
    <div className="divide-y divide-gray-200">
      {integrations.map(integration => (
        <Integration key={integration.type} integration={integration} />
      ))}
    </div>
  )
}

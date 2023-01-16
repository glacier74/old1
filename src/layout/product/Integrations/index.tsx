import { FC } from 'react'

import { Crisp } from './Crisp'
import { Mailchimp } from './Mailchimp'
import { Sendy } from './Sendy'
import { Webhook } from './Webhook'
import { Zapier } from './Zapier'

const Integration: FC<{ integration: Integration }> = ({ integration }) => {
  switch (integration.type) {
    case 'webhook':
      return <Webhook integration={integration} />

    case 'mailchimp':
      return <Mailchimp integration={integration} />

    case 'sendy':
      return <Sendy integration={integration} />

    case 'crisp':
      return <Crisp integration={integration} />

    case 'zapier':
      return <Zapier />

    default:
      return null
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

import { FC } from 'react'

import { ActiveCampaign } from './ActiveCampaign'
import { Airtable } from './Airtable'
import { Crisp } from './Crisp'
import { Excel } from './Excel'
import { GoogleSheets } from './GoogleSheets'
import { Hubspot } from './Hubspot'
import { Mailchimp } from './Mailchimp'
import { Notion } from './Notion'
import { Salesforce } from './Salesforce'
import { Sendy } from './Sendy'
import { Slack } from './Slack'
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

    case 'airtable':
      return <Airtable />

    case 'notion':
      return <Notion />

    case 'active-campaign':
      return <ActiveCampaign />

    case 'salesforce':
      return <Salesforce />

    case 'hubspot':
      return <Hubspot />

    case 'slack':
      return <Slack />

    case 'google-sheets':
      return <GoogleSheets />

    case 'excel':
      return <Excel />

    default:
      return null
  }
}

export const Integrations: FC<{ integrations: Integration[] }> = ({ integrations }) => {
  return (
    <>
      {integrations.map(integration => (
        <Integration key={integration.type} integration={integration} />
      ))}
    </>
  )
}

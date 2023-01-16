import { FC } from 'react'

import { CrispWidget } from './CrispWidget'

export const PublicSiteIntegration: FC<{ integration: Integration }> = ({ integration }) => {
  switch (integration.type) {
    case 'crisp':
      return <CrispWidget settings={integration.settings as CrispSettings} />

    default:
      return null
  }
}

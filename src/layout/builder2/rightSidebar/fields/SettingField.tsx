import { FC } from 'react'

import { ButtonSettingField } from './ButtonSettingField'
import { EmailCaptureSettingField } from './EmailCaptureSettingField'
import { GroupSettingField } from './GroupSettingField'
import { HtmlSettingField } from './HtmlSettingField'
import { IconSettingField } from './IconSettingField'
import { ImageSettingField } from './ImageSettingField'
import { LinkSettingField } from './LinkSettingField'
import { ListSettingField } from './ListSettingField'
import { PaymentSettingField } from './PaymentSettingField'
import { TextSettingField } from './TextSettingField'

export interface SettingFieldProps {
  schema: any
}

export const SettingField: FC<SettingFieldProps> = ({ schema }) => {
  switch (schema.type) {
    case 'schema_group':
      return <GroupSettingField schema={schema} />

    case 'schema_list':
      return <ListSettingField schema={schema} />

    case 'schema_media':
      // TODO - change to MediaSettingField
      return <ImageSettingField schema={schema} />

    case 'schema_link':
      return <LinkSettingField schema={schema} />

    case 'schema_button':
      return <ButtonSettingField schema={schema} />

    case 'schema_image':
      return <ImageSettingField schema={schema} />

    case 'schema_icon':
      return <IconSettingField schema={schema} />

    case 'schema_text':
      return <TextSettingField schema={schema} />

    case 'schema_html':
      return <HtmlSettingField schema={schema} />

    case 'schema_email_capture':
      return <EmailCaptureSettingField schema={schema} />

    case 'schema_payment':
      return <PaymentSettingField schema={schema} />

    default:
      return null
  }
}

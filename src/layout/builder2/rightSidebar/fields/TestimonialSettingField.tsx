import { Input } from '@heyforms/ui'
import { FC } from 'react'

import { useBlockSetting } from '~/layout/builder2/context'

import { SettingFieldProps } from './SettingField'

export const TestimonialSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)

  function handleChange(value: any) {
    updateSetting(value, 'code')
  }

  return (
    <div className="builder-setting-text">
      <div className="mb-2 text-sm text-slate-700">
        <p>Copy and paste the embed code from your review management platform.</p>
        <p>
          We have tested{' '}
          <a
            className="text-green-500"
            href="https://help.testimonial.to/en/articles/6223121-embed-a-wall-of-love"
            target="_blank"
            rel="noreferrer"
          >
            Testimonials.to
          </a>
          ,{' '}
          <a
            className="text-green-500"
            href="https://support.senja.io/share-testimonials/eRYpqiPkoXVQnhcvDa9FYt/add-testimonials-to-your-website-[all-other-builders]/pktjvywbQF734P8jaZyNh2"
            target="_blank"
            rel="noreferrer"
          >
            Senja
          </a>
          , and{' '}
          <a
            className="text-green-500"
            href="https://praisehive.com/guides/how-to-add-testimonials-to-wordpress-website"
            target="_blank"
            rel="noreferrer"
          >
            PraiseHive
          </a>
          , but if your code doesn't parse correctly, please contact our support team.
        </p>
      </div>
      <Input.Textarea value={setting?.code} rows={6} onChange={handleChange} />
    </div>
  )
}

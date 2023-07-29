import { Input } from '@heyforms/ui'
import { FC, useCallback } from 'react'

import { useBuilderContext } from '~/layout/builder/context'

export const TestimonialSettings: FC<{ block: TestimonialBlock }> = ({ block }) => {
  const { dispatch } = useBuilderContext()

  const handleChange = useCallback(
    (embedCode: any) => {
      dispatch({
        type: 'updateBlock',
        payload: {
          blockId: block.id,
          updates: {
            embedCode
          }
        }
      })
    },
    [block.id]
  )

  return (
    <div className="px-4">
      <div className="space-y-1">
        <div className="text-sm font-medium">Embed script</div>
        <div className="text-sm text-slate-700">
          <p>Copy and paste the embed code from your review management platform.</p>
          <p>
            We have tested{' '}
            <a
              className="text-emerald-500"
              href="https://help.testimonial.to/en/articles/6223121-embed-a-wall-of-love"
              target="_blank"
              rel="noreferrer"
            >
              Testimonials.to
            </a>
            ,{' '}
            <a
              className="text-emerald-500"
              href="https://support.senja.io/share-testimonials/eRYpqiPkoXVQnhcvDa9FYt/add-testimonials-to-your-website-[all-other-builders]/pktjvywbQF734P8jaZyNh2"
              target="_blank"
              rel="noreferrer"
            >
              Senja
            </a>
            , and{' '}
            <a
              className="text-emerald-500"
              href="https://praisehive.com/guides/how-to-add-testimonials-to-wordpress-website"
              target="_blank"
              rel="noreferrer"
            >
              PraiseHive
            </a>
            , but if your code doesn't parse correctly, please contact our support team.{' '}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <Input.Textarea rows={8} value={block.embedCode} onChange={handleChange} />
      </div>
    </div>
  )
}

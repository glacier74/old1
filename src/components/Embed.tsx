import { Form, Input } from '@heyforms/ui'
import { FC } from 'react'

interface EmbedProps extends Omit<ComponentProps, 'onChange'> {
  submitText: string
  placeholder: string
  onChange?: (value: string) => void
}

// https://www.youtube.com/embed/M6Vfj1TjMvU
const VIDEO_RULES = [
  {
    regex: /^https?:\/\/(www\.)?youtube\.com\/watch\?v=([a-z0-9_-]+)/i,
    handler: (matches: string[]) => {
      return `https://www.youtube.com/embed/${matches![2]}`
    }
  },
  {
    regex: /^https?:\/\/youtu\.be\/([a-z0-9_-]+)/i,
    handler: (matches: string[]) => {
      return `https://www.youtube.com/embed/${matches![1]}`
    }
  },
  {
    regex: /^https?:\/\/www\.youtube\.com\/embed\/([a-z0-9_-]+)/i,
    handler: (matches: string[]) => {
      return `https://www.youtube.com/embed/${matches![1]}`
    }
  },
  {
    regex: /^https?:\/\/vimeo\.com\/(\d+)/i,
    handler: (matches: string[]) => {
      return `https://player.vimeo.com/video/${matches![1]}`
    }
  }
]

export const Embed: FC<EmbedProps> = ({ submitText, placeholder, onChange, ...restProps }) => {
  async function handleChange(values: any) {
    let url = values.url

    for (const rule of VIDEO_RULES) {
      const matches = url.match(rule.regex)

      if (matches) {
        url = rule.handler(matches)
        break
      }
    }

    onChange?.(url)
  }

  return (
    <Form.Custom
      inline
      submitText={submitText}
      submitOptions={{
        type: 'success',
        className: 'w-auto ml-2'
      }}
      request={handleChange}
      {...restProps}
    >
      <Form.Item name="url" rules={[{ required: true }]}>
        <Input type="url" placeholder={placeholder} />
      </Form.Item>
    </Form.Custom>
  )
}

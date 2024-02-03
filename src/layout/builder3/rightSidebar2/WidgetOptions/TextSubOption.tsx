import { isEmpty } from '@nily/utils'
import { debounce } from 'lodash'
import { FC, ReactNode, useCallback, useState } from 'react'
import isURL from 'validator/lib/isURL'

import { AutoSizeTextarea } from '~/components'
import { useOptions } from '~/layout/builder3/context'

interface TextSubOptionProps {
  title: string
  path: string
  description?: ReactNode
}

export const TextSubOption: FC<TextSubOptionProps> = ({ title, path, description }) => {
  const { value, update } = useOptions<string>(path)
  const handleChange = useCallback(debounce(update, 1_000), [])

  return (
    <div className="builder-option">
      <div className="builder-option__title">{title}</div>
      <div className="builder-option__content">
        <AutoSizeTextarea value={value} onChange={handleChange} />
        {description}
      </div>
    </div>
  )
}

const HYPERLINK_REGEX = /(tel|mailto|sms|geo):.+/i

function validateURL(value?: string, allowHyperlink = false) {
  if (isEmpty(value)) {
    throw new Error('The URL is not allowed to be empty')
  }

  if (!(isURL(value!) || (allowHyperlink && HYPERLINK_REGEX.test(value!)))) {
    throw new Error('The URL is not valid')
  }
}

export const URLSubOption: FC<TextSubOptionProps & { allowHyperlink?: boolean }> = ({
  title,
  path,
  description,
  allowHyperlink
}) => {
  const { value, update } = useOptions<string>(path)
  const [error, setError] = useState<Error>()

  function handleChange(newValue: string) {
    setError(undefined)

    try {
      validateURL(newValue, allowHyperlink)
      update(newValue)
    } catch (err: any) {
      setError(err)
    }
  }

  return (
    <div className="builder-option">
      <div className="builder-option__title">{title}</div>
      <div className="builder-option__content">
        <AutoSizeTextarea value={value} callbackAfterBlur={true} onChange={handleChange} />
        {error && <div className="text-red-500 mt-2 text-sm">{error.message}</div>}
        {description}
      </div>
    </div>
  )
}

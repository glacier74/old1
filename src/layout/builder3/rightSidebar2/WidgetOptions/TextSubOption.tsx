import { isEmpty } from '@nily/utils'
import { FC, useState } from 'react'
import isURL from 'validator/lib/isURL'

import { AutoSizeTextarea } from '~/components'
import { useOptions } from '~/layout/builder3/context'

interface TextSubOptionProps {
  title: string
  path: string
}

export const TextSubOption: FC<TextSubOptionProps> = ({ title, path }) => {
  const { value, update } = useOptions<string>(path)

  function handleChange(newValue: string) {
    update(newValue)
  }

  return (
    <div className="builder-option">
      <div className="builder-option__title">{title}</div>
      <div className="builder-option__content">
        <AutoSizeTextarea value={value} onChange={handleChange} />
      </div>
    </div>
  )
}

function validateURL(value?: string) {
  if (isEmpty(value)) {
    throw new Error('The URL is not allowed to be empty')
  }

  if (!isURL(value!)) {
    throw new Error('The URL is not valid')
  }
}

export const URLSubOption: FC<TextSubOptionProps> = ({ title, path }) => {
  const { value, update } = useOptions<string>(path)
  const [error, setError] = useState<Error>()

  function handleChange(newValue: string) {
    setError(undefined)

    try {
      validateURL(newValue)
      update(newValue)
    } catch (err: any) {
      setError(err)
    }
  }

  return (
    <div className="builder-option">
      <div className="builder-option__title">{title}</div>
      <div className="builder-option__content">
        <AutoSizeTextarea value={value} onChange={handleChange} />
        {error && <div className="text-red-500 mt-2 text-sm">{error.message}</div>}
      </div>
    </div>
  )
}

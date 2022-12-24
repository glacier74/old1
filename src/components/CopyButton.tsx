import { Button } from '@heyforms/ui'
import { ButtonProps } from '@heyforms/ui/types/button/Button'
import { FC, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

interface CopyButtonProps extends ButtonProps {
  text: string
  duration?: number
  copiedText?: string
  copyText?: string
}

export const CopyButton: FC<CopyButtonProps> = ({
  text,
  duration = 3_000,
  copiedText = 'Copied',
  copyText = 'Copy',
  ...restProps
}) => {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, duration)
  }

  return (
    <CopyToClipboard text={text} onCopy={handleCopy}>
      <Button.Link {...restProps}>{copied ? copiedText : copyText}</Button.Link>
    </CopyToClipboard>
  )
}

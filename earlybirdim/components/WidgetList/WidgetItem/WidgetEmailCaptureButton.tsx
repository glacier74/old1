import clsx from 'clsx'
import { FC, useState } from 'react'

import { FormSuccess } from '../../Form/Form'
import { WidgetEmailCaptureButtonProps } from '../WidgetProps'
import { WidgetEmailCaptureModal } from './WidgetEmailCaptureModal'

export const WidgetEmailCaptureButton: FC<WidgetEmailCaptureButtonProps> = ({
  className,
  config
}) => {
  const [visible, setVisible] = useState(false)
  const [isSubmitted, setSubmitted] = useState(false)

  function handleClick() {
    setVisible(true)
  }

  function handleSubmitted() {
    handleClose()
    setSubmitted(true)
  }

  function handleClose() {
    setVisible(false)
  }

  function handleSuccessClose() {
    setSubmitted(false)
  }

  return (
    <>
      <button
        className={clsx('absolute inset-0', className)}
        aria-label={config.data?.buttonText}
        onClick={handleClick}
      />

      <WidgetEmailCaptureModal
        visible={visible}
        config={config}
        onSubmitted={handleSubmitted}
        onClose={handleClose}
      />

      {isSubmitted && (
        <FormSuccess
          successMessage={config.data?.successMessage || 'You have successfully submitted'}
          onClose={handleSuccessClose}
        />
      )}
    </>
  )
}

export const WidgetEmailCaptureText: FC<{ text?: string }> = ({ text }) => {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-[var(--jingle-widget-follow-background)] px-4 py-1.5 text-center text-xs font-medium text-[var(--jingle-widget-follow-text)] hover:bg-[var(--jingle-widget-follow-background-hover)] active:bg-[var(--jingle-widget-follow-background-active)]">
      {text}
    </div>
  )
}

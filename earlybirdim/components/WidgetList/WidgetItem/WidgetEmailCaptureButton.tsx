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
        className={clsx(
          'inline-flex items-center gap-1 rounded-full border border-[var(--widget-follow-border)] bg-[var(--widget-follow-bg)] px-4 py-1.5 text-center text-xs font-medium text-[var(--widget-follow-text)] hover:bg-[var(--widget-follow-bg-hover)] active:bg-[var(--widget-follow-bg-active)]',
          className
        )}
        onClick={handleClick}
      >
        {config.data?.buttonText}
      </button>

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

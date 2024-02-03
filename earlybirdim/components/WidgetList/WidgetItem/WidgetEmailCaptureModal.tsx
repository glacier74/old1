import { Portal } from '@heyforms/ui'
import { IconX } from '@tabler/icons'
import { FC } from 'react'
import { useFrame } from 'react-frame-component'

import Form from '../../Form/Form'
import { WidgetEmailCaptureModalProps } from '../WidgetProps'

export const WidgetEmailCaptureModal: FC<WidgetEmailCaptureModalProps> = ({
  visible,
  config,
  onSubmitted,
  onClose
}) => {
  const { document: frameDocument } = useFrame()

  if (!visible) {
    return null
  }

  return (
    <Portal visible={visible} container={(frameDocument || document).body}>
      <div className="fixed inset-0 z-[98] flex h-screen w-screen items-center p-5">
        <div className="payment-success-party absolute inset-0 z-[99] bg-black/20"></div>
        <div className="relative z-[100] mx-auto w-full max-w-[540px] rounded-2xl bg-white px-8 py-10 shadow-2xl space-y-8">
          <div className="flex justify-start">
            <h3 className="flex-1 text-xl text-slate-800 font-semibold">
              {config.data.overrides?.title}
            </h3>

            <div className="-mt-1 -mr-1.5">
              <button
                type="button"
                className="p-1.5 rounded-full text-slate-600 hover:text-slate-800"
                onClick={onClose}
              >
                <IconX className="w-6 h-6" />
              </button>
            </div>
          </div>

          <Form
            className="space-y-6"
            id={config.id}
            isInModal={true}
            onSubmitted={onSubmitted}
            {...(config.data as any)}
          >
            <div className="earlybird-lsbzn3 flex flex-col mb-6 space-y-3">
              {config.data?.isNameRequired && (
                <Form.Item name="name" required>
                  <Form.Input
                    className="w-full text-[var(--jingle-widget-meta)] border border-gray-300 rounded-lg shadow-none py-2.5 px-4 leading-tight focus:outline-none focus:border-gray-500"
                    type="text"
                    placeholder="Your Name"
                  />
                </Form.Item>
              )}

              <Form.Item name="email" required>
                <Form.Input
                  className="w-full text-[var(--jingle-widget-meta)] border border-gray-300 rounded-lg shadow-none py-2.5 px-4 leading-tight focus:outline-none focus:border-gray-500"
                  type="email"
                  placeholder="Your Email"
                />
              </Form.Item>
            </div>
            <div className="earlybird-if4sZE flex justify-center mt-6">
              <Form.Button
                rootClassName="earlybird-EBF9kL w-full"
                className="w-full border-none px-4 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-md focus:outline-none"
              >
                {config.data?.buttonText || 'Submit'}
              </Form.Button>
            </div>
          </Form>
        </div>
      </div>
    </Portal>
  )
}

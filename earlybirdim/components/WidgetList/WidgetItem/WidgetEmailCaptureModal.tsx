import { IconX } from '@tabler/icons'
import { FC } from 'react'

import Form from '../../Form/Form'
import { WidgetEmailCaptureModalProps } from '../WidgetProps'

export const WidgetEmailCaptureModal: FC<WidgetEmailCaptureModalProps> = ({
  visible,
  config,
  onSubmitted,
  onClose
}) => {
  if (!visible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[98] flex h-screen w-screen items-center p-5">
      <div className="payment-success-party absolute inset-0 z-[99] bg-black/20"></div>
      <div className="absolute right-10 top-10 z-[100]">
        <button
          type="button"
          className="p-1.5 rounded-full text-slate-600 hover:bg-black/5"
          onClick={onClose}
        >
          <IconX className="w-8 h-8" />
        </button>
      </div>
      <div className="relative z-[100] mx-auto w-full max-w-[600px] rounded-2xl bg-white px-8 py-12 shadow-2xl space-y-10">
        <h3 className="text-2xl text-slate-800 font-semibold text-center">
          {config.data.overrides?.title}
        </h3>

        <Form
          className="space-y-5"
          id={config.id}
          isInModal={true}
          onSubmitted={onSubmitted}
          {...(config.data as any)}
        >
          <div className="earlybird-lsbzn3 flex flex-col mb-6 space-y-3">
            {config.data?.isNameRequired && (
              <Form.Item name="name" required>
                <Form.Input
                  className="w-full text-gray-700 border border-gray-300 rounded-lg shadow-none py-2.5 px-4 leading-tight focus:outline-none focus:border-gray-500"
                  type="text"
                  placeholder="Your Name"
                />
              </Form.Item>
            )}

            <Form.Item name="email" required>
              <Form.Input
                className="w-full text-gray-700 border border-gray-300 rounded-lg shadow-none py-2.5 px-4 leading-tight focus:outline-none focus:border-gray-500"
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
  )
}

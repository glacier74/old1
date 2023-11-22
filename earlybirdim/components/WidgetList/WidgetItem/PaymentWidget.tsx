import { useGlobalContext } from '@earlybirdim/components'
import clsx from 'clsx'
import { useState } from 'react'

import { Image } from '../../Image'
import { WidgetIcon } from '../WidgetIcon'
import { PaymentData, WidgetConfig } from '../WidgetProps'
import { payment } from '../constants'
import Widget from './Widget'
import { WidgetImagePlaceholder } from './WidgetImagePlaceholder'
import { WidgetPaymentButton, WidgetPaymentText } from './WidgetPaymentButton'

export default class PaymentWidget<T extends PaymentData> extends Widget<T> {
  constructor(config: WidgetConfig) {
    super()
    this.setConfig({
      ...config,
      extra: payment
    })
  }

  override Render1x1(config: WidgetConfig<T>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] = useState(false)

    return (
      <div className="relative block w-full h-full">
        <div className="flex h-full flex-col">
          <WidgetIcon type={config.type} />

          <div className="mt-2 md:mt-3 flex-1">
            <h3 className="line-clamp-1 text-sm leading-[1.2] text-gray-900">
              {config.data.overrides?.title}
            </h3>
          </div>

          <div className="inline-flex">
            <WidgetPaymentText text={config.data?.buttonText} loading={loading} />
          </div>
        </div>

        <WidgetPaymentButton config={config} onLoading={setLoading} />
      </div>
    )
  }

  // 2x1
  override Render2x1(config: WidgetConfig<T>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isPreview } = useGlobalContext()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] = useState(false)

    return (
      <div className="relative block w-full h-full">
        <div className="flex h-full">
          <div
            className={clsx(
              'flex h-full w-full flex-1 flex-col',
              config.data.overrides?.imageUrl ? 'aspect-[0.6] overflow-hidden' : undefined
            )}
          >
            <div className="flex justify-between">
              <WidgetIcon type={config.type} />
            </div>

            <div className="mt-2 md:mt-3 flex-1">
              <h3 className="line-clamp-1 text-sm leading-[1.2] text-slate-950 dark:text-slate-50">
                {config.data.overrides?.title}
              </h3>
            </div>

            <div className="inline-flex">
              <WidgetPaymentText text={config.data?.buttonText} loading={loading} />
            </div>
          </div>

          {config.data.overrides?.imageUrl ? (
            <div className="relative ml-6 aspect-[1.4] h-full">
              <Image
                className="h-full w-full rounded-xl object-cover pointer-events-none select-none"
                src={config.data.overrides?.imageUrl}
                width={180}
                height={130}
                alt={config.data.overrides?.title}
              />
              <div className="pointer-events-none absolute inset-0 border border-black/10 rounded-xl"></div>
            </div>
          ) : isPreview ? (
            <WidgetImagePlaceholder className="ml-6 aspect-[1.4] h-full" />
          ) : null}
        </div>

        <WidgetPaymentButton config={config} onLoading={setLoading} />
      </div>
    )
  }

  // 2x1
  override Render2x2(config: WidgetConfig<T>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isPreview } = useGlobalContext()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] = useState(false)

    return (
      <div className="relative block w-full h-full">
        <div className="flex h-full flex-col">
          <div>
            <div className="flex justify-between">
              <WidgetIcon type={config.type} />

              <div className="flex items-start">
                <WidgetPaymentText text={config.data?.buttonText} loading={loading} />
              </div>
            </div>

            <div className="mt-3">
              <h3 className="line-clamp-2 text-sm text-slate-950 dark:text-slate-50">
                {config.data.overrides?.title}
              </h3>
            </div>
          </div>

          <div className="flex-1"></div>

          {config.data.overrides?.imageUrl ? (
            <div className="relative mt-6 aspect-[1.9] overflow-hidden">
              <Image
                className="w-full h-full rounded-xl object-cover pointer-events-none select-none"
                src={config.data.overrides.imageUrl}
                width={340}
                height={180}
                alt={config.data.overrides?.title}
              />
              <div className="pointer-events-none absolute inset-0 border border-black/10 rounded-xl"></div>
            </div>
          ) : isPreview ? (
            <WidgetImagePlaceholder className="mt-6 aspect-[40/21]" />
          ) : null}
        </div>

        <WidgetPaymentButton config={config} onLoading={setLoading} />
      </div>
    )
  }
}

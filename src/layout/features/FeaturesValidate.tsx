import {
  IconCurrencyDollar,
  IconList,
  IconReportAnalytics,
  IconSelect,
  IconSend,
  IconSpeakerphone
} from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

export const FeaturesValidate: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="py-16 max-w-7xl mx-auto">
        <h1 className="max-w-5xl mx-auto text-white font-extrabold text-5xl text-left">
          Maximize engagement to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            ensure success
          </span>
        </h1>
        <p className="mt-4 max-w-5xl mx-auto text-slate-400 text-lg text-left">
          Benchmark with your customers to test the idea, gather interests, insights, and initial
          funding, and ensure that you have the potential to succeed.{' '}
        </p>

        <div className="mt-8 max-w-5xl mx-auto px-4 md:px-0">
          <div className="md:grid md:grid-cols-3 md:gap-4">
            <div className="mb-2 bg-slate-800 py-8 px-6 rounded rounded-md">
              <IconReportAnalytics
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-white font-bold text-lg">Comprehensive analytics</h3>
              <p className="mt-2 text-slate-400">
                View detailed information, including the number of visitors, page visits, top
                source, geo-location, and more.
              </p>
            </div>
            <div className="mb-2 bg-slate-800 py-8 px-6 rounded rounded-md">
              <IconList
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-white font-bold text-lg">Understand interests</h3>
              <p className="mt-2 text-slate-400">
                Build a list of interested individuals to keep them engaged and informed about your
                product development and offer.
              </p>
            </div>
            <div className="mb-2 bg-slate-800 py-8 px-6 rounded rounded-md">
              <IconCurrencyDollar
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-white font-bold text-lg">Accept payments</h3>
              <p className="mt-2 text-slate-400">
                Easily collect payments, track your income and manage your paid subscribers.
              </p>
            </div>
            <div className="mb-2 bg-slate-800 py-8 px-6 rounded rounded-md">
              <IconSpeakerphone
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-white font-bold text-lg">Collect feedback</h3>
              <p className="mt-2 text-slate-400">
                Add a simple form that users can fill out to provide their thoughts, opinions, and
                suggestions about your product or service.
              </p>
            </div>
            <div className="mb-2 bg-slate-800 py-8 px-6 rounded rounded-md">
              <IconSelect
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-white font-bold text-lg">Quick polls</h3>
              <p className="mt-2 text-slate-400">
                Get insights faster. Add user-friendly online polls to understand the needs and
                preferences of your target audience.
              </p>
            </div>
            <div className="mb-2 bg-slate-800 py-8 px-6 rounded rounded-md">
              <IconSend
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-white font-bold text-lg">Send files</h3>
              <p className="mt-2 text-slate-400">
                Automatically deliver files to the target who signs up or pays for your service or
                product.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

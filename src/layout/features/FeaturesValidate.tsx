import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const features = [
  {
    title: 'Comprehensive analytics',
    desc: 'View detailed information, including the number of visitors, page visits, top source, geo-location, and more.',
    imageUrl: '/static/analytics.webp'
  },
  {
    title: 'Understand interests',
    desc: 'Build a list of interested individuals to keep them engaged and informed about your product development and offer.',
    imageUrl: '/static/analytics.webp'
  },
  {
    title: 'Accept payments',
    desc: 'Easily collect payments, track your income and manage your paid subscribers.',
    imageUrl: '/static/accept-payment.webp'
  },
  {
    title: 'Collect feedback',
    desc: 'Add a simple form that users can fill out to provide their thoughts, opinions, and suggestions about your product or service.',
    imageUrl: '/static/analytics.webp'
  },
  {
    title: 'Quick polls',
    desc: 'Get insights faster. Add user-friendly online polls to understand the needs and preferences of your target audience.',
    imageUrl: '/static/polls.webp'
  },
  {
    title: 'Send files',
    desc: 'Automatically deliver files to the target who signs up or pays for your service or product.',
    imageUrl: '/static/analytics.webp'
  }
]

export const FeaturesValidate: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="py-32 px-2 max-w-7xl mx-auto">
        <h1 className="px-4 md:px-0 text-slate-900 font-extrabold text-5xl">
          Maximize engagement to ensure success
        </h1>
        <p className="px-4 md:px-0 mt-4 text-slate-700 text-2xl font-medium">
          Benchmark with your customers to test the idea, gather interests, insights, and initial
          funding, and ensure that you have the potential to succeed.{' '}
        </p>

        <div className="mt-16 px-4 md:px-0">
          <ul role="list" className="md:grid md:grid-cols-2 md:gap-x-16">
            {features.map(feature => (
              <li key={feature.title} className="mb-16">
                <Image
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full mb-8 rounded rounded-md"
                  width={600}
                  height={400}
                  quality={100}
                />
                <h3 className="text-slate-900 font-extrabold text-3xl">{feature.title}</h3>
                <p className="mt-2 text-slate-900 text-xl">{feature.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

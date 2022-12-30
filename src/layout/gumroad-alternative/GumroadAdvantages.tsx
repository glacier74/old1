import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const GumroadAdvantages: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-white py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold">Advanced features</h2>
        <div className="text-xl mt-4 leading-relaxed">
          EarlyBird is packed with features that make it easy for you to sell your products online,
          including:
        </div>

        <div className="mt-8 grid md:grid-cols-3 md:gap-8">
          <div className="mb-4">
            <h3 className="mb-2 text-xl font-bold text-slate-900">SEO-ready</h3>
            <p className="text-slate-700">
              Take full control of SEO and ensure that potential customers will quickly discover
              your products.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-xl font-bold text-slate-900">Private mode</h3>
            <p className="text-slate-700">
              Enable the private mode to share your products with specific set of users or
              customers.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-xl font-bold text-slate-900">Custom branding</h3>
            <p className="text-slate-700">
              Customize the look and feel of your product landing pages with your logo, colors, and
              fonts.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-xl font-bold text-slate-900">Custom Open Graph</h3>
            <p className="text-slate-700">
              Customize your products' display on social media and stand out to get more exposure.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-xl font-bold text-slate-900">Comprehensive analytics</h3>
            <p className="text-slate-700">
              Track the performance of your products with comprehensive in-built analytics tools.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-xl font-bold text-slate-900">Accept payments</h3>
            <p className="text-slate-700">
              Accept payments from customers and payout anytime with Stripe integration at a 5%
              commission rate.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-xl font-bold text-slate-900">Send files</h3>
            <p className="text-slate-700">
              Automate the process of delivering your products to customers with EarlyBird's file
              delivery feature.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

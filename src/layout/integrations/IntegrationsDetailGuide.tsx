import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

export const IntegrationsDetailGuide: FC<{ integration: IntegrationRecord }> = ({
  integration
}) => {
  const { t } = useTranslation()

  return (
    <section className="bg-slate-50 py-16">
      <div className="relative max-w-5xl mx-auto px-6 sm:py-20 py-10 z-10 text-center">
        <h3 className="sm:text-4xl text-2xl font-bold mb-4">
          How to connect EarlyBird <span className="text-emerald-500">+</span> {integration.Name}
        </h3>
        <p className="text-xl text-slate-700 mb-8">
          Integrating EarlyBird with {integration.Name} is easy and keeps your team in the loop at
          all times.
        </p>

        <a
          href={integration.GuideURL}
          className="bg-slate-900 text-slate-50 font-medium px-8 py-3 text-lg rounded-full"
        >
          Read the tutorial
        </a>
      </div>
    </section>
  )
}

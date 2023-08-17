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

        <div className="flex flex-wrap mb-16">
          <div className="w-full md:w-1/3 p-4 flex flex-col items-center">
            <Image
              src="https://usebasin.com/assets/website/integrations/slack/step-add-6e1519a4ed922fee5cd367ae09df492b0b695cbb5d06a3bb21b71d37b53d6e1a.svg"
              alt="Connect EarlyBird with App"
              className="mb-8"
              width={200}
              height={120}
            />
            <p className="px-3 text-slate-700">
              Ensure your form is pointed to a Basin endpoint and click 'add to {integration.Name}'
              from your form's {integration.Name} integration page.
            </p>
          </div>
          <div className="w-full md:w-1/3 p-4 flex flex-col items-center">
            <Image
              src="https://usebasin.com/assets/website/integrations/slack/step-channel-53c6660c3908afee5fe19f67b22c33fa57d25debb4d37c13ab4016d241889c1a.svg"
              alt="Configure App"
              className="mb-8"
              width={200}
              height={120}
            />
            <p className="px-3 text-slate-700">
              Once Basin is connected to your {integration.Name}, choose which channel to post your
              form submissions to.
            </p>
          </div>
          <div className="w-full md:w-1/3 p-4 flex flex-col items-center">
            <Image
              src="https://usebasin.com/assets/website/integrations/slack/step-notification-ce1309aa449dbc87cce41b508a7a2b19f1899452522bdf41588119e5db11ae58.svg"
              alt="Verify if it works"
              className="mb-8"
              width={200}
              height={120}
            />
            <p className="px-3 text-slate-700">
              Once settings are saved, all new submissions to your form will be posted to your{' '}
              {integration.Name} automatically.
            </p>
          </div>
        </div>

        <a
          href="/sign-up"
          className="bg-slate-900 text-slate-50 font-medium px-8 py-3 text-lg rounded-full"
        >
          Get started for free
        </a>
        <p className="text-slate-500 text-sm mt-4">No credit card required</p>
      </div>
    </section>
  )
}

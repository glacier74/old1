import { IconArrowLeft, IconArrowsLeftRight } from '@tabler/icons'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import MarkdownView from 'react-showdown'

export const IntegrationsDetailHero: FC<{ integration: IntegrationRecord }> = ({ integration }) => {
  return (
    <>
      <section className="bg-slate-800 md:px-12 px-6 xl:py-20 lg:py-24 py-12 z-10">
        <div className="max-w-5xl mx-auto flex flex-wrap">
          <div className="w-full md:w-1/2">
            <Link href="/integrations" className="text-emerald-500 hover:text-emerald-600">
              <IconArrowLeft className="inline" /> All Integrations
            </Link>
            <h1 className="text-3xl text-slate-50 leading-8 font-bold md:text-5xl my-4">
              {integration.Name}
            </h1>
            <p className="text-slate-100 sm:text-xl text-base whitespace-pre-line">
              {integration.Headline}
            </p>
            <MarkdownView className="mt-3 text-white/80" markdown={integration.Subheadline} />
            <div className="mt-7">
              <a
                href="/sign-up"
                className="bg-emerald-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-emerald-600"
              >
                Get started for free
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center mt-16 sm:mt-0">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-32 bg-white border border-emerald-50 rounded-xl shadow-lg py-8 flex flex-col items-center">
                <img src="/static/favicon.svg" alt="EarlyBird" width={48} height={48} />
                <h6 className="font-medium mt-4 text-center">EarlyBird</h6>
              </div>

              <IconArrowsLeftRight className="text-slate-50" />

              <div className="w-32 bg-white border border-emerald-50 rounded-xl shadow-lg py-8 flex flex-col items-center">
                <Image src={integration.Logo!} alt={integration.Name} width={48} height={48} />
                <h6 className="font-medium mt-4 text-center">{integration.Name}</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

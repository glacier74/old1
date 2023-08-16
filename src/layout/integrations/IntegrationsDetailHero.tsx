import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { IconArrowsLeftRight, IconArrowLeft } from '@tabler/icons'

export const IntegrationsDetailHero: FC<{ integration: IntegrationRecord }> = ({ integration }) => {
  const { t } = useTranslation()
  const [payload, setPayload] = useState<Integration_V3>()

  return (
    <>
      <section className="bg-slate-800 md:px-12 px-6 xl:py-20 lg:py-24 py-12 z-10">
        <div className="max-w-5xl mx-auto flex flex-wrap">
          <div className="w-full md:w-1/2">
            <a href="#" className="text-emerald-500 hover:text-emerald-600"><IconArrowLeft className="inline" /> All Integrations</a>
              <h1 className="text-3xl text-slate-50 leading-8 font-bold md:text-5xl my-4">
                Slack
              </h1>
              <p className="text-slate-100 sm:text-xl text-base whitespace-pre-line">
                Send form submissions to your team, save time and avoid context-switching.
              </p>
              <div className="pt-3">
                <div className="d-flex flex-row">
                  {/* <i className="far fa-hashtag fa-lg text-primary pr-3"></i> */}
                  <p className="inline-block text-white mb-4">
                    <span>
                      <strong>Stay organized</strong>&nbsp;— Post new form submissions to specific public or private Slack channels.
                    </span>
                  </p>
                </div>
                <div className="d-flex flex-row">
                 {/* <i className="far fa-bolt fa-lg text-primary pr-3"> */}
                  <p className="inline-block text-white mb-4">
                    <span>
                      <strong>Instant alerts</strong>&nbsp;— Get access to form submission data immediately, so your team can act on it faster.
                    </span>
                  </p>
                </div>
                <div className="d-flex flex-row">
                  {/* <i className="far fa-computer-mouse fa-lg text-primary pr-3"></i> */}
                  <p className="inline-block text-white mb-8">
                    <span>
                      <strong>Quick setup</strong>&nbsp;— Connect directly to your Slack workspace in a few clicks. No Zapier or like products required.
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <a href="/sign-up" className="bg-emerald-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-emerald-600">Get started for free</a>
              </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center mt-16 sm:mt-0">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-32 bg-white border border-emerald-50 rounded-xl shadow-lg py-8 flex flex-col items-center">
                <Image
                  src="https://pbs.twimg.com/profile_images/1597457397152219136/V4LY5yDO_400x400.png"
                  alt="Slack Logo"
                  width={48}
                  height={48}
                />
                <h6 className="font-medium mt-4 text-center">EarlyBird</h6>
              </div>

              <IconArrowsLeftRight className="text-slate-50"/>
                      
              <div className="w-32 bg-white border border-emerald-50 rounded-xl shadow-lg py-8 flex flex-col items-center">
                <Image
                  src="https://usebasin.com/assets/website/logos/slack_mark-26a6205c0caddc1942010a72f44e71749dd79f85fc39d08fae665790967dde32.svg"
                  alt="Slack Logo"
                  width={48}
                  height={48}
                />
                <h6 className="font-medium mt-4 text-center">Slack</h6>
              </div>


            </div>
          </div>


        </div>
      </section>

    </>
  )
}

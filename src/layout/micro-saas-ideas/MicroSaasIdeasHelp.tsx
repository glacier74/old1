import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

export const MicroSaasIdeasHelp: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="relative xl:px-32 sm:px-10 px-6 xl:py-20 lg:py-16 py-12 z-10">
      <div className="sm:text-3xl text-2xl text-center font-bold">How EarlyBird Can Help</div>
      <div className="max-w-7xl mx-auto lg:mt-16 md:mt-10 mt-5">
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-0 gap-5">
          <div className="flex flex-col justify-center md:w-4/5 w-full">
            <div className="sm:text-2xl text-xl font-bold">Craft your landing page in a flash</div>
            <div className="lg:text-lg text-base md:mt-4 mt-2 text-slate-700">
              Building your micro SaaS landing page is a breeze with our user-friendly interface. No
              coding skills? No problem. Pick a template, pour in your details, and watch your idea
              take flight.
            </div>
            <a className="underline lg:mt-7 mt-2" href="/sign-up">
              Build your micro SaaS landing page now!
            </a>
          </div>
          <div className="flex md:justify-end justify-center">
            <Image src="/static/temp2.jpg" alt={''} width={600} height={600} quality={100} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-0 gap-5 md:mt-0 mt-8">
          <div className="flex md:justify-start justify-center md:order-1 order-2">
            <Image src="/static/temp2.jpg" alt={''} width={600} height={600} quality={100} />
          </div>
          <div className="flex flex-col justify-center items-center md:order-2 order-1">
            <div className="md:w-4/5 w-full">
              <div className="sm:text-2xl text-xl font-bold">Capture leads like a pro</div>
              <div className="lg:text-lg text-base md:mt-4 mt-2 text-slate-700">
                With our built-in email capture feature, capturing leads becomes child's play. As
                your future customers join your waitlist, their details are smoothly collected and
                organized. Welcome to the age of effortless data gathering.
              </div>
              <a className="underline lg:mt-7 mt-2" href="/sign-up">
                Start capturing leads now!
              </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-0 gap-5 md:mt-0 mt-8">
          <div className="flex flex-col justify-center md:w-4/5 w-full">
            <div className="sm:text-2xl text-xl font-bold">Master your metrics</div>
            <div className="lg:text-lg text-base md:mt-4 mt-2 text-slate-700">
              Keep your finger on the pulse of your waitlist's performance with our crisp and
              comprehensive analytics. Monitor sign-ups, track progress, and fine-tune your
              strategies based on live data. The power of informed decision-making is at your
              fingertips.
            </div>
            <a className="underline lg:mt-7 mt-2" href="/sign-up">
              Track your micro SaaS success today!
            </a>
          </div>
          <div className="flex md:justify-end justify-center">
            <Image src="/static/temp2.jpg" alt={''} width={600} height={600} quality={100} />
          </div>
        </div>
      </div>
    </section>
  )
}

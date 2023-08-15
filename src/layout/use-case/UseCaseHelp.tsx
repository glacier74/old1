import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

export const UseCaseHelp: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="lg:py-20 py-12 md:px-12 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 grid-cols-1 md:gap-0 gap-5">
          <div className="flex flex-col justify-center md:w-4/5 w-full">
            <div className="sm:text-3xl text-2xl font-semibold">
              Craft your landing page in a flash
            </div>
            <div className="lg:text-base text-sm lg:mt-8 md:mt-4 mt-2 sm:font-medium font-normal">
              Building your micro SaaS landing page is a breeze with our user-friendly interface. No
              coding skills? No problem. Pick a template, pour in your details, and watch your idea
              take flight.
            </div>
            <div className="lg:text-sm text-xs underline lg:mt-7 mt-3 sm:font-medium font-normal">
              Build your micro SaaS landing page now!
            </div>
          </div>
          <div className="flex md:justify-end justify-center">
            <Image src="/static/temp2.jpg" alt={''} width={600} height={600} quality={100} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 md:gap-0 gap-5 md:mt-0 mt-8">
          <div className="flex md:justify-start justify-center sm:order-1 order-2">
            <Image src="/static/temp2.jpg" alt={''} width={600} height={600} quality={100} />
          </div>
          <div className="flex flex-col justify-center items-center md:order-2 order-1">
            <div className="md:w-4/5 w-full">
              <div className="sm:text-3xl text-2xl font-semibold">Capture leads like a pro</div>
              <div className="lg:text-base text-sm lg:mt-8 md:mt-4 mt-2 sm:font-medium font-normal">
                With our built-in email capture feature, capturing leads becomes child's play. As
                your future customers join your waitlist, their details are smoothly collected and
                organized. Welcome to the age of effortless data gathering.
              </div>
              <div className="lg:text-sm text-xs underline lg:mt-7 mt-3 sm:font-medium font-normal">
                Start capturing leads now!
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 md:gap-0 gap-5 md:mt-0 mt-8">
          <div className="flex flex-col justify-center md:w-4/5 w-full">
            <div className="sm:text-3xl text-2xl font-semibold">Master your metrics</div>
            <div className="lg:text-base text-sm lg:mt-8 md:mt-4 mt-2 sm:font-medium font-normal">
              Keep your finger on the pulse of your waitlist's performance with our crisp and
              comprehensive analytics. Monitor sign-ups, track progress, and fine-tune your
              strategies based on live data. The power of informed decision-making is at your
              fingertips.
            </div>
            <div className="lg:text-sm text-xs underline lg:mt-7 mt-3 sm:font-medium font-normal">
              Track your micro SaaS success today!
            </div>
          </div>
          <div className="flex md:justify-end justify-center">
            <Image src="/static/temp2.jpg" alt={''} width={600} height={600} quality={100} />
          </div>
        </div>
      </div>
    </section>
  )
}

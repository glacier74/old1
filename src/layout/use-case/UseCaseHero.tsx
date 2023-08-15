import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

export const UseCaseHero: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="max-w-7xl mx-auto lg:py-20 py-12 md:px-12 px-6 z-10 grid sm:grid-cols-2 grid-cols-1 xl:gap-24 sm:gap-12 gap-5 sm:mt-0 -mt-8">
      <div className="flex flex-col justify-center lg:gap-5 gap-3">
        <div className="sm:text-3xl text-2xl font-bold">Build pre-Launch momentum</div>
        <div className="sm:text-base text-sm sm:font-medium font-normal">
          Why wait until launch to start building your user base? Get a head start and create a
          viral buzz with a waitlist landing page. Let EarlyBird guide your first flight.
        </div>
        <div className="flex justify-center items-center sm:h-10 h-8 sm:w-48 w-40 bg-[#060716] rounded cursor-pointer">
          <span className="text-white sm:text-sm text-xs">Start Your Journey</span>
        </div>
      </div>
      <div className="flex lg:justify-end justify-center">
        <Image src="/static/temp2.jpg" alt={''} width={500} height={500} quality={100} />
      </div>
    </section>
  )
}

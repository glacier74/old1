import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import UserImageIllustration from '~public/static/all-nighter.png'

export const HomeUserImage: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="relative py-32">
      <h2 className="max-w-3xl mx-auto text-3xl md:text-6xl font-bold text-center">
        Stop burning time and money at early stage
      </h2>
      <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-4 gap-4 place-items-center">
        <div className="col-span-2">
          <div className="py-4 md:py-8 px-4 text-slate-900">
            <div className="w-full mt-8">
              <h3 className="text-2xl font-medium mb-2">
                🕒 How long could it take to launch a business?
              </h3>
              <p>It could range from a week to a year, depending on the individual.</p>
              <h3 className="text-2xl font-medium mt-8 mb-2">💰 And how much would it cost?</h3>
              <p>It could cost anywhere from hundreds to thousands of dollars, or even more.</p>
              <p className="mt-8">
                It's important to be mindful of your time and money when starting a business.{' '}
                <span className="font-bold">You don't want to regret wasting either of them.</span>
              </p>
              <p className="text-xl font-medium mt-8">
                So what if you could build a landing page in 10 minutes to test if people are truly
                interested in what you are creating?
              </p>
              <p className="mt-4">
                Read story 👉{' '}
                <Link
                  href="https://earlybird.im/blog/how-we-built-namebridge-in-16-hours-with-a-0-budget/"
                  className="text-emerald-700 underline"
                  target="_blank"
                  rel="noreferrer"
                  title="How we built a side project in 16 hours with EarlyBird"
                >
                  how we built a side project in 16 hours with EarlyBird
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-2 p-8">
          <Image
            src={UserImageIllustration}
            alt="Avoid burning time and money at early stage "
            className="w-full object-cover"
            quality={100}
            width={548}
          />
        </div>
      </div>
    </section>
  )
}

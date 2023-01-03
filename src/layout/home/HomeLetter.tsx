import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

import FounderSign from '~public/static/founder-sign.png'

export const HomeLetter: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="relative pb-0 bg-slate-50">
      <div className="py-32 px-4 md:px-8 max-w-4xl mx-auto">
        <h2 className="text-5xl font-extrabold text-center">Founder letter</h2>
        <div className="mt-8 shadow-xl p-8 md:p-16 text-xl md:text-2xl tracking-wide bg-white text-slate-700 space-y-5 rounded-lg antialiased">
          <p>Hi everyone,</p>
          <p>I’m Luo, the founder of EarlyBird.</p>
          <p>
            I have been an entrepreneur for a long time and have learned from my own mistakes. And I
            want to use my experiences to help others avoid making the same mistakes.
          </p>
          <p>
            Starting a business is exciting, but it can also be challenging. You are already ahead
            of many people if you have a good idea.
          </p>
          <p>
            However, more is needed - you need the determination to test and validate your idea in
            the market.
          </p>
          <p>
            And I have seen too many similar failures, including my own, where I had an idea, bought
            a domain name, and even hired developers to create what I thought was the perfect
            product, then built something, only to find out after it that there was no demand for
            it. I have wasted a lot of time, effort, and money.
          </p>
          <p>These life experiences led me to build EarlyBird.</p>
          <p>
            With EarlyBird, it is easy for anyone to validate their idea, and you don't need coding
            skills. You can create a beautiful landing page in just 10 minutes, add a conversion
            action block, and you are ready to attract potential customers.{' '}
          </p>
          <p>
            If any of them show interest in your idea and are willing to pay, it's a sign that your
            concept is successful. Well done on completing the idea validation process!{' '}
          </p>
          <p>I hope EarlyBird helps you succeed in the next stage of your journey. </p>
          <p>Wishing you all the best!</p>
          <p className="mt-4">
            <Image
              src={FounderSign}
              alt="Signature by EarlyBird founder"
              className="w-48"
              quality={100}
            />
          </p>
        </div>
      </div>
    </section>
  )
}

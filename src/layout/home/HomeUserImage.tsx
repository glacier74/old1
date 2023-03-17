import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import UserImageIllustration from '~public/static/all-nighter.png'

export const HomeUserImage: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="relative pb-0">
      <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-4 gap-4 place-items-center">
        <div className="col-span-2">
          <div className="py-16 md:py-32 px-4 text-slate-900">
            <h2 className="w-full text-2xl md:text-4xl font-bold">
              Stop burning time and money <br /> at early stage
            </h2>
            <div className='w-full mt-8'>
              <h3 className='text-xl font-medium'>How long could it take you to launch a new business?</h3>
              <p>- It could range from a week to a year, depending on the individual.</p>
              <h3 className='text-xl font-medium mt-4'>And how much would it cost?</h3>
              <p>- It could cost anywhere from hundreds to thousands of dollars, or even more.</p>
              <p className='mt-4'>It's important to be mindful of your time and money when starting a business. <span className='font-bold'>You don't want to regret wasting either of them.</span></p>
              <p className='mt-4'>So what if you could build a landing page in 10 minutes to test if people are truly interested in what you are creating?</p>
              <p className="mt-4">See <Link
              href="https://earlybird.im/blog/how-we-built-namebridge-in-16-hours-with-a-0-budget/"
              className="text-emerald-600"
              target="_blank"
              title="How we built a side project in 16 hours with EarlyBird"
            >
              how we built a side project in 16 hours with EarlyBird
            </Link></p>
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

import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import UserImageIllustration from '~public/static/all-nighter.png'

export const HomeUserImage: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="relative pb-0 bg-emerald-100">
      <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-4 gap-4 place-items-center">
        <div className="col-span-2">
          <div className="py-16 md:py-32 px-8 text-slate-900">
            <h2 className="w-full text-3xl md:text-5xl text-left font-extrabold">
              Avoid burning time and money at early stage
            </h2>
            <div className="w-full mt-4 text-lg md:text-xl text-slate-900">
              Ensure that your product or business idea has potential and that the most critical
              assumptions regarding the idea are valid.
            </div>
            <div className="mt-8">
              <div>
                <h3 className="text-2xl font-medium mb-2">EarlyBird is for</h3>
                <ul className="list-disc text-lg pl-4 leading-loose">
                  <li>Users without development and design skills</li>
                  <li>Running a simple online business</li>
                  <li>Finding the best product-market fit</li>
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-medium mb-2">
                  EarlyBird is <span className="font-extrabold">NOT</span> for
                </h3>
                <ul className="list-disc text-lg pl-4 leading-loose">
                  <li>Building a complex web app</li>
                  <li>Launching a website with bespoke design</li>
                  <li>Running an offensive or illegal business</li>
                </ul>
              </div>
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

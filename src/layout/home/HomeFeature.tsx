import Image from 'next/image'
import { FC } from 'react'

import FeatureBuildImage from '~public/static/feature-build.png'
import FeaturePitchImage from '~public/static/feature-pitch.png'
import FeatureValidateImage from '~public/static/feature-validate.png'

export const HomeFeature: FC = () => (
  <>
    <section className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2">
        <div className="sm:px-16 px-8 pt-8 flex flex-col justify-center">
          <h3 className="text-2xl md:text-4xl font-bold text-slate-900">Build a landing page</h3>
          <div className="mt-5 mb-7 max-w-xl text-lg md:text-xl text-slate-500">
            Easily build a simple landing page for your idea in minutes from a template. Seek no
            help from a designer or developer.
          </div>
        </div>
        <div className="py-0 md:py-16">
          <Image
            src={FeatureBuildImage}
            alt="Create your own minimum-viable-product landing page"
            className="w-full object-cover rounded-md shadow-lg"
            quality={100}
            width={984}
          />
        </div>
      </div>
    </section>

    <section className="max-w-7xl mx-auto grid md:grid-cols-2">
      <div className="flex justify-end order-last md:order-first">
        <div className="py-0 md:py-16">
          <Image
            src={FeaturePitchImage}
            alt="Channel your idea into a convincing pitch deck for the masses"
            className="w-full object-cover rounded-md shadow-lg"
            quality={100}
            width={984}
          />
        </div>
      </div>
      <div className="flex items-center sm:px-16 px-8 md:pr-32 pt-16 order-first md:order-last">
        <div className="max-w-xl mx-auto">
          <div className="text-2xl md:text-4xl font-bold">Market your idea</div>
          <div className="mt-5 mb-7 w-full text-lg md:text-xl leading-tight text-slate-500">
            Transform your idea into a compelling pitch deck that interests your audience. Spend
            less time creating copies.
          </div>
        </div>
      </div>
    </section>

    <section className="max-w-7xl mx-auto grid md:grid-cols-2">
      <div className="flex items-center justify-end sm:pl-16 sm:pr-24 px-8 pt-16 pb-8">
        <div className="max-w-xl mx-auto">
          <div className="text-2xl md:text-4xl font-bold ">Validate the idea</div>
          <div className="mt-5 w-full text-lg md:text-xl leading-tight text-slate-500">
            Start engaging with potential customers. Validate the demand for your product and accept
            payments before launch.
          </div>
        </div>
      </div>
      <div className="py-0 md:py-16">
        <Image
          src={FeatureValidateImage}
          alt="Start engaging with potential buyers and communities"
          className="w-full object-cover rounded-md shadow-lg"
          quality={100}
          width={984}
        />
      </div>
    </section>
  </>
)

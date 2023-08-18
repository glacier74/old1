import Image from 'next/image'
import { FC } from 'react'

import FeatureBuildImage from '~public/static/feature-build.png'
import FeaturePitchImage from '~public/static/feature-pitch.png'
import FeatureValidateImage from '~public/static/feature-validate.png'

export const HomeFeature: FC = () => (
  <>
    <section className="bg-sky-50 grid md:grid-cols-2">
      <div className="flex md:justify-end py-8 md:py-32 px-8 md:pr-32">
        <h2 className="text-2xl md:text-4xl">Here's how it works</h2>
      </div>
      <div className="px-8">
        <div className="py-8 md:py-32">
          <div className="text-3xl md:text-5xl font-bold text-slate-900">Build a landing page</div>
          <div className="mt-5 mb-7 max-w-xl text-xl md:text-2xl leading-tight text-slate-700">
            Easily build a simple landing page for your idea in minutes from a template or start
            fresh. Seek no help from a designer or developer.
          </div>
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

    <section className="grid md:grid-cols-2">
      <div className="flex justify-end px-8">
        <div className="py-8 md:py-32">
          <Image
            src={FeaturePitchImage}
            alt="Channel your idea into a convincing pitch deck for the masses"
            className="w-full object-cover rounded-md shadow-lg"
            quality={100}
            width={984}
          />
        </div>
      </div>
      <div className="flex items-center py-8 md:py-32 px-8 md:pr-32">
        <div className="max-w-xl mx-auto">
          <div className="text-3xl md:text-5xl font-bold">Market your idea</div>
          <div className="mt-5 mb-7 w-full text-xl md:text-2xl leading-tight text-slate-700">
            Transform your idea into a compelling pitch deck that interests your audience. Spend
            less time creating copies.
          </div>
        </div>
      </div>
    </section>

    <section className="bg-amber-50/70 grid md:grid-cols-2">
      <div className="flex items-center justify-end px-8 pt-8">
        <div className="py-8 md:py-32 max-w-xl mx-auto">
          <div className="text-3xl md:text-5xl font-bold ">Validate the idea</div>
          <div className="mt-5 w-full text-xl md:text-2xl leading-tight text-slate-700">
            Start engaging with potential customers. Validate the demand for your product and accept
            payments before launch.
          </div>
        </div>
      </div>
      <div className="pb-8 md:py-32 px-8">
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

import Image from 'next/image'
import { FC } from 'react'

import FeatureBuildImage from '~public/static/feature-build.png'
import FeatureComponentImage from '~public/static/feature-component.png'
import FeaturePitchImage from '~public/static/feature-pitch.png'
import FeatureValidateImage from '~public/static/feature-validate.png'

export const HomeFeature: FC = () => (
  <>
    <section>
      <div className="max-w-3xl mx-auto px-5">
        <div className="pt-32 md:pt-48 pb-10">
          <div className="text-2xl md:text-4xl font-extrabold text-slate-900">Build</div>
          <div className="mt-5 mb-7 w-full text-xl md:text-2xl leading-tight text-slate-500">
            <span className="text-green-500">
              Easily build your minimum-viable-product landing page in minutes.
            </span>{' '}
            Seek no help from a designer or developer.
          </div>
          <Image
            src={FeatureBuildImage}
            alt="Create your own minimum-viable-product landing page"
            className="w-full object-cover"
            quality={100}
          />
          <div className="mt-16 md:mt-24 flex flex-col md:flex-row md:items-center">
            <div className="flex-1">
              <h2 className="text-base md:text-lg mb-7 text-slate-500 pr-8">
                Add a UI block from the dashboard and customize it to your liking. Stack it like Legos to create unique layouts. Feel free to think outside the box and let your imagination run wild.
              </h2>
            </div>
            <div className="flex-1">
              <Image className="w-full rounded-md" src={FeatureComponentImage} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className="max-w-3xl mx-auto px-5">
        <div className="pt-16 md:pt-28 pb-10 text-slate-900">
          <div className="text-2xl md:text-4xl font-extrabold">Pitch</div>
          <div className="mt-5 mb-7 w-full text-xl md:text-2xl leading-tight text-slate-500">
            <span className="text-amber-500">
              Transform your idea into a compelling pitch deck that interests your audience
            </span>{' '}
            Spend less time creating copies.
          </div>
          <Image
            src={FeaturePitchImage}
            alt="Channel your idea into a convincing pitch deck for the masses"
            className="w-full object-cover rounded-md"
            quality={100}
          />
        </div>
      </div>
    </section>

    <section>
      <div className="max-w-3xl mx-auto px-5">
        <div className="pt-16 md:pt-28 pb-10 text-slate-900">
          <div className="text-2xl md:text-4xl font-extrabold ">Validate</div>
          <div className="mt-5 mb-7 w-full text-xl md:text-2xl leading-tight text-slate-500">
            <span className="text-blue-500">Start engaging with potential customers.</span> Validate
            the demand for your product and accept payments before launch.
          </div>
          <Image
            src={FeatureValidateImage}
            alt="Start engaging with potential buyers and communities"
            className="w-full object-cover rounded-md"
            quality={100}
          />
        </div>
      </div>
    </section>
  </>
)

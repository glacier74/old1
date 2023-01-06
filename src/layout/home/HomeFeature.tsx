import Image from 'next/image'
import { FC } from 'react'

import FeatureBuildImage from '~public/static/feature-build.png'
import FeatureComponentImage from '~public/static/feature-component.png'
import FeaturePitchImage from '~public/static/feature-pitch.png'
import FeatureValidateImage from '~public/static/feature-validate.png'

export const HomeFeature: FC = () => (
  <>
    <section>
      <div className="max-w-5xl mx-auto px-5">
        <div className="pt-32 md:pt-48 pb-10">
          <div className="text-3xl md:text-5xl font-extrabold text-slate-900">
            Build a landing page in 10 minutes
          </div>
          <div className="mt-5 mb-7 w-full text-xl md:text-2xl leading-tight text-slate-700">
            Easily build your minimum-viable-product landing page in minutes. Seek no help from a
            designer or developer.
          </div>
          <Image
            src={FeatureBuildImage}
            alt="Create your own minimum-viable-product landing page"
            className="w-full object-cover"
            quality={100}
            width={984}
          />
        </div>
      </div>
    </section>

    <section>
      <div className="max-w-5xl mx-auto px-5">
        <div className="pt-16 md:pt-28 pb-10 text-slate-900">
          <div className="text-3xl md:text-5xl font-extrabold">Pitch to your customers</div>
          <div className="mt-5 mb-7 w-full text-xl md:text-2xl leading-tight text-slate-700">
            Transform your idea into a compelling pitch deck that interests your audience. Spend
            less time creating copies.
          </div>
          <Image
            src={FeaturePitchImage}
            alt="Channel your idea into a convincing pitch deck for the masses"
            className="w-full object-cover rounded-md"
            quality={100}
            width={984}
          />
        </div>
      </div>
    </section>

    <section>
      <div className="max-w-5xl mx-auto px-5">
        <div className="pt-16 md:pt-28 pb-10 text-slate-900">
          <div className="text-3xl md:text-5xl font-extrabold ">Validate as quick as possible</div>
          <div className="mt-5 mb-7 w-full text-xl md:text-2xl leading-tight text-slate-700">
            Start engaging with potential customers. Validate the demand for your product and accept
            payments before launch.
          </div>
          <Image
            src={FeatureValidateImage}
            alt="Start engaging with potential buyers and communities"
            className="w-full object-cover rounded-md"
            quality={100}
            width={984}
          />
        </div>
      </div>
    </section>
  </>
)

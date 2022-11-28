import Image from 'next/image'
import { FC } from 'react'

import FeatureBuildImage from '~public/static/feature-build.png'
import FeatureComponentImage from '~public/static/feature-component.png'
import FeaturePitchImage from '~public/static/feature-pitch.png'
import FeatureValidateImage from '~public/static/feature-validate.png'

export const HomeFeature: FC = () => (
  <>
    <section>
      <div className="max-w-7xl mx-auto px-5">
        <div className="pt-32 md:pt-48 pb-10 text-slate-50">
          <div className="text-4xl md:text-7xl font-extrabold bg-gradient-to-r from-slate-200 to-green-400 bg-clip-text text-transparent">
            Build
          </div>
          <div className="mt-5 mb-7 w-full md:w-3/5 text-2xl md:text-4xl leading-tight font-medium">
            <span className="text-green-400">
              Create your own minimum-viable-product landing page.
            </span>{' '}
            You can design and build it in a few minutes without a developer.
          </div>
          <Image
            src={FeatureBuildImage}
            alt="Create your own minimum-viable-product landing page"
            className="w-full object-cover"
            quality={100}
          />
          <div className="mt-16 md:mt-24 flex flex-col md:flex-row md:items-center">
            <div className="flex-1">
              <h2 className="text-lg md:text-2xl mb-7 text-slate-50 pr-8">
                Add a component type from the dashboard, spice it up, and stack it like Legos. Defy
                the normal, and go wild with your creativity.
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
      <div className="max-w-7xl mx-auto px-5">
        <div className="pt-16 md:pt-28 pb-10 text-slate-50">
          <div className="text-4xl md:text-7xl font-extrabold bg-gradient-to-r from-slate-200 to-amber-400 bg-clip-text text-transparent">
            Pitch
          </div>
          <div className="mt-5 mb-7 w-full md:w-3/5 text-2xl md:text-4xl leading-tight font-medium">
            <span className="text-amber-400">
              Channel your idea into a convincing pitch deck for the masses.
            </span>{' '}
            You can focus more on growth instead of creating copies.
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
      <div className="max-w-7xl mx-auto px-5">
        <div className="pt-16 md:pt-28 pb-10 text-slate-50">
          <div className="text-4xl md:text-7xl font-extrabold bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
            Validate
          </div>
          <div className="mt-5 mb-7 w-full md:w-3/5 text-2xl md:text-4xl leading-tight font-medium">
            <span className="text-blue-400">
              Start engaging with potential buyers and communities.
            </span>{' '}
            Make as many sales as possible to validate your product before launch.
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

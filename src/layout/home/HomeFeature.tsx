import Image from 'next/image'
import { FC } from 'react'

import FeatureBuildImage from '~public/static/feature-build.png'
import FeaturePitchImage from '~public/static/feature-pitch.png'
import FeatureValidateImage from '~public/static/feature-validate.png'

export const HomeFeature: FC = () => (
  <>
    <section>
      <div className="max-w-7xl mx-auto">
        <div className="pt-28 pb-10 text-white">
          <div className="text-2xl">Build</div>
          <div className="mt-5 mb-7 w-3/5 text-4xl">
            <span className="text-sky-300">
              Create your own Minimum-Viable-Product landing page.
            </span>{' '}
            You can make it without a developer in a few minutes.
          </div>
          <Image
            src={FeatureBuildImage}
            alt="Create your own Minimum-Viable-Product landing page"
            className="w-full object-cover"
            quality={100}
          />
        </div>
      </div>
    </section>

    <section>
      <div className="max-w-7xl mx-auto">
        <div className="pt-28 pb-10 text-white">
          <div className="text-2xl">Pitch</div>
          <div className="mt-5 mb-7 w-3/5 text-4xl">
            <span className="text-purple-300">
              Channel your idea into a pitch deck that convince better.
            </span>{' '}
            You can focus more on growth instead of format.
          </div>
          <Image
            src={FeaturePitchImage}
            alt="Channel your idea into a pitch deck that convince better"
            className="w-full object-cover"
            quality={100}
          />
        </div>
      </div>
    </section>

    <section>
      <div className="max-w-7xl mx-auto">
        <div className="pt-28 pb-10 text-white">
          <div className="text-2xl">Validate</div>
          <div className="mt-5 mb-7 w-3/5 text-4xl">
            <span className="text-sky-300">Talk is cheap, show me your engagement.</span> Make as
            many sales as possible to validate your product before lunch.
          </div>
          <Image
            src={FeatureValidateImage}
            alt="Talk is cheap, show me your engagement"
            className="w-full object-cover"
            quality={100}
          />
        </div>
      </div>
    </section>
  </>
)

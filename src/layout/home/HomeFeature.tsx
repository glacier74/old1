import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

import FeatureBuildImage from '~public/static/feature-build.png'
import FeaturePitchImage from '~public/static/feature-pitch.png'
import FeatureValidateImage from '~public/static/feature-validate.png'

export const HomeFeature: FC = () => {
  const { t } = useTranslation('home')

  return (
    <>
      <section className="bg-stone-100 py-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-3xl mb-12">
              <p className="text-5xl font-bold mt-4">{t('feature.title')}</p>
              <p className="text-lg text-gray-600 mt-4">{t('feature.desc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg">
                  <div className="mb-1">
                  <Image
                    src={FeatureBuildImage}
                    alt="Create your own minimum-viable-product landing page"
                    className="w-full object-cover rounded-md"
                    quality={100}
                    width={400}
                  />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{t('feature.headline1')}</h3>
                    <p className="text-gray-600">{t('feature.subHeadline1')}</p>
                  </div>
              </div>
              <div className="bg-white rounded-lg">
                  <div className="mb-1">
                    <Image
                      src={FeaturePitchImage}
                      alt="Channel your idea into a convincing pitch deck for the masses"
                      className="w-full object-cover rounded-md"
                      quality={100}
                      width={984}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{t('feature.headline2')}</h3>
                    <p className="text-gray-600">{t('feature.subHeadline2')}</p>
                  </div>
              </div>
              <div className="bg-white rounded-lg">
                  <div className="mb-1">
                  <Image
                    src={FeatureValidateImage}
                    alt="Start engaging with potential buyers and communities"
                    className="w-full object-cover rounded-md"
                    quality={100}
                    width={984}
                  />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{t('feature.headline3')}</h3>
                    <p className="text-gray-600">{t('feature.subHeadline3')}</p>
                  </div>
              </div>
          </div>
        </div>
      </section>
    </>
  )
}

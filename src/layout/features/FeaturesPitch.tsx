import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const features = [
  {
    title: 'pitch.title1',
    desc: 'pitch.desc1',
    imageUrl: '/static/instant-outreach.png'
  },
  {
    title: 'pitch.title2',
    desc: 'pitch.desc2',
    imageUrl: '/static/custom-domain.png'
  },
  {
    title: 'pitch.title3',
    desc: 'pitch.desc3',
    imageUrl: '/static/custom-open-graph.png'
  },
  {
    title: 'pitch.title4',
    desc: 'pitch.desc4',
    imageUrl: '/static/features-walkthrough.png'
  },
  {
    title: 'pitch.title5',
    desc: 'pitch.desc5',
    imageUrl: '/static/image-carousel.png'
  },
  {
    title: 'pitch.title6',
    desc: 'pitch.desc6',
    imageUrl: '/static/social-proof.png'
  }
]

export const FeaturesPitch: FC = () => {
  const { t } = useTranslation('features')

  return (
    <section className="bg-slate-50">
      <div className="py-32 px-2 max-w-5xl mx-auto">
        <h1 className="px-4 md:px-0 text-slate-900 font-bold text-4xl">{t('pitch.headline')}</h1>
        <p className="px-4 md:px-0 mt-4 text-slate-700 text-xl">{t('pitch.subHeadline')}</p>

        <div className="mt-8 px-4 md:px-0">
          <ul role="list" className="md:grid md:grid-cols-2 md:gap-x-16">
            {features.map(feature => (
              <li key={feature.title} className="mb-16">
                <Image
                  src={feature.imageUrl}
                  alt={t(feature.title)}
                  className="w-full mb-8 rounded rounded-md"
                  width={600}
                  height={400}
                  quality={100}
                />
                <h3 className="text-slate-900 font-bold text-2xl">{t(feature.title)}</h3>
                <p className="mt-2 text-slate-500 text-lg">{t(feature.desc)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

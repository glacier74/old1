import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

const features = [
  {
    title: 'validate.title1',
    desc: 'validate.desc1',
    imageUrl: '/static/analytics.png'
  },
  {
    title: 'validate.title2',
    desc: 'validate.desc2',
    imageUrl: '/static/understand-interests.png'
  },
  {
    title: 'validate.title3',
    desc: 'validate.desc3',
    imageUrl: '/static/accept-payment.png'
  },
  {
    title: 'validate.title4',
    desc: 'validate.desc4',
    imageUrl: '/static/collect-feedback.png'
  },
  {
    title: 'validate.title5',
    desc: 'validate.desc5',
    imageUrl: '/static/polls.png'
  }
]

export const FeaturesValidate: FC = () => {
  const { t } = useTranslation('features')

  return (
    <section>
      <div className="py-32 px-2 max-w-5xl mx-auto">
        <h1 className="px-4 md:px-0 text-slate-900 font-bold text-4xl">{t('validate.headline')}</h1>
        <p className="px-4 md:px-0 mt-4 text-slate-700 text-xl">{t('validate.subHeadline')}</p>

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

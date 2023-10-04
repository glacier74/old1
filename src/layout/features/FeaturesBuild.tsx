import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

const features = [
  {
    title: 'build.title1',
    desc: 'build.desc1',
    imageUrl: '/static/start-with-template.png'
  },
  {
    title: 'build.title2',
    desc: 'build.desc2',
    imageUrl: '/static/copy-from-wise.png'
  },
  {
    title: 'build.title3',
    desc: 'build.desc3',
    imageUrl: '/static/fully-responsive.png'
  },
  {
    title: 'build.title4',
    desc: 'build.desc4',
    imageUrl: '/static/text-formatting.png'
  },
  {
    title: 'build.title5',
    desc: 'build.desc5',
    imageUrl: '/static/seo-ready.png'
  },
  {
    title: 'build.title6',
    desc: 'build.desc6',
    imageUrl: '/static/private-mode.png'
  },
  {
    title: 'build.title7',
    desc: 'build.desc7',
    imageUrl: '/static/teamwork-made-easy.png'
  }
]

export const FeaturesBuild: FC = () => {
  const { t } = useTranslation('features')

  return (
    <section>
      <div className="px-2 py-32 max-w-5xl mx-auto">
        <h1 className="px-4 md:px-0 text-slate-900 font-bold text-4xl">{t('build.headline')}</h1>
        <p className="px-4 md:px-0 mt-4 text-slate-700 text-xl">{t('build.subHeadline')}</p>

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
                <h3 className="text-slate-900 font-extrabold text-2xl">{t(feature.title)}</h3>
                <p className="mt-2 text-slate-500 text-lg">{t(feature.desc)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

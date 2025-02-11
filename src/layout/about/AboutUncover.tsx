import { useTranslation } from 'next-i18next'
import { FC } from 'react'

const dataUncover = [
  {
    name: 'uncover.name1',
    url: '/blog',
    desc: 'uncover.desc1'
  },
  {
    name: 'uncover.name2',
    url: 'https://changelog.earlybird.im',
    desc: 'uncover.desc2'
  },
  {
    name: 'uncover.name3',
    url: 'https://help.earlybird.im/user/roadmap.html',
    desc: 'uncover.desc3'
  }
]

export const AboutUncover: FC = () => {
  const { t } = useTranslation('about')

  return (
    <section className="relative max-w-5xl mx-auto xl:pb-24 md:pb-16 pb-12 md:px-12 px-6 z-10 text-center">
      <div className="sm:text-4xl text-2xl font-bold">{t('uncover.headline')}</div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-9 gap-5 text-left sm:mt-11 mt-5">
        {dataUncover.map((uncover, index) => (
          <div key={index} className="flex flex-col justify-between p-8 w-full gap-3">
            <div>
              <a className="text-lg font-bold underline" href={uncover.url}>
                {t(uncover.name)} <span>-&gt;</span>
              </a>
              <div className="mt-2">{t(uncover.desc)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

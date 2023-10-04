import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { IconUserCase1, IconUserCase2 } from '~/components'

export const HomeUsecase: FC = () => {
  const { t } = useTranslation('home')

  return (
    <section className="relative grid md:grid-cols-2">
      <div className="bg-emerald-400/20 sm:py-32 py-16">
        <div className="px-8 md:pr-32">
          <div className="flex justify-end">
            <div>
              <div className="mb-8">
                <IconUserCase1 />
              </div>
              <h2 className="sm:text-3xl text-2xl font-bold mb-4">{t('useCase.for')}</h2>
              <ul className="list-disc sm:text-xl text-lg pl-4 sm:space-y-2 space-y-1">
                <li>{t('useCase.for1')}</li>
                <li>{t('useCase.for2')}</li>
                <li>{t('useCase.for3')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-yellow-300/10 sm:py-32 py-16">
        <div className="px-8 md:pl-32">
          <div className="mb-8">
            <IconUserCase2 />
          </div>
          <h2 className="sm:text-3xl text-2xl font-bold mb-4">{t('useCase.notFor')}</h2>
          <ul className="list-disc sm:text-xl text-lg pl-4 sm:space-y-2 space-y-1">
            <li>{t('useCase.notFor1')}</li>
            <li>{t('useCase.notFor2')}</li>
            <li>{t('useCase.notFor3')}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

import { useTranslation } from 'next-i18next'

import { HomeLayout } from '~/layout'

export const PublicSiteUnpublished = (): JSX.Element => {
  const { t } = useTranslation('publicSite')

  return (
    <HomeLayout
      seo={{
        title: t('pageUnpublished')
      }}
      isHelpButtonShow={false}
    >
      <section className="w-screen h-screen flex flex-col justify-center">
        <div className="relative text-slate-900 max-w-7xl mx-auto px-8 md:px-12 z-10">
          <div className="text-center">
            <h1 className="text-5xl tracking-tight max-w-3xl font-semibold mb-4 mt-10">
              {t('pageUnpublished')}
            </h1>
            <div className="max-w-2xl mx-auto ml-4 text-gray-500 text-xl">{t('publishTip')}</div>
          </div>
          <div className="mt-8 pb-8">
            <div className="flex justify-center flex-col md:flex-row items-center space-y-5 space-x-0 md:space-y-0 md:space-x-5">
              <a
                className="w-auto px-4 py-3 md:px-6 md:py-3 text-lg text-center font-bold bg-slate-900 rounded-md text-white"
                title="home.signUp"
                href="/"
              >
                {t('backToHomepage')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </HomeLayout>
  )
}

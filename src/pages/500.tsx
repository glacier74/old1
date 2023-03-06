import { useTranslation } from 'next-i18next'

import { HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import { withTranslations } from '~/utils'

const ServerError = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <HomeLayout
      seo={{
        title: t('common.500')
      }}
    >
      <HomeHeader />
      <section
        className="flex flex-col justify-center"
        style={{
          height: 'calc(100vh - 72px)'
        }}
      >
        <div className="relative text-slate-900 max-w-7xl mx-auto px-8 md:px-12 z-10">
          <div className="text-center">
            <h1 className="text-4xl leading-tight md:text-6xl font-extrabold md:leading-none">
              Oops, something went wrong
            </h1>
            <div className="max-w-2xl mx-auto text-slate-700 text-lg md:text-xl mt-8 font-medium">
              An server error 500 occurred. Apologize for the inconvenience, and we are fixing the
              problem actively. Please come back later.
            </div>
          </div>
          <div className="mt-8 pb-8">
            <div className="flex justify-center flex-col md:flex-row items-center space-y-5 space-x-0 md:space-y-0 md:space-x-5">
              <a
                className="w-auto px-4 py-3 md:px-6 md:py-3 text-lg text-center font-bold bg-slate-900 rounded-md text-white"
                title="home.signUp"
                href="/"
              >
                Back to homepage
              </a>
            </div>
          </div>
        </div>
      </section>
      <HomeFooter />
    </HomeLayout>
  )
}

export const getStaticProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default ServerError

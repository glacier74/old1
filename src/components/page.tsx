import { ReactNode, useEffect } from 'react'
import { NextSeo, NextSeoProps } from 'next-seo'
import { useTranslation } from 'react-i18next'
import { Sidebar } from '@/components/team'
import { useStoreContext } from '@/store'
import { TeamService, UserService } from '@/service'

interface PageProps {
  seo: NextSeoProps
  children: ReactNode
}

export const Page = ({ seo, children }: PageProps): JSX.Element => {
  const { t } = useTranslation()

  const seoProps: NextSeoProps = {
    title: t('app.name'),
    description: t('app.description'),
    ...seo
  }

  return (
    <>
      {/* SEO */}
      <NextSeo {...seoProps} />

      {/* HTML */}
      {children}
    </>
  )
}

export const CommonPage = ({ seo, children }: PageProps): JSX.Element => {
  return (
    <Page seo={seo}>
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">{children}</div>
      </div>
    </Page>
  )
}

interface TeamPageProps extends PageProps {}

export const TeamPage = ({ seo, children }: TeamPageProps): JSX.Element => {
  const { dispatch } = useStoreContext()

  async function fetchInitialData() {
    const [teams, user] = await Promise.all([TeamService.teams(), UserService.user()])

    dispatch({
      type: 'setInitialData',
      payload: {
        teams,
        user,
        isReady: true
      }
    })
  }

  useEffect(() => {
    fetchInitialData()
  }, [])

  return (
    <Page seo={seo}>
      <div className="w-full min-h-screen bg-white">
        <Sidebar />

        <div className="container min-h-screen">
          <main className="relative z-0 focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 md:px-8">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </Page>
  )
}

import { useTranslation } from 'next-i18next'

import { HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import {
  TemplatesDetailCTA,
  TemplatesDetailCategories,
  TemplatesDetailHero,
  TemplatesDetailMake,
  TemplatesDetailMakeInt,
  UseCaseReview,
  UseCaseTemplates
} from '~/layout/templates'
import { TemplateService } from '~/service/template'
import { withTranslations } from '~/utils'

const TemplateDetail = (props: any): JSX.Element => {
  const { t } = useTranslation()

  return (
    <>
      <HomeLayout
        seo={{
          title: t('templates.detailTitle', { title: props.record.Name }),
          url: `/templates/${props.record.slug}`
        }}
      >
        <HomeHeader />
        <TemplatesDetailHero />
        <TemplatesDetailCTA />
        <TemplatesDetailMake />
        <TemplatesDetailMakeInt />
        <div className="md:px-2 px-0 lg:pt-20 pt-12 z-10">
          <UseCaseReview />
        </div>
        <div className="md:px-2 px-0 z-10">
          <UseCaseTemplates />
        </div>
        <TemplatesDetailCategories />
        <HomeFooter />
      </HomeLayout>
    </>
  )
}

export const getServerSideProps = withTranslations(async ({ query }) => {
  const record = await TemplateService.findBySlug(query.slug.toLowerCase())

  if (!record) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      record
    }
  }
})

export default TemplateDetail

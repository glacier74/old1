import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import {
  TemplatesDetailCTA,
  TemplatesDetailHero,
  TemplatesDetailMake,
  TemplatesDetailMakeInt,
  UseCaseReview,
  UseCaseTemplates
} from '~/layout/templates'
import { Integration2Service } from '~/service/integration2'
import { TemplateService } from '~/service/template'
import { TestimonialService } from '~/service/testimonial'
import { withTranslations } from '~/utils'

interface TemplateDetailProps {
  template: TemplateRecord
  similars: TemplateRecord[]
  integrations: IntegrationRecord[]
  testimonials: TestimonialRecord[]
  categories: string[]
}

const TemplateDetail: FC<TemplateDetailProps> = ({
  template,
  similars,
  integrations,
  testimonials,
  categories
}) => {
  const { t } = useTranslation()

  return (
    <>
      <HomeLayout
        seo={{
          title: t('templates.detailTitle', { title: template.Name }),
          url: `/templates/${template.slug}`
        }}
      >
        <HomeHeader />
        <TemplatesDetailHero template={template} />
        <TemplatesDetailCTA template={template} />
        <TemplatesDetailMake />
        <TemplatesDetailMakeInt integrations={integrations} />
        <div className="md:px-2 px-0 lg:pt-20 pt-12 z-10">
          <UseCaseReview testimonials={testimonials} />
        </div>
        <div className="md:px-2 px-0 z-10">
          <UseCaseTemplates template={template} similars={similars} />
        </div>
        <HomeFooter />
      </HomeLayout>
    </>
  )
}

export const getServerSideProps = withTranslations(async ({ query }) => {
  const slug = query.slug.toLowerCase()
  const [integrations, templates, testimonials] = await Promise.all([
    Integration2Service.records(),
    TemplateService.records(),
    TestimonialService.records()
  ])

  const template = templates.find(t => t.slug.toLowerCase() === slug)

  if (!template) {
    return {
      notFound: true
    }
  }

  const similars = templates.filter(
    t => t.Category === template.Category && t.slug.toLowerCase() !== slug
  )
  const categories = Array.from(new Set(templates.map(t => t.Category))).filter(
    c => c !== template.Category
  )

  return {
    props: {
      template,
      similars: similars.splice(0, 6),
      categories,
      testimonials: testimonials.splice(0, 6),
      integrations: integrations.splice(0, 6)
    }
  }
})

export default TemplateDetail

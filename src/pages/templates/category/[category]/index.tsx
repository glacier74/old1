import { arrayUnique, conv } from '@nily/utils'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import { TemplatesHero, TemplatesView } from '~/layout/templates'
import { TemplateService } from '~/service/template'
import { withTranslations } from '~/utils'

interface TemplatesProps {
  categories: string[]
  category: string
  templates: TemplateRecord[]
  total: number
  page: number
  limit: number
}

const Templates: FC<TemplatesProps> = ({ categories, category, templates, total, page, limit }) => {
  const { t } = useTranslation()
  const title = category.replace(/^\S/, (s: string) => s.toUpperCase())

  return (
    <HomeLayout
      seo={{
        title: t('templates.detailTitle', { title }),
        url: `/templates/category/${category}`
      }}
    >
      <HomeHeader />
      <TemplatesHero categories={categories} category={category} />
      <TemplatesView
        templates={templates}
        category={category}
        total={total}
        page={page}
        limit={limit}
      />
      <HomeFooter />
    </HomeLayout>
  )
}

export const getServerSideProps = withTranslations(async ({ query }) => {
  const category = query.category.toLowerCase()

  let templates = await TemplateService.records()
  const categories = arrayUnique(templates.map(t => t.Category))

  const limit = 9
  const page = conv.int(query.page, 1)!

  // Filter template
  templates = templates.filter(t => t.LowerCaseCategory === category)

  return {
    props: {
      categories,
      category,
      templates: templates.slice((page - 1) * limit, page * limit),
      total: templates.length,
      page,
      limit
    }
  }
})

export default Templates

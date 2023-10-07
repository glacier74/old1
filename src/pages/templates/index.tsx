import { arrayUnique, conv } from '@nily/utils'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import { TemplatesHero, TemplatesView } from '~/layout/templates'
import { TemplateService } from '~/service/template'
import { withTranslations } from '~/utils'

interface TemplatesProps {
  categories: string[]
  templates: TemplateRecord[]
  total: number
  page: number
  limit: number
}

const Templates: FC<TemplatesProps> = ({ categories, templates, total, page, limit }) => {
  const { t } = useTranslation('templates')

  return (
    <HomeLayout
      seo={{
        title: t('title'),
        url: '/templates'
      }}
    >
      <HomeHeader />
      <TemplatesHero categories={categories} />
      <TemplatesView templates={templates} total={total} page={page} limit={limit} />
      <HomeFooter />
    </HomeLayout>
  )
}

export const getServerSideProps = withTranslations(async ({ query }) => {
  const templates = await TemplateService.records()
  const categories = arrayUnique(templates.map(t => t.Category))

  const limit = 9
  const page = conv.int(query.page, 1)!

  return {
    props: {
      categories,
      templates: templates.slice((page - 1) * limit, page * limit),
      total: templates.length,
      page,
      limit
    }
  }
},
['common', 'templates']
)

export default Templates

import { NextPageContext } from 'next'

import { CollectionService } from '~/service/collection'
import { Integration2Service } from '~/service/integration2'
import { PublicApiService } from '~/service/public-api'
import { TemplateService } from '~/service/template'

const PUBLIC_HOMEPAGE = process.env.NEXT_PUBLIC_HOMEPAGE

const Sitemap = () => {
  //
}

function getUrls(list: AnyMap<string>[], priority: number) {
  return list
    .map(
      row =>
        `<url>
      <loc>${row.url}</loc>
      <lastmod>${row.updatedAt}</lastmod>
      <priority>${priority}</priority>
    </url>`
    )
    .join('\n')
}

async function getSubdomains() {
  const result = await PublicApiService.sitemapSubdomains()

  return getUrls(result, 0.5)
}

async function getCollections() {
  const collections = await CollectionService.records()
  const tmpCategories = new Set<string>()

  const categoryUrls: AnyMap<string>[] = []
  const collectionUrls: AnyMap<string>[] = []

  collections.reverse().forEach(row => {
    const category = row.LowerCaseCategory

    if (!tmpCategories.has(category)) {
      tmpCategories.add(category)

      categoryUrls.push({
        url: `${PUBLIC_HOMEPAGE}/collections/category/${encodeURIComponent(category)}`,
        updatedAt: row['Created At']
      })
    }

    collectionUrls.push({
      url: `${PUBLIC_HOMEPAGE}/collections/${row.Slug}`,
      updatedAt: row['Updated At']
    })
  })

  return [
    getUrls(
      [
        {
          url: `${PUBLIC_HOMEPAGE}/collections`,
          updatedAt: collections[0]['Updated At']
        }
      ],
      0.8
    ),
    getUrls(categoryUrls, 0.7),
    getUrls(collectionUrls.reverse(), 0.6)
  ].join('\n')
}

async function getTemplates() {
  const templates = await TemplateService.records()
  const tmpCategories = new Set<string>()

  const categoryUrls: AnyMap<string>[] = []
  const templateUrls: AnyMap<string>[] = []

  templates.reverse().forEach(row => {
    const category = row.LowerCaseCategory

    if (!tmpCategories.has(category)) {
      tmpCategories.add(category)

      categoryUrls.push({
        url: `${PUBLIC_HOMEPAGE}/templates/category/${encodeURIComponent(category)}`,
        updatedAt: row['Created At']
      })
    }

    templateUrls.push({
      url: `${PUBLIC_HOMEPAGE}/templates/${row.slug}`,
      updatedAt: row['Updated At']
    })
  })

  return [
    getUrls(
      [
        {
          url: `${PUBLIC_HOMEPAGE}/templates`,
          updatedAt: templates[0]['Updated At']
        }
      ],
      0.8
    ),
    getUrls(categoryUrls, 0.7),
    getUrls(templateUrls.reverse(), 0.6)
  ].join('\n')
}

async function getIntegrations() {
  const integrations = await Integration2Service.records()

  const integrationUrls = integrations.map(row => ({
    url: `${PUBLIC_HOMEPAGE}/integrations/${row.slug}`,
    updatedAt: row['Updated At']
  }))

  return [
    getUrls(
      [
        {
          url: `${PUBLIC_HOMEPAGE}/integrations`,
          updatedAt: integrations[0]['Updated At']
        }
      ],
      0.8
    ),
    getUrls(integrationUrls.reverse(), 0.6)
  ].join('\n')
}

export async function getServerSideProps({ res }: NextPageContext): Promise<unknown> {
  const [collections, templates, integrations] = await Promise.all([
    getCollections(),
    getTemplates(),
    getIntegrations()
  ])

  const html = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  >
    <url>
      <loc>${PUBLIC_HOMEPAGE}</loc>
      <lastmod>2023-08-22T10:43:50.748Z</lastmod>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${PUBLIC_HOMEPAGE}/features</loc>
      <lastmod>2023-08-22T10:43:50.748Z</lastmod>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${PUBLIC_HOMEPAGE}/pricing</loc>
      <lastmod>2023-08-22T10:43:50.748Z</lastmod>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${PUBLIC_HOMEPAGE}/blog</loc>
      <lastmod>2023-08-22T10:43:50.748Z</lastmod>
      <priority>0.8</priority>
    </url>
    ${templates}
    ${integrations}
    ${collections}
  </urlset>`

  res!.setHeader('Content-Type', 'text/xml')
  res!.write(html)
  res!.end()

  return {
    props: {}
  }
}

export default Sitemap

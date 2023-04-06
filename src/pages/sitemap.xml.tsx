import { NextPageContext } from 'next'
import { AirtableService } from '~/service/airtable'

const NEXT_AIRTABLE_BASE_ID = process.env.NEXT_AIRTABLE_BASE_ID as string
const NEXT_AIRTABLE_COLLECTION_ID = process.env.NEXT_AIRTABLE_COLLECTION_ID as string

const Sitemap = () => {
  //
}

export async function getServerSideProps({ res }: NextPageContext): Promise<unknown> {
  const homepage = process.env.NEXT_PUBLIC_HOMEPAGE
  const [subdomains, records] = await Promise.all([
    (await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/sitemap-subdomains?key=${process.env.NEXT_API_VERIFICATION_KEY}`
    )).json(),
    AirtableService.records<CollectionRecord>(
      NEXT_AIRTABLE_BASE_ID,
      NEXT_AIRTABLE_COLLECTION_ID
    )
  ])
  const categories = Array.from(new Set(records.map(r => r.Category)))

  const subdomainsHTML = subdomains
    .map(
      (row: any) =>
        `<url>
        <loc>${row.url}</loc>
        <lastmod>${row.updatedAt}</lastmod>
        <priority>0.6</priority>
      </url>`
    )
    .join('\n')

  const categoriesHTML = categories
    .map(
      (row: any) =>
        `<url>
        <loc>${homepage}/collections/category/${row.toLowerCase()}</loc>
        <lastmod>2023-04-05T10:43:50.748Z</lastmod>
        <priority>0.7</priority>
      </url>`
    )
    .join('\n')

  const html = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  >
    <url>
      <loc>${homepage}</loc>
      <lastmod>2022-12-23T10:43:50.748Z</lastmod>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${homepage}/features</loc>
      <lastmod>2022-12-23T10:43:50.748Z</lastmod>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${homepage}/pricing</loc>
      <lastmod>2022-12-23T10:43:50.748Z</lastmod>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${homepage}/collections</loc>
      <lastmod>2023-04-05T10:43:50.748Z</lastmod>
      <priority>0.8</priority>
    </url>
    ${categoriesHTML}
    <url>
      <loc>${homepage}/blog</loc>
      <lastmod>2022-12-23T10:43:50.748Z</lastmod>
      <priority>0.8</priority>
    </url>
    ${subdomainsHTML}
  </urlset>`

  res!.setHeader('Content-Type', 'text/xml')
  res!.write(html)
  res!.end()

  return {
    props: {}
  }
}

export default Sitemap

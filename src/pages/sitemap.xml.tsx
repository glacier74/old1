import { NextPageContext } from 'next'

const Sitemap = () => {
  //
}

export async function getServerSideProps({ res }: NextPageContext): Promise<unknown> {
  const homepage = process.env.NEXT_PUBLIC_HOMEPAGE
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URI}/sitemap-subdomains?key=${process.env.NEXT_API_VERIFICATION_KEY}`
  )
  const result = await request.json()

  let html = result
    .map(
      (row: any) =>
        `<url>
        <loc>${row.url}</loc>
        <lastmod>${row.updatedAt}</lastmod>
        <priority>0.6</priority>
      </url>`
    )
    .join('\n')

  html = `<?xml version="1.0" encoding="UTF-8"?>
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
      <loc>${homepage}/blog</loc>
      <lastmod>2022-12-23T10:43:50.748Z</lastmod>
      <priority>0.8</priority>
    </url>
    ${html}
  </urlset>`

  res!.setHeader('Content-Type', 'text/xml')
  res!.write(html)
  res!.end()

  return {
    props: {}
  }
}

export default Sitemap

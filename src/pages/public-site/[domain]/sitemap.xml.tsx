import { PublicApiService } from '~/service/public-api'

const Sitemap = () => {
  //
}

export async function getServerSideProps({ res, params }: any): Promise<unknown> {
  const domain = params.domain
  let product: Product

  try {
    product = await PublicApiService.product(domain)
  } catch (err: any) {
    console.error(err)

    return {
      notFound: true
    }
  }

  const html = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  >
    <url>
      <loc>${product.canonicalURL}</loc>
      <lastmod>${product.updatedAt}</lastmod>
      <priority>1</priority>
    </url>
  </urlset>`

  res!.setHeader('Content-Type', 'text/xml')
  res!.write(html)
  res!.end()

  return {
    props: {}
  }
}

export default Sitemap

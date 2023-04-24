import { NextPageContext } from 'next'

const Robots = () => {
  //
}

export async function getServerSideProps({ res }: NextPageContext): Promise<unknown> {
  const text = `# robots.txt for https://earlybird.im

User-agent: *
Disallow: /api/*
Disallow: /login*
Disallow: /sign-up
Disallow: /logout
Disallow: /forgot-password
Disallow: /reset-password
Disallow: /product/*

Sitemap: https://earlybird.im/sitemap.xml
`

  res!.setHeader('Content-Type', 'text/plain')
  res!.write(text)
  res!.end()

  return {
    props: {}
  }
}

export default Robots

// @ts-check
const dotenv = require('dotenv')
const { resolve } = require('path')
const pkg = require('./package.json')
const { i18n } = require('./next-i18next.config.js')
const env = process.env.NODE_ENV || 'development'

dotenv.config({
  path: resolve(process.cwd(), `.env.${env}`)
})

/** @type {import('next').NextConfig} */
module.exports = {
  i18n,
  experimental: {
    fontLoaders: [
      {
        loader: '@next/font/google',
        options: {
          subsets: ['latin'],
          weights: [400, 500, 600, 700, 800, 900]
        }
      }
    ]
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  // https://nextjs.org/docs/advanced-features/security-headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          }
        ]
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/login/google',
        destination: `${process.env.NEXT_PUBLIC_API_URI}/login/google`,
        permanent: false
      },
      {
        source: '/login/google/callback',
        destination: `${process.env.NEXT_PUBLIC_API_URI}/login/google/callback`,
        permanent: false
      },
      {
        source: '/login/twitter',
        destination: `${process.env.NEXT_PUBLIC_API_URI}/login/twitter`,
        permanent: false
      },
      {
        source: '/login/twitter/callback',
        destination: `${process.env.NEXT_PUBLIC_API_URI}/login/twitter/callback`,
        permanent: false
      },
      {
        source: '/login/github',
        destination: `${process.env.NEXT_PUBLIC_API_URI}/login/github`,
        permanent: false
      },
      {
        source: '/login/github/callback',
        destination: `${process.env.NEXT_PUBLIC_API_URI}/login/github/callback`,
        permanent: false
      }
    ]
  },
  webpack: config => {
    config.resolve.fallback = {
      fs: false
    }
    return config
  }
}

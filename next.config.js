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
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
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
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
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

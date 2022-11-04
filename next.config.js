// @ts-check
const { i18n } = require('./next-i18next.config.js')

/** @type {import('next').NextConfig} */
module.exports = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
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
  async redirects() {
    return [
      {
        source: '/login/google',
        destination: 'http://127.0.0.1:8000/login/google',
        permanent: false
      },
      {
        source: '/login/google/callback',
        destination: 'http://127.0.0.1:8000/login/google/callback',
        permanent: false
      },
      {
        source: '/login/twitter',
        destination: 'http://127.0.0.1:8000/login/twitter',
        permanent: false
      },
      {
        source: '/login/twitter/callback',
        destination: 'http://127.0.0.1:8000/login/twitter/callback',
        permanent: false
      },
      {
        source: '/login/github',
        destination: 'http://127.0.0.1:8000/login/github',
        permanent: false
      },
      {
        source: '/login/github/callback',
        destination: 'http://127.0.0.1:8000/login/github/callback',
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

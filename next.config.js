// @ts-check
const { i18n } = require('./next-i18next.config.js')

/** @type {import('next').NextConfig} */
module.exports = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  webpack: config => {
    config.resolve.fallback = {
      fs: false
    }
    return config
  }
}

// @ts-check

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-cn'],
    localeDetection: false
  },
  fallbackLng: {
    default: ['en']
  }
}

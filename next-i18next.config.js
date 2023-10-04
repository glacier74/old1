// @ts-check

/**
 * @type {import("next-i18next").UserConfig}
 */
module.exports = {
  debug: process.env.NODE_ENV === "development",
  reloadOnPrerender: process.env.NODE_ENV === "development",
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-cn'],
    localeDetection: false
  },
  fallbackLng: {
    default: ['en']
  },
  lowerCaseLng: true
}

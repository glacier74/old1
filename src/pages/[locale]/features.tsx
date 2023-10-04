import { i18n } from '~i18next-config'

export { default, getStaticProps } from '~/pages/features'

export const getStaticPaths = async () => {
  return {
    paths: i18n.locales
      .filter(locale => locale !== i18n.defaultLocale)
      .map(locale => ({
        params: { locale }
      })),
    fallback: true
  }
}

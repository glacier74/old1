import type { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export function withTranslations(nextPageFunction: NextPageFunction, namespaces = ['common']) {
  return async (context: NextPageContext) => {
    const pageData = await nextPageFunction(context)

    if (pageData.notFound) {
      return pageData
    }

    const locale = context.locale || context.defaultLocale!

    return {
      props: {
        locale,
        ...(await serverSideTranslations(locale, namespaces)),
        ...pageData.props
      }
    }
  }
}

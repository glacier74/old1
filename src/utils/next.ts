import type { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export function withTranslations(nextPageFunction: NextPageFunction, namespaces?: string[]) {
  return async (context: NextPageContext) => {
    const pageData = await nextPageFunction(context)

    if (pageData.notFound) {
      return pageData
    }

    return {
      props: {
        ...(await serverSideTranslations(context.locale || context.defaultLocale!, namespaces)),
        ...pageData.props
      }
    }
  }
}

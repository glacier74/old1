import type { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export function withTranslations(nextPageFunction: NextPageFunction, namespaces?: string[]) {
  return async (context: NextPageContext) => {
    const pageData = await nextPageFunction(context)
    console.log('context.locale', context.locale)

    return {
      props: {
        ...(await serverSideTranslations(context.locale || context.defaultLocale!, namespaces)),
        ...pageData.props
      }
    }
  }
}

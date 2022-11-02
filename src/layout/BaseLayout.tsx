import { useTranslation } from 'next-i18next'
import { NextSeo, NextSeoProps } from 'next-seo'

export function BaseLayout({ seo, children }: LayoutProps): JSX.Element {
  const { t } = useTranslation()

  const seoProps: NextSeoProps = {
    title: t('common.name'),
    description: t('common.description'),
    ...seo
  }

  return (
    <>
      {/* SEO */}
      <NextSeo {...seoProps} />

      {/* HTML */}
      {children}
    </>
  )
}

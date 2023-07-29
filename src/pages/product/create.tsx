import { useTranslation } from 'next-i18next'

import { HelpFloatButton } from '~/components'
import { CreateProductLayout, Steps } from '~/layout'
import { withTranslations } from '~/utils'

const CreateProduct = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <CreateProductLayout
      className="items-center !max-w-full"
      seo={{ title: t('createProduct.title') }}
    >
      <Steps />
      <HelpFloatButton />
    </CreateProductLayout>
  )
}

export const getStaticProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default CreateProduct

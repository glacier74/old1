import { useTranslation } from 'next-i18next'

import { HelpFloatButton } from '~/components'
import { CreateProductLayout, Steps } from '~/layout'
import { useStore } from '~/store'
import { withTranslations } from '~/utils'

const CreateProduct = (): JSX.Element => {
  const { t } = useTranslation(['dashboard'])
  const { user } = useStore()

  return (
    <CreateProductLayout
      className="items-center !max-w-full"
      seo={{ title: t('createProduct.title') }}
    >
      {user.id && <Steps />}
      <HelpFloatButton />
    </CreateProductLayout>
  )
}

export const getServerSideProps = withTranslations(
  async context => {
    return {
      props: {}
    }
  },
  ['common', 'dashboard']
)

export default CreateProduct

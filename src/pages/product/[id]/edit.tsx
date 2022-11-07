import { EditProduct } from '@/layout'
import { withTranslations } from '@/utils'

const ProductEdit = (): JSX.Element => {
  return <EditProduct />
}

export const getServerSideProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default ProductEdit

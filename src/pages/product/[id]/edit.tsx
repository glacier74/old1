import { Editor } from '~/layout'
import { withTranslations } from '~/utils'

const ProductEdit = (): JSX.Element => {
  return <Editor />
}

export const getServerSideProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default ProductEdit

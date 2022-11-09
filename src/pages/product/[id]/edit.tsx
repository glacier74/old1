import { Editor } from '~/layout'
import { withTranslations } from '~/utils'

const ProductEdit = (): JSX.Element => {
  return <Editor />
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default ProductEdit

import { Builder } from '~/layout'
import { withTranslations } from '~/utils'

const ProductEdit = (): JSX.Element => {
  return <Builder />
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

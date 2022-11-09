import { withTranslations } from '~/utils'

const Invite = () => {
  return <div>Invite Page</div>
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

export default Invite

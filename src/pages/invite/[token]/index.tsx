import { isLoggedIn, withTranslations } from '~/utils'

const Invite = () => {
  return <div>Invite Page</div>
}

export const getServerSideProps = withTranslations(async context => {
  return {
    props: {
      isLoggedIn: isLoggedIn(context.req.cookies)
    }
  }
})

export default Invite

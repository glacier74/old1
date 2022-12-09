import { Button, notification } from '@heyforms/ui'
import { IconChevronLeft } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { RoundImage } from '~/components'
import { CreateProductLayout } from '~/layout'
import { ProductService } from '~/service'
import { useAsyncEffect, useParam, useRequest, withTranslations } from '~/utils'

const Skeleton = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-slate-200 rounded-full"></div>
      </div>
      <div className="w-full h-20 rounded-sm skeleton"></div>
      <div className="w-full h-12 rounded-sm skeleton"></div>
      <div className="w-full h-10 rounded-sm bg-slate-200"></div>
    </div>
  )
}

const Invite = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const inviteCode = useParam('inviteCode') as string
  const [invitation, setInvitation] = useState<Invitation | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)

  const { loading, error, request } = useRequest(async () => {
    await ProductService.join(invitation!.productId!, inviteCode)
    router.push(`/product/${invitation!.productId!}`)
  }, [invitation?.productId, inviteCode])

  function handleGoBack() {
    router.push('/')
  }

  useAsyncEffect(async () => {
    try {
      setInvitation(await ProductService.invitation(inviteCode))
    } catch (err: any) {
      setServerError(err.message)
    }
  }, [])

  useEffect(() => {
    if (error) {
      notification.error({
        title: t(error.message)
      })
    }
  }, [error])

  return (
    <CreateProductLayout seo={{ title: t('invite.title') }}>
      <Link
        className="group fixed top-5 left-5 flex items-center text-sm hover:text-green-500"
        href="/"
      >
        <IconChevronLeft className="w-4 h-4 text-slate-500 -ml-2 group-hover:text-green-500" />
        <span className="ml-1">{t('invite.backHome')}</span>
      </Link>

      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {invitation ? (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <RoundImage src={invitation.productLogo} imageSize={120} size={64} />
            </div>
            <div className="mt-2 px-4 text-base font-medium text-slate-800">
              <p>{t('invite.heading', { inviter: invitation.inviter })}</p>
              <p>{invitation.productName}</p>
            </div>
            <div className="px-4 text-sm text-slate-500">{t('invite.description')}</div>
            <Button type="success" loading={loading} block onClick={request}>
              {t('invite.join')}
            </Button>
          </div>
        ) : serverError ? (
          <div className="space-y-6 text-center">
            <div className="px-4 text-base font-medium text-slate-800">{t(serverError)}</div>
            <div className="px-4 text-sm text-slate-500">{t('invite.errorTip')}</div>
            <Button type="success" block onClick={handleGoBack}>
              {t('invite.goBack')}
            </Button>
          </div>
        ) : (
          <Skeleton />
        )}
      </div>
    </CreateProductLayout>
  )
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

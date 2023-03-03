import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FC, SVGProps } from 'react'

import { IconGithub, IconGoogle, IconTwitter } from '~/components'

interface SocialLoginItemProps {
  label: string
  icon: FC<SVGProps<SVGSVGElement>>
  provider: string
}

const SocialLoginItem: FC<SocialLoginItemProps> = ({ label, icon: Icon, provider }) => {
  const router = useRouter()

  function handleClick() {
    router.push(`/login/${provider}`)
  }

  return (
    <div>
      <div
        className="w-full inline-flex justify-center py-2 px-4 border border-slate-200 rounded shadow-sm bg-white text-sm font-medium text-slate-700 cursor-pointer hover:bg-slate-50"
        onClick={handleClick}
      >
        <Icon className="w-5 h-5" />
        <span className="ml-2">{label}</span>
      </div>
    </div>
  )
}

export const SocialLogin = () => {
  const { t } = useTranslation()

  return (
    <div className="mt-1 grid grid-cols-3 gap-2">
      <SocialLoginItem provider="google" icon={IconGoogle} label={t('login.loginWithGoogle')} />
      <SocialLoginItem provider="twitter" icon={IconTwitter} label={t('login.loginWithTwitter')} />
      <SocialLoginItem provider="github" icon={IconGithub} label={t('login.loginWithGithub')} />
    </div>
  )
}

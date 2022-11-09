import { IconBrandGithub, IconBrandGoogle, IconBrandTwitter, TablerIconProps } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FC } from 'react'

interface SocialLoginItemProps {
  label: string
  icon: FC<TablerIconProps>
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
        className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-500 cursor-pointer hover:bg-slate-50"
        onClick={handleClick}
      >
        <span className="sr-only">{label}</span>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  )
}

export const SocialLogin = () => {
  const { t } = useTranslation()

  return (
    <div className="mt-1 grid grid-cols-3 gap-2">
      <SocialLoginItem
        provider="google"
        icon={IconBrandGoogle}
        label={t('login.loginWithGoogle')}
      />
      <SocialLoginItem
        provider="twitter"
        icon={IconBrandTwitter}
        label={t('login.loginWithTwitter')}
      />
      <SocialLoginItem
        provider="github"
        icon={IconBrandGithub}
        label={t('login.loginWithGithub')}
      />
    </div>
  )
}

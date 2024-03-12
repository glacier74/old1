import { Button } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { FC, SVGProps, useEffect, useState } from 'react'

import { IconApple, IconGithub, IconGoogle } from '~/components'

interface SocialLoginItemProps {
  label: string
  icon: FC<SVGProps<SVGSVGElement>>
  provider: string
}

const API_URI = process.env.NEXT_PUBLIC_API_URI

const SocialLoginItem: FC<SocialLoginItemProps> = ({ label, icon: Icon, provider }) => {
  const [loading, setLoading] = useState(false)

  function handleClick() {
    setLoading(true)
    window.location.href = `${API_URI}/login/${provider}`
  }

  useEffect(() => {
    return () => {
      setLoading(false)
    }
  }, [])

  return (
    <Button
      className="w-full !py-2.5 md:!py-2 border border-slate-200 text-sm font-medium text-slate-700 !bg-white hover:bg-slate-50"
      loaderClassName="bg-white text-slate-700"
      leading={<Icon className="w-5 h-5" />}
      loading={loading}
      onClick={handleClick}
    >
      {label}
    </Button>
  )
}

export const SocialLogin = () => {
  const { t } = useTranslation('dashboard')

  return (
    <div className="mt-1 grid grid-cols-3 gap-2">
      <SocialLoginItem provider="apple" icon={IconApple} label={t('login.loginWithApple')} />
      <SocialLoginItem provider="google" icon={IconGoogle} label={t('login.loginWithGoogle')} />
      <SocialLoginItem provider="github" icon={IconGithub} label={t('login.loginWithGithub')} />
    </div>
  )
}

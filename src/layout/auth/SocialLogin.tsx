import { useTranslation } from 'next-i18next'
import { IconBrandGithub, IconBrandGoogle, IconBrandTwitter } from '@tabler/icons'

export const SocialLogin = () => {
  const { t } = useTranslation()

  function handleRedirect(type: string) {
    console.log(type)
  }

  function handleGoogle() {
    handleRedirect('google')
  }

  function handleTwitter() {
    handleRedirect('twitter')
  }

  function handleGithub() {
    handleRedirect('github')
  }

  return (
    <div className="mt-1 grid grid-cols-3 gap-2">
      <div>
        <div
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-500 cursor-pointer hover:bg-slate-50"
          onClick={handleGoogle}
        >
          <span className="sr-only">{t('login.loginWithGoogle')}</span>
          <IconBrandGoogle className="w-5 h-5" />
        </div>
      </div>

      <div>
        <div
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-500 cursor-pointer hover:bg-slate-50"
          onClick={handleTwitter}
        >
          <span className="sr-only">{t('login.loginWithTwitter')}</span>
          <IconBrandTwitter className="w-5 h-5" />
        </div>
      </div>

      <div>
        <div
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-500 cursor-pointer hover:bg-slate-50"
          onClick={handleGithub}
        >
          <span className="sr-only">{t('login.loginWithGithub')}</span>
          <IconBrandGithub className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}

import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'

import { BaseLayout } from '~/layout'
import IconLogo from '~public/static/header-logo.png'

export function LoginLayout({ seo, children }: LayoutProps) {
  const { t } = useTranslation()

  return (
    <BaseLayout seo={seo}>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <div className="p-5 sm:px-6 lg:px-8">
          <Link href="/" title="EarlyBird" className="h-[1.75rem] md:h-[2rem] hover:opacity-80">
            <Image src={IconLogo} alt="EarlyBird Logo" width={110} height={36} quality={100} />
          </Link>
        </div>
        <div className="flex-1 flex flex-col justify-center sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">{children}</div>
        </div>
      </div>
    </BaseLayout>
  )
}

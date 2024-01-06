import Image from 'next/image'
import Link from 'next/link'

import { JINGLEBIO_REF } from '~/constants'
import { BaseLayout } from '~/layout'
import JingleBioLogo from '~public/static/header-jinglebio-logo.png'
import IconLogo from '~public/static/header-logo.png'

export function LoginLayout({ seo, referer, children }: LayoutProps) {
  return (
    <BaseLayout seo={seo} referer={referer}>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <div className="p-5 sm:px-6 lg:px-8">
          <Link href="/" title="EarlyBird" className="h-[60px] hover:opacity-80">
            <Image
              src={referer === JINGLEBIO_REF ? JingleBioLogo : IconLogo}
              alt="EarlyBird Logo"
              width={160}
              height={50}
              quality={100}
            />
          </Link>
        </div>
        <div className="flex-1 flex flex-col justify-center sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">{children}</div>
        </div>
      </div>
    </BaseLayout>
  )
}

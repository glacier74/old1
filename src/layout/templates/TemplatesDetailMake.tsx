import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

export const TemplatesDetailMake: FC = () => {
  const { t } = useTranslation()
  return (
    <section className="max-w-6xl mx-auto md:px-12 px-6 lg:py-20 py-12 z-10">
      <div className="flex sm:flex-row flex-col justify-between items-center max-w-5xl mx-auto md:gap-5 gap-7">
        <div className="sm:max-w-sm max-w-[500px] flex flex-col justify-center items-start xl:gap-7 gap-5">
          <div className="lg:text-3xl text-2xl font-bold">Make it uniquely yours</div>
          <div className="lg:text-lg text-base">
            <p>
              Customize to your heart's content: backgrounds, Google fonts, colors, buttons, and
              more.
            </p>
            <p>Choose from thousands of beautiful images, videos, and icons. Or use your own.</p>
            <p>Create beautiful forms with zero coding required.</p>
          </div>
          <a className="bg-slate-900 py-2 px-8 rounded-full flex-inline" href="/sign-up">
            <span className="text-white lg:text-lg text-base">Get started, it's free!</span>
          </a>
        </div>
        <Image src="/static/temp2.jpg" width={500} height={400} alt="" />
      </div>
    </section>
  )
}

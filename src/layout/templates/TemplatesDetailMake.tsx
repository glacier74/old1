import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

export const TemplatesDetailMake: FC = () => {
  const { t } = useTranslation()
  return (
    <section className="max-w-6xl mx-auto md:px-12 px-6 lg:py-20 py-12 z-10">
      <div className="flex sm:flex-row flex-col justify-between items-center max-w-5xl mx-auto md:gap-5 gap-7">
        <div className="sm:max-w-sm max-w-[500px] flex flex-col justify-center items-start xl:gap-6 gap-4">
          <div className="lg:text-3xl text-2xl font-bold">Make it uniquely yours</div>
          <div className="lg:text-xl text-base">
            <p>
              Customize our templates to capture the essence of your startup. With EarlyBird,
              establish a distinctive online presence without any coding skills needed.
            </p>
          </div>
          <a className="bg-slate-900 py-2 px-8 rounded-full flex-inline" href="/sign-up">
            <span className="text-white lg:text-lg text-base">Get started, it's free!</span>
          </a>
        </div>
        <Image
          src="/static/template-make.png"
          width={400}
          height={400}
          alt="Make it uniquely yours"
          className="rounded-full shadow-md"
        />
      </div>
    </section>
  )
}

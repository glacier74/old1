import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const MicroSaasIdeasSubscribe: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="sm:px-10 px-6 xl:py-20 lg:py-16 py-12 z-10">
      <div className="flex flex-col items-center text-center">
        <div className="text-lg font-semibold">Subscribe to our blog for new Micro SaaS ideas</div>
        <div className="flex mt-6">
          <input type="text" className="h-8 sm:w-52 w-44 text-sm" placeholder="jamie@example.com" />
          <div className="flex justify-center items-center h-8 w-24 bg-[#A4ADB3] text-white text-sm rounded">
            Subscribe
          </div>
        </div>
      </div>
    </section>
  )
}

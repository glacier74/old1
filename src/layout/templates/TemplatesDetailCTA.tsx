import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const TemplatesDetailCTA: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-yellow-100/30 md:px-12 px-6 md:py-32 py-20 z-10">
      <div className="max-w-3xl mx-auto text-center">
        <div className="md:text-4xl text-2xl font-medium">Your sales process just got sweeter</div>
        <div className="md:mt-8 mt-4 md:text-xl text-lg text-slate-700">
          Make it easy for customers to place candy orders online with a simple form that's fun to
          fill out. Customize the template with your store's branding, embed it into your website,
          and watch the orders flow.
        </div>
      </div>
    </section>
  )
}

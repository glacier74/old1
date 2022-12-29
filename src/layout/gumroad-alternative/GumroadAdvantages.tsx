import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const GumroadAdvantages: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-white py-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold">Advanced features</h2>
        <div className="text-xl mt-4 leading-relaxed">
          EarlyBird is packed with features that make it easy for you to sell your products online,
          including:
        </div>
      </div>
    </section>
  )
}

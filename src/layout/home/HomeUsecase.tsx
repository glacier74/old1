import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const HomeUsecase: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="relative grid md:grid-cols-2">
      <div className="bg-emerald-400/20 py-48">
        <div className="px-8 md:pr-32">
          <div className="flex justify-end">
            <div>
              <h3 className="text-4xl font-bold mb-8">EarlyBird is for</h3>
              <ul className="list-disc text-2xl leading-relaxed pl-4 leading-loose">
                <li>Users without development and design skills</li>
                <li>Running a simple online business</li>
                <li>Finding the best product-market fit</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-yellow-300/10 py-48">
        <div className="px-8 md:pl-32">
          <h3 className="text-4xl font-bold mb-8">EarlyBird is NOT for</h3>
          <ul className="list-disc text-2xl leading-relaxed pl-4 leading-loose">
            <li>Building a complex web app</li>
            <li>Launching a website with bespoke design</li>
            <li>Running an offensive or illegal business</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

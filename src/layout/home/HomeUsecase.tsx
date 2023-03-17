import { useTranslation } from 'next-i18next'
import { FC } from 'react'


export const HomeUsecase: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="relative grid md:grid-cols-2">
      <div className='bg-lime-50 py-24'>
        <div className='px-8 md:pr-32'>
          <div className='flex justify-end'>
            <div>
              <h3 className="text-3xl font-medium mb-4">EarlyBird is for</h3>
              <ul className="list-disc text-xl leading-relaxed pl-4 text-slate-700">
                <li>Users without development and design skills</li>
                <li>Running a simple online business</li>
                <li>Finding the best product-market fit</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-pink-50 py-24'>
        <div className='px-8 md:pl-32'>
          <h3 className="text-3xl font-medium mb-4">
            EarlyBird is <span className="font-extrabold">NOT</span> for
          </h3>
          <ul className="list-disc text-xl leading-relaxed pl-4 text-slate-700">
            <li>Building a complex web app</li>
            <li>Launching a website with bespoke design</li>
            <li>Running an offensive or illegal business</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

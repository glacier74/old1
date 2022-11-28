import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

import FooterImage from '~public/static/footer.png'

export const HomeBottom: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="relative pb-64 md:pb-0">
      <div className="max-w-7xl mx-auto px-5">
        <div className="py-32 md:py-48 text-slate-50">
          <h2 className="w-full md:w-4/5 mx-auto text-4xl md:text-7xl text-center font-bold">
            The place for early stage entrepreneurs to bootstrap
          </h2>
          <div className="w-full md:w-9/12 mx-auto mt-8 text-lg md:text-2xl text-center leading-snug text-slate-400">
            Whether you're launching a new product, building a new newsletter, or just creating a
            personal profile, EarlyBird is your home. Get started today, it's free!
          </div>
          <div className="flex justify-center mt-10">
            <a
              href="/sign-up"
              className="text-base md:text-xl font-medium px-6 py-2 md:px-8 md:py-3 border border-slate-100 rounded-md"
            >
              Sign up as an early bird
            </a>
          </div>
        </div>
      </div>

      <Image
        src={FooterImage}
        alt={t('common.name')}
        className="absolute bottom-0 left-0 pointer-events-none"
        width="400"
        height="350"
        quality={100}
      />
    </section>
  )
}

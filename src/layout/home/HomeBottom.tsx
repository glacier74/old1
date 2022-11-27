import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

import FooterImage from '~public/static/footer.png'

export const HomeBottom: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto">
        <div className="pt-32 pb-48 text-white">
          <h2 className="w-4/5 mx-auto text-7xl text-center font-bold">
            The place for early stage entrepreneurs to bootstrap
          </h2>
          <div className="w-8/12 mx-auto mt-8 text-lg text-center">
            Whether you're launching a new product, building a new newsletter, or just creating a
            personal profile, EarlyBird is your home. Get started today, it's free!
          </div>
          <div className="flex justify-center mt-10">
            <a
              href="/sign-up"
              className="text-xl font-bold px-8 py-3 border border-white rounded-lg"
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

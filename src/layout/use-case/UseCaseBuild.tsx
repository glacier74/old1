import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const UseCaseBuild: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-[#FEFFF1]">
      {/* lg:mt-20 mt-12 */}
      <div className="relative max-w-4xl mx-auto px-6 sm:py-20 py-10 z-10">
        <div className="flex flex-col justify-center items-center text-center lg:gap-5 gap-3">
          <div className="sm:text-3xl text-2xl font-semibold">
            Ready to build your powerful waitlist landing page?
          </div>
          <div className="sm:text-base text-sm font-medium w-full">
            Join thousands of entrepreneurs who have kickstarted their journey with us. With
            EarlyBird, you're not just building a waitlist, you're building a community for your
            product.
          </div>
          <div className="flex justify-center items-center sm:h-10 h-8 sm:w-56 w-48 bg-[#060716] rounded cursor-pointer">
            <span className="text-white sm:text-sm text-xs">Start Building with EarlyBird</span>
          </div>
        </div>
      </div>
    </section>
  )
}

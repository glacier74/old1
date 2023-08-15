import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const UseCaseReason: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="max-w-5xl mx-auto md:px-12 px-6 z-10">
      <div className="sm:text-3xl text-2xl font-semibold">Why should you build a waitlist?</div>
      <div className="lg:mt-8 mt-3 sm:text-lg text-base font-normal">
        Two words: anticipation and validation. Building a waitlist serves dual purposes for both
        the entrepreneur and the potential customer. 1) For entrepreneurs, it's a method of
        validating the demand for a product or service before fully launching. 2) For potential
        customers, signing up for a waitlist signals their interest and commitment to the product or
        service.
        <br />
        <br />
        With EarlyBird, creating a waitlist is a breeze and offers numerous benefits. As an
        entrepreneur, you'll be able to validate your product idea and gather a pool of eager
        customers even before you launch. This can help shape your product development and marketing
        strategy.
        <br />
        <br />
        For potential customers, being on the waitlist means they're in the loop about your
        product's development and launch. It gives them the privilege of being the first to know,
        the first to try, and the first to buy. In essence, a waitlist fuels anticipation, validates
        demand, and kickstarts your customer base.
      </div>
    </section>
  )
}

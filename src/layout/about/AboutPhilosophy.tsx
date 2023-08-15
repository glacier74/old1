import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const AboutPhilosophy: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="xl:py-24 md:py-16 py-12 md:px-12 px-6 z-10">
      <div className="max-w-3xl mx-auto">
        <h3 className="sm:text-3xl text-2xl font-bold text-center mb-8">Our philosophy</h3>
        <div className="text-slate-900 text-lg leading-relaxed">
          <p className="mb-4">
            <strong>We’re transparent.</strong>&nbsp;We maintain a public roadmap. We openly discuss
            feature ideas and future plans with our customers. And we believe in simple and
            transparent pricing.
          </p>
          <p className="mb-4">
            <strong>We’re human.</strong>&nbsp;We give free trials of paid plans upon request. We
            offer refunds if you accidentally forget to cancel at the beginning of a new billing
            period. We respect your privacy and care about the security of your data. And we make
            mistakes, but when we do, we own up to them and do what we can to make amends.
          </p>
          <p className="mb-4">
            <strong>We’re focused on product.</strong>&nbsp;We invest our time and energy into
            product development rather than marketing or sales. We prefer letting our features and
            overall UX do the selling over hiring a sales team. And when we do work on other things
            not entirely product related, we hold ourselves to the same standard of quality.
          </p>
        </div>
      </div>
    </section>
  )
}

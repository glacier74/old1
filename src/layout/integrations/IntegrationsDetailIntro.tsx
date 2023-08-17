import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const IntegrationsDetailIntro: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="max-w-2xl mx-auto py-16">
      <div className="relative px-6 sm:py-20 py-10 z-10">
        <h3 className="sm:text-4xl text-2xl font-bold mb-4">What is Slack?</h3>
        <p className="text-lg text-slate-700 mb-8">Slack is a channel based messaging app for business that connects people to the information they need. By bringing people together to work as one unified team, it transforms the way organizations communicate. No matter which branch of the org chart you call home, you can keep your team’s communication organized and efficient in Slack.</p>
        <a href="/sign-up" className="bg-slate-900 text-slate-50 font-medium px-8 py-3 text-lg rounded-full">Get started for free</a>
        <p className="text-slate-500 text-sm mt-4">No credit card required</p>
      </div>
    </section>
  )
}

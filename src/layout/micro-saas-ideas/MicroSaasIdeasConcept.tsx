import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

export const MicroSaasIdeasConcept: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="sm:px-10 px-6 xl:py-20 lg:py-16 py-12 z-10">
      <div className="grid lg:grid-cols-2 grid-cols-1 max-w-7xl mx-auto xl:gap-24 sm:gap-12 gap-5">
        <div className="flex flex-col lg:gap-5 gap-3">
          <h3 className="sm:text-3xl text-2xl font-bold">What is micro SaaS?</h3>
          <div className="sm:text-lg text-base text-slate-700">
            Micro SaaS, short for Micro Software as a Service, is a type of software business that
            focuses on fulfilling a specific need or niche in the market with a lean team. Unlike
            larger SaaS businesses, a Micro SaaS is often run by an individual or a small team and
            does not require a large amount of capital to get started.
            <br />
            <br />
            These businesses are built around providing a single software solution that serves a
            specific customer base or industry. The narrow focus of Micro SaaS allows them to
            provide a higher quality solution to a specific problem, creating a strong, loyal
            customer base in the process.
            <br />
            <br />
            Whether it's an app to schedule social media posts, a tool for online course creators,
            or a software to manage remote teams, the possibilities for Micro SaaS are virtually
            limitless. They're an excellent opportunity for entrepreneurs looking to create a
            sustainable, profitable business with a minimal team and lower overhead costs.
          </div>
        </div>
        <div className="flex lg:justify-end justify-center">
          <Image src="/static/micro-saas.png" alt={''} width={467} height={380} quality={100} />
        </div>
      </div>
    </section>
  )
}

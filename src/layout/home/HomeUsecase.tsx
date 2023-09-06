import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const HomeUsecase: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="relative grid md:grid-cols-2">
      <div className="bg-emerald-400/20 sm:py-32 py-16">
        <div className="px-8 md:pr-32">
          <div className="flex justify-end">
            <div>
              <div className="mb-8">
                <svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="80" height="80"><mask id=":rko:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#:rko:)"><rect width="36" height="36" fill="#4eb3de"></rect><rect x="0" y="0" width="36" height="36" transform="translate(7 7) rotate(297 18 18) scale(1)" fill="#fcf09f" rx="6"></rect><g transform="translate(3.5 3.5) rotate(7 18 18)"><path d="M13,19 a1,0.75 0 0,0 10,0" fill="#000000"></path><rect x="12" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect><rect x="22" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect></g></g></svg>
              </div>
              <h2 className="sm:text-3xl text-2xl font-bold mb-4">EarlyBird is for</h2>
              <ul className="list-disc sm:text-xl text-lg pl-4 sm:space-y-2 space-y-1">
                <li>Individuals lacking design or development skills</li>
                <li>Entrepreneurs operating simple online businesses</li>
                <li>Startups seeking the perfect product-market fit</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-yellow-300/10 sm:py-32 py-16">
        <div className="px-8 md:pl-32">
        <div className="mb-8">
          <svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
            <mask id=":r12:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
                <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
            </mask>
            <g mask="url(#:r12:)">
                <rect width="36" height="36" fill="#ff7752"></rect>
                <rect x="0" y="0" width="36" height="36" transform="translate(-4 -4) rotate(188 18 18) scale(1.2)" fill="#ffb752" rx="36"></rect>
                <g transform="translate(-4 -2) rotate(-8 18 18)">
                    <path d="M15 21c2 -1 4 -1 6 0" stroke="#000000" fill="none" stroke-linecap="round"></path>
                    <rect x="11" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
                    <rect x="23" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
                </g>
            </g>
          </svg>
        </div>
          <h2 className="sm:text-3xl text-2xl font-bold mb-4">EarlyBird is NOT for</h2>
          <ul className="list-disc sm:text-xl text-lg pl-4 sm:space-y-2 space-y-1">
            <li>Developers aiming to build complex web applications</li>
            <li>Businesses requiring bespoke website designs</li>
            <li>Those requiring advanced customizations and integrations</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

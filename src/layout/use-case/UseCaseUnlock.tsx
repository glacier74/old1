import { FC } from 'react'

import { dataUnlock } from './dataUnlock'

export const UseCaseUnlock: FC = () => {
  return (
    <section className="md:px-12 px-6 z-10 text-center">
      <div className="max-w-3xl mx-auto flex flex-col justify-center lg:gap-5 gap-3">
        <div className="sm:text-3xl text-2xl font-bold">Unlock the Power of EarlyBird</div>
        <div className="sm:text-base text-sm sm:font-medium font-normal">
          From creating a stunning landing page to tracking real-time performance, EarlyBird equips
          you with an array of features designed for your success. Here's a peek into what you can
          expect.
        </div>
      </div>
      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-12 gap-8 text-left sm:mt-14 mt-5">
        {dataUnlock.map((unlock, index) => (
          <div key={index} className="flex flex-col gap-2">
            <unlock.icon />
            <div className="sm:text-lg text-base font-medium">{unlock.name}</div>
            <div className="text-xs">{unlock.desc}</div>
          </div>
        ))}
      </div>
      <div className="underline sm:mt-14 mt-5 text-sm cursor-pointer">Explore all features 👉</div>
    </section>
  )
}

import { FC } from 'react'
import Image from 'next/image'

import AboutImage from '~public/static/about.webp'

export const AboutEvolution: FC = () => {
  return (
    <section className="xl:py-24 md:py-16 py-12 md:px-12 px-6 z-10">
      <div className="max-w-2xl mx-auto">
        <Image 
          src={AboutImage}
          alt="The birth of the EarlyBird"
          className="mx-auto mb-8"
          quality={100}
          width={200}
        />
        <h2 className="text-4xl font-bold text-slate-950 mb-8 text-center">The birth of the little bird</h2>
        <div className="text-lg leading-normal text-slate-900 space-y-4">
          <p>
            EarlyBird was hatched in December 2022. After our previous 2 products,{' '}
            <a className="underline" href="https://heyform.net" target="_blank">
              HeyForm
            </a>{' '}
            and{' '}
            <a className="underline" href="https://tinysnap.app" target="_blank">
              TinySnap
            </a>
            , didn't take off as we'd hoped, we were eager to explore new ideas. We recognized the time-consuming nature of creating landing pages for each new concept, and thus, EarlyBird was born. Initially, it was a no-code solution built for ourselves to quickly test and validate ideas.
            </p>
            <p>
            Juggling our day jobs and this project, we spent about four weeks developing the MVP of EarlyBird, fueled by countless cups of coffee and working through many a baby's night cry. We then launched our MVP on Product Hunt, where it soared to become the #2 Product of the Day.
            </p>
            <p>The journey didn't stop there. We were thrilled to receive the Product Hunt Golden Kitty Award 2022, a testament to the value EarlyBird provides to its users.</p>
            <p>Today, EarlyBird has grown steadily, with thousands of users worldwide. These indie makers and startups leverage our landing page builder to bring their ideas to life and transform them into successful ventures. We are proud to be part of their journey and look forward to what the future brings.</p>
        </div>
      </div>
    </section>
  )
}

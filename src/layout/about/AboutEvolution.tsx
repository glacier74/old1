import { FC } from 'react'

export const AboutEvolution: FC = () => {
  return (
    <section className="xl:py-24 md:py-16 py-12 md:px-12 px-6 z-10">
      <div className="max-w-3xl mx-auto">
        <p className="text-xl leading-normal text-slate-900">
          EarlyBird was founded in December 2022. After failing to gain traction with our previous
          projects,{' '}
          <a className="underline" href="https://heyform.net" target="_blank">
            HeyForm
          </a>{' '}
          and{' '}
          <a className="underline" href="https://tinysnap.app" target="_blank">
            TinySnap
          </a>
          , we want to explore some new ideas. We know that creating landing pages for each new idea
          can be a time sink, so we built EarlyBird as a no-code solution to fix that problem. We've
          been growing steadily since launch, and now have thousands of users throughout the world
          using our landing page builder to validate their ideas and transform them into successful
          ventures.
        </p>
      </div>
    </section>
  )
}

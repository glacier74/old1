import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const features = [
  {
    title: 'Start with a template',
    desc: 'Choose your ideal template and effortlessly build a landing page. Our intuitive design makes it user-friendly, even for those not familiar with technology.',
    imageUrl: '/static/start-with-template.png'
  },
  {
    title: 'Copywriting from the wise',
    desc: 'Tap into the potential of AI for generating engaging copy for your landing page. We simplifie content creation, crafting compelling narratives that resonate with your audience.',
    imageUrl: '/static/copy-from-wise.png'
  },
  {
    title: 'Fully responsive',
    desc: 'Every landing page is set to be responsive and looks great on all devices, ensuring accessibility for everyone.',
    imageUrl: '/static/fully-responsive.png'
  },
  {
    title: 'Text formatting',
    desc: 'Easily add headings, links, paragraphs, and apply various text styles, including bold, italic, underline, etc.',
    imageUrl: '/static/text-formatting.png'
  },
  {
    title: 'SEO ready',
    desc: 'All landing pages are optimized for search engines by default, and you can customize the SEO fields to suit your specific needs.',
    imageUrl: '/static/seo-ready.png'
  },
  {
    title: 'Private mode',
    desc: 'Restrict access to your landing pages by keeping them password-protected for a select group of users.',
    imageUrl: '/static/private-mode.png'
  },
  {
    title: 'Teamwork made easy',
    desc: 'Invite team members to collaborate directly on your landing pages. Streamline workflow, share ideas, and create compelling content together.',
    imageUrl: '/static/teamwork-made-easy.png'
  }
]

export const FeaturesBuild: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="px-2 py-32 max-w-7xl mx-auto">
        <h1 className="px-4 md:px-0 text-slate-900 font-extrabold text-5xl">
          Build a landing page in 10 minutes
        </h1>
        <p className="px-4 md:px-0 mt-4 text-slate-700 text-xl">
          Create a high-quality landing page in no time, and start promoting your business and
          generating leads quickly.
        </p>

        <div className="mt-8 px-4 md:px-0">
          <ul role="list" className="md:grid md:grid-cols-2 md:gap-x-16">
            {features.map(feature => (
              <li key={feature.title} className="mb-16">
                <Image
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full mb-8 rounded rounded-md"
                  width={600}
                  height={400}
                  quality={100}
                />
                <h3 className="text-slate-900 font-extrabold text-2xl">{feature.title}</h3>
                <p className="mt-2 text-slate-700 text-xl">{feature.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

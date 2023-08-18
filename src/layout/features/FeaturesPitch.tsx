import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const features = [
  {
    title: 'Instant outreach',
    desc: 'Share your landing pages instantly with one click. Reach your audience faster, spread your ideas wider, and make your online presence felt. ',
    imageUrl: '/static/instant-outreach.png'
  },
  {
    title: 'Custom domain',
    desc: 'Use your own domain name to create a more professional-looking and cohesive experience for your customers.',
    imageUrl: '/static/custom-domain.png'
  },
  {
    title: 'Custom Open Graph',
    desc: 'Get your content stand out and attract more attention on social media with custom title, description, image, and other information.',
    imageUrl: '/static/custom-open-graph.png'
  },
  {
    title: 'Features walkthrough',
    desc: 'Highlight the key benefits and features of your product, and explain how it solves specific problems that your target customers have.',
    imageUrl: '/static/features-walkthrough.png'
  },
  {
    title: 'Image Carousel',
    desc: 'Showcase your product, service, or other visual content in an engaging way to your customers that your offering is worth investing in.',
    imageUrl: '/static/image-carousel.png'
  },
  {
    title: 'Social proof',
    desc: 'Show testimonials and ratings to build trust and credibility with potential customers.',
    imageUrl: '/static/social-proof.png'
  }
]

export const FeaturesPitch: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-slate-50">
      <div className="py-32 px-2 max-w-7xl mx-auto">
        <h1 className="px-4 md:px-0 text-slate-900 font-extrabold text-5xl">
          Pitch an idea and convince the audience
        </h1>
        <p className="px-4 md:px-0 mt-4 text-slate-700 text-xl">
          Convince the audience that your idea is worth their attention and investment, and
          encourage them to take the desired action.
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
                <h3 className="text-slate-900 font-bold text-2xl">{feature.title}</h3>
                <p className="mt-2 text-slate-700 text-xl">{feature.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

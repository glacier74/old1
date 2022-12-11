import {
  IconBuildingCarousel,
  IconGraph,
  IconLayoutGrid,
  IconPaint,
  IconSocial,
  IconWorldWww
} from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

export const FeaturesPitch: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="py-16 max-w-7xl mx-auto">
        <h1 className="max-w-5xl mx-auto text-white font-extrabold text-5xl text-left">
          Pitch an idea and{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            convince the audience
          </span>
        </h1>
        <p className="mt-4 max-w-5xl mx-auto text-slate-400 text-lg text-left">
          Convince the audience that your idea is worth their attention and investment, and
          encourage them to take the desired action.
        </p>

        <div className="mt-8 max-w-5xl mx-auto px-4 md:px-0">
          <div className="md:grid md:grid-cols-3 md:gap-4">
            <div className="mb-2 bg-slate-800 py-8 px-6 rounded rounded-md">
              <IconPaint
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-white font-bold text-lg">Custom branding</h3>
              <p className="mt-2 text-slate-400">
                Add your own logo, colors, and other branding elements to reflect your own brand.
              </p>
            </div>
            <div className="mb-2 bg-slate-800 py-8 px-6 rounded rounded-md">
              <IconWorldWww
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-white font-bold text-lg">Custom domain</h3>
              <p className="mt-2 text-slate-400">
                Use your own domain name to create a more professional-looking and cohesive
                experience for your customers.
              </p>
            </div>
            <div className="mb-2 bg-slate-800 py-8 px-6 rounded rounded-md">
              <IconGraph
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-white font-bold text-lg">Custom Open Graph</h3>
              <p className="mt-2 text-slate-400">
                Get your content stand out and attract more attention on social media with custom
                title, description, image, and other information.
              </p>
            </div>
            <div className="mb-2 bg-slate-800 py-8 px-6 rounded rounded-md">
              <IconLayoutGrid
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-white font-bold text-lg">Features walkthrough</h3>
              <p className="mt-2 text-slate-400">
                Highlight the key benefits and features of your product, and explain how it solves
                specific problems that your target customers have.
              </p>
            </div>
            <div className="mb-2 bg-slate-800 py-8 px-6 rounded rounded-md">
              <IconBuildingCarousel
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-white font-bold text-lg">Image Carousel</h3>
              <p className="mt-2 text-slate-400">
                Showcase your product, service, or other visual content in an engaging way to your
                customers that your offering is worth investing in.
              </p>
            </div>
            <div className="mb-2 bg-slate-800 py-8 px-6 rounded rounded-md">
              <IconSocial
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-white font-bold text-lg">Social proof</h3>
              <p className="mt-2 text-slate-400">
                Show testimonials and ratings to build trust and credibility with potential
                customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

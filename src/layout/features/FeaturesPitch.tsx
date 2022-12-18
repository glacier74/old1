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
        <h1 className="max-w-5xl mx-auto text-slate-900 font-extrabold text-4xl text-center">
          Pitch an idea and convince the audience
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-slate-500 text-lg text-center">
          Convince the audience that your idea is worth their attention and investment, and
          encourage them to take the desired action.
        </p>

        <div className="mt-8 max-w-5xl mx-auto px-4 md:px-0">
          <div className="md:grid md:grid-cols-3 md:gap-4">
            <div className="mb-2 bg-slate-50 py-8 px-6 rounded rounded-md shadow">
              <IconPaint
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-slate-900 font-bold text-lg">
                Custom branding
              </h3>
              <p className="mt-2 text-slate-500">
                Add your own logo, colors, and other branding elements to reflect your own brand.
              </p>
            </div>
            <div className="mb-2 bg-slate-50 py-8 px-6 rounded rounded-md shadow">
              <IconWorldWww
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-slate-900 font-bold text-lg">
                Custom domain
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                  Coming soon
                </span>
              </h3>
              <p className="mt-2 text-slate-500">
                Use your own domain name to create a more professional-looking and cohesive
                experience for your customers.
              </p>
            </div>
            <div className="mb-2 bg-slate-50 py-8 px-6 rounded rounded-md shadow">
              <IconGraph
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-slate-900 font-bold text-lg">Custom Open Graph</h3>
              <p className="mt-2 text-slate-500">
                Get your content stand out and attract more attention on social media with custom
                title, description, image, and other information.
              </p>
            </div>
            <div className="mb-2 bg-slate-50 py-8 px-6 rounded rounded-md shadow">
              <IconLayoutGrid
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-slate-900 font-bold text-lg">Features walkthrough</h3>
              <p className="mt-2 text-slate-500">
                Highlight the key benefits and features of your product, and explain how it solves
                specific problems that your target customers have.
              </p>
            </div>
            <div className="mb-2 bg-slate-50 py-8 px-6 rounded rounded-md shadow">
              <IconBuildingCarousel
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-slate-900 font-bold text-lg">Image Carousel</h3>
              <p className="mt-2 text-slate-500">
                Showcase your product, service, or other visual content in an engaging way to your
                customers that your offering is worth investing in.
              </p>
            </div>
            <div className="mb-2 bg-slate-50 py-8 px-6 rounded rounded-md shadow">
              <IconSocial
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-slate-900 font-bold text-lg">
                Social proof
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                  Coming soon
                </span>
              </h3>
              <p className="mt-2 text-slate-500">
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

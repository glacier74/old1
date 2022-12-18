import {
  IconDevices,
  IconInfinity,
  IconLego,
  IconLock,
  IconSearch,
  IconTextColor
} from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

export const FeaturesBuild: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="px-2 py-16 max-w-7xl mx-auto">
        <h1 className="max-w-5xl mx-auto text-slate-900 font-extrabold text-4xl text-center">
          Build a landing page in 10 minutes
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-slate-500 text-lg text-center">
          Create a high-quality landing page in no time, and start promoting your business and
          generating leads quickly.
        </p>

        <div className="mt-8 max-w-5xl mx-auto px-4 md:px-0">
          <div className="md:grid md:grid-cols-3 md:gap-4">
            <div className="mb-2 bg-slate-50 py-8 px-6 rounded rounded-md shadow">
              <IconLego
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-slate-900 font-bold text-lg">Newbie-friendly UI blocks</h3>
              <p className="mt-2 text-slate-500">
                Every UI block is designed to be easy to use and understand, even for those who are
                unfamiliar with technology.
              </p>
            </div>
            <div className="mb-2 bg-slate-50 py-8 px-6 rounded rounded-md shadow">
              <IconInfinity
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-slate-900 font-bold text-lg">Unlimited blocks</h3>
              <p className="mt-2 text-slate-500">
                Add as many blocks as you need to your landing page, and customize them to match the
                tone and aesthetic of your brand.
              </p>
            </div>
            <div className="mb-2 bg-slate-50 py-8 px-6 rounded rounded-md shadow">
              <IconTextColor
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-slate-900 font-bold text-lg">Text formatting</h3>
              <p className="mt-2 text-slate-500">
                Easily add headings, links, paragraphs, and apply various text styles, including
                bold, italic, underline, etc.
              </p>
            </div>
            <div className="mb-2 bg-slate-50 py-8 px-6 rounded rounded-md shadow">
              <IconSearch
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-slate-900 font-bold text-lg">SEO ready</h3>
              <p className="mt-2 text-slate-500">
                All landing pages are optimized for search engines by default, and you can customize
                the SEO fields to suit your specific needs.
              </p>
            </div>
            <div className="mb-2 bg-slate-50 py-8 px-6 rounded rounded-md shadow">
              <IconLock
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-slate-900 font-bold text-lg">Private mode</h3>
              <p className="mt-2 text-slate-500">
                Restrict access to your landing pages by keeping them password-protected for a
                select group of users.
              </p>
            </div>
            <div className="mb-2 bg-slate-50 py-8 px-6 rounded rounded-md shadow">
              <IconDevices
                size={64}
                strokeWidth={2}
                className="mb-4 text-white p-4 rounded-full bg-slate-700"
              />
              <h3 className="text-slate-900 font-bold text-lg">Fully responsive</h3>
              <p className="mt-2 text-slate-500">
                Every landing page is set to be responsive and looks great on all devices, ensuring
                accessibility for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

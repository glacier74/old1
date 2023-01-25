import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC, useMemo } from 'react'

import testimonials from '~/assets/testimonials.json'
import { IconProducthunt, IconTwitter } from '~/components'
import { waterfall } from '~/utils'
import CrownLeavesLeft from '~public/static/leaves-left.png'
import CrownLeavesRight from '~public/static/leaves-right.png'
import RatingStars from '~public/static/stars.svg'

interface Testimonial {
  type: string
  postUrl: string
  date: string
  nickname: string
  accountName?: string
  accountUrl?: string
  avatar: string
  title?: string
  message: string
}

const TestimonialTwitter: FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="w-full bg-white shadow-md shadow-emerald-200/50 border border-slate-200 p-5 mb-4 rounded-md">
      <div className="w-full flex items-center">
        <a href={testimonial.accountUrl} target="_blank" rel="noreferrer">
          <img
            className="w-12 h-12 rounded-full"
            src={testimonial.avatar}
            width="48"
            height="48"
            alt={testimonial.nickname}
          />
        </a>
        <div className="flex-grow pl-3">
          <div className="flex justify-between my-auto">
            <div>
              <h4 className="font-bold inline text-md">
                <a
                  className="hover:underline"
                  href={testimonial.accountUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {testimonial.nickname}
                </a>
              </h4>
              <div className="text-sm text-sm text-slate-500 ">
                <a
                  className="hover:underline"
                  href={testimonial.accountUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {testimonial.accountName}
                </a>
              </div>
            </div>
            <a href={testimonial.postUrl} target="_blank" rel="noreferrer" aria-label="Twitter">
              <IconTwitter className="w-6 h-6 text-[#1ea1f2]" />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full flex-grow mt-2">
        <div className="text-slate-700 text-md">
          <p dangerouslySetInnerHTML={{ __html: testimonial.message }} />
        </div>
      </div>

      <div className="w-full flex justify-between mt-2">
        <div className="text-sm text-slate-500 mt-2">
          <a
            className="hover:underline"
            href={testimonial.postUrl}
            target="_blank"
            rel="noreferrer"
          >
            {testimonial.date}
          </a>
        </div>
      </div>
    </div>
  )
}

const TestimonialProducthunt: FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="w-full bg-white shadow-md shadow-emerald-200/50 border border-slate-200 p-5 mb-4 rounded-md">
      <div className="w-full flex items-center">
        <a href={testimonial.postUrl} target="_blank" rel="noreferrer">
          <img
            className="w-12 h-12 rounded-full"
            src={testimonial.avatar}
            width="48"
            alt={testimonial.nickname}
          />
        </a>
        <div className="flex-grow pl-3">
          <div className="flex justify-between my-auto">
            <div>
              <h4 className="font-bold inline text-md">
                <a
                  className="hover:underline"
                  href={testimonial.postUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {testimonial.nickname}
                </a>
              </h4>
              <div className="text-sm text-sm text-slate-500 ">{testimonial.title}</div>
            </div>
            <a
              href={testimonial.postUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Product Hunt"
            >
              <IconProducthunt className="w-6 h-6 text-[#da552f]" />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full flex-grow mt-2">
        <div className="text-slate-700 text-md">
          <p dangerouslySetInnerHTML={{ __html: testimonial.message }} />
        </div>
      </div>

      <div className="w-full flex justify-between mt-2">
        <div className="text-sm text-slate-500 mt-2">
          <a
            className="hover:underline"
            href={testimonial.postUrl}
            target="_blank"
            rel="noreferrer"
          >
            {testimonial.date}
          </a>
        </div>
      </div>
    </div>
  )
}

const TestimonialEmail: FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="w-full bg-white shadow-md shadow-emerald-200/50 border border-slate-200 p-5 mb-4 rounded-md">
      <div className="w-full flex items-center">
        <div>
          <img
            className="w-12 h-12 rounded-full"
            src={testimonial.avatar}
            width="48"
            alt={testimonial.nickname}
          />
        </div>
        <div className="flex-grow pl-3">
          <div className="flex justify-between my-auto">
            <div>
              <h4 className="font-bold inline text-md">{testimonial.nickname}</h4>
              <div className="text-sm text-sm text-slate-500 ">{testimonial.title}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex-grow mt-2">
        <div className="text-slate-700 text-md">
          <p dangerouslySetInnerHTML={{ __html: testimonial.message }} />
        </div>
      </div>

      <div className="w-full flex justify-between mt-2">
        <div className="text-sm text-slate-500 mt-2">{testimonial.date}</div>
      </div>
    </div>
  )
}

const TestimonialItem: FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  switch (testimonial.type) {
    case 'twitter':
      return <TestimonialTwitter testimonial={testimonial} />

    case 'producthunt':
      return <TestimonialProducthunt testimonial={testimonial} />

    case 'email':
      return <TestimonialEmail testimonial={testimonial} />

    default:
      return null
  }
}

export const HomeTestimonials: FC = () => {
  const { t } = useTranslation()
  const columns = useMemo(
    () =>
      waterfall<Testimonial>(testimonials as Testimonial[], 3, testimonial => {
        return testimonial.message.length
      }),
    [testimonials]
  )

  return (
    <section className="relative py-32 mt-32 bg-emerald-100">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-center font-extrabold text-5xl text-slate-900">
          People *really* love EarlyBird
        </h2>
        <div className="max-w-3xl mx-auto text-center text-xl text-slate-700 mt-4">
          They even put in extra effort to express how much they adore crafting their landing pages
          on EarlyBird.
        </div>



        <div className="relative mt-8 md:flex md:space-x-8">
          {columns.map((column, i) => (
            <div key={i} className="md:flex-1">
              {column.map((testimonial, k) => (
                <TestimonialItem key={k} testimonial={testimonial as Testimonial} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

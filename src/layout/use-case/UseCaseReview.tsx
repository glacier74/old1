import { FC, useMemo } from 'react'

import { waterfall } from '~/utils'

import { TestimonialItem } from '../home/HomeTestimonials'

export const UseCaseReview: FC<{ testimonials: TestimonialRecord[] }> = ({ testimonials }) => {
  const columns = useMemo(
    () =>
      waterfall<TestimonialRecord>(testimonials, 3, testimonial => {
        return testimonial.Testimonial.length
      }),
    [testimonials]
  )

  return (
    <section className="max-w-7xl mx-auto xl:px-32 sm:px-10 px-6 z-10 py-16">
      <div className="sm:text-5xl text-3xl font-bold text-center">
        Here's what people say about us
      </div>

      <div className="relative mt-16 md:flex md:space-x-8">
        {columns.map((column, i) => (
          <div key={i} className="md:flex-1 flex flex-col gap-y-6 sm:gap-y-8">
            {column.map((testimonial, k) => (
              <TestimonialItem key={k} testimonial={testimonial as TestimonialRecord} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

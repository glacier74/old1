import { IconImage } from '@earlybirdim/icons'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

import { dataReview } from './dataReview'

export const UseCaseReview: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="relative xl:px-32 sm:px-10 px-6 z-10">
      <div className="text-center">
        <div className="sm:text-3xl text-2xl font-semibold">Here's what people say about us</div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-9 gap-5 text-left sm:mt-10 mt-5">
          {dataReview.map((review, index) => (
            <div
              key={index}
              className="flex flex-col justify-between cursor-pointer text-sm border border-[#bbbbbb] rounded-md p-4 w-full h-60"
            >
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Image src={review.avatar} alt={''} width={50} height={50} quality={100} />
                    <div>
                      <div className="font-bold">{review.name}</div>
                      <div className="text-xs text-[#707070] font-medium">{review.role}</div>
                    </div>
                  </div>
                  {review.icon ? <IconImage /> : ''}
                </div>
                <div className="text-sm h-28 overflow-y-scroll scrollbar">{review.content}</div>
              </div>
              <div className="text-xs text-[#707070] font-medium">{review.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { IconHeart } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

interface Props {
  microsaasideasData: []
}

interface MicroSaasIdeasData {
  Name: string
  Excerpt: string
  Like: string
}

export const MicroSaasIdeasTop: FC<Props> = ({ microsaasideasData }) => {
  const { t } = useTranslation()

  return (
    <section className="relative xl:px-32 sm:px-10 px-6 z-10">
      <div className="text-center">
        <div className="sm:text-3xl text-2xl font-semibold">Top micro SaaS ideas</div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-9 gap-5 text-left sm:mt-11 mt-5">
          {microsaasideasData.map((top: MicroSaasIdeasData, index) => (
            <div
              key={index}
              className="flex flex-col justify-between cursor-pointer text-sm border border-black rounded-md p-5 w-full h-52"
            >
              <div>
                <div className="flex justify-center items-center w-20 h-6 text-white text-sm bg-[#5AC46C] rounded">
                  Developer
                </div>
                <div className="text-base font-semibold py-2">{top.Name}</div>
                <div className="text-xs">{top.Excerpt}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs underline font-semibold">I want to build this!</div>
                <div className="flex items-center gap-1">
                  <IconHeart className="text-[#D72D2D] w-4" />
                  <div className="text-xs">{top.Like}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

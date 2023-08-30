import { FC } from 'react'

interface OpenGraphImageProps {
  name: string
  metaTitle: string
  metaDescription: string
}

export const OpenGraphImage: FC<OpenGraphImageProps> = ({ name, metaTitle, metaDescription }) => {
  return (
    <div
      className="flex flex-col w-full pointer-events-none"
      style={{
        backgroundImage:
          'radial-gradient(60% 100%,#fff,rgba(255,255,255,0.1)),radial-gradient(100% 30% at 50% 0px, #fff 60%, rgba(255,255,255,0.1)),linear-gradient(120.7deg,#fbddf0 10.68%,#c2f2ff 88.93%)'
      }}
    >
      <div className="h-[80px] pt-[12px] px-[30px] w-full flex items-center justify-center">
        <div className="text-[18px] text-slate-900 text-center font-bold">{metaTitle}</div>
      </div>
      <div className="w-full px-[20px] h-[200px] flex flex-col">
        <div className="relative w-full h-full p-[20px] flex flex-col bg-white/70 rounded-t-[8px]">
          <div className="absolute top-[12px] left-[8px] flex">
            <div className="w-[12px] h-[12px] rounded-full bg-[#EC6A5F]"></div>
            <div className="w-[12px] h-[12px] ml-[6px] rounded-full bg-[#F4BF4F]"></div>
            <div className="w-[12px] h-[12px] ml-[6px] rounded-full bg-[#61C454]"></div>
          </div>

          <div className="mt-[12px] w-full flex items-center justify-center">
            <div className="text-[16px] text-slate-700 text-center font-bold">{name}</div>
          </div>
          <div className="mt-[12px] flex-1 w-full flex items-center justify-center">
            <div className="text-[14px] text-slate-500 text-center font-bold">
              {metaDescription}
            </div>
          </div>
          <div className="mt-[12px] w-full flex items-center justify-center">
            <div className="px-4 py-1 bg-slate-900 rounded-full text-white text-[14px]">
              Get started
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

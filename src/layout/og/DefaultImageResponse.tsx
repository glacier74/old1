import { FC } from 'react'

interface DefaultImageResponseProps {
  name?: string
  metaTitle?: string
  metaDescription?: string
}

export const DefaultImageResponse: FC<DefaultImageResponseProps> = ({
  name = '',
  metaTitle = '',
  metaDescription = ''
}) => (
  <div
    tw="flex flex-col w-full h-full"
    style={{
      backgroundImage:
        'radial-gradient(60% 100%,#fff,rgba(255,255,255,0.1)),radial-gradient(100% 30% at 50% 0px, #fff 60%, rgba(255,255,255,0.1)),linear-gradient(120.7deg,#fbddf0 10.68%,#c2f2ff 88.93%)'
    }}
  >
    <div tw="h-[140px] pt-[20px] px-[60px] w-full flex items-center justify-center">
      <div tw="text-[32px] text-slate-900 text-center font-bold">{metaTitle?.slice(0, 60)}</div>
    </div>
    <div tw="w-full px-[60px] h-[280px] flex flex-col">
      <div tw="relative w-full h-full p-[40px] flex flex-col bg-white/70 rounded-t-[16px]">
        <div tw="absolute top-[16px] left-[16px] flex">
          <div tw="w-[16px] h-[16px] rounded-full bg-[#EC6A5F]"></div>
          <div tw="w-[16px] h-[16px] ml-[8px] rounded-full bg-[#F4BF4F]"></div>
          <div tw="w-[16px] h-[16px] ml-[8px] rounded-full bg-[#61C454]"></div>
        </div>

        <div tw="mt-[12px] w-full flex items-center justify-center">
          <div tw="text-[28px] text-slate-700 text-center font-bold">{name}</div>
        </div>
        <div tw="mt-[24px] flex-1 w-full flex items-center justify-center">
          <div tw="text-[20px] text-slate-500 text-center font-bold">
            {metaDescription?.slice(0, 120)}
          </div>
        </div>
        <div tw="mt-[24px] w-full flex items-center justify-center">
          <div tw="px-8 py-2 bg-slate-900 rounded-full text-white text-lg">Get started</div>
        </div>
      </div>
    </div>
  </div>
)

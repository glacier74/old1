import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

export const IntegrationsDetailHero: FC = () => {
  const router = useRouter()
  const name = router.query.name ?? ''
  const id = router.query.id ?? ''

  return (
    <section className="flex md:flex-row flex-col 2xl:px-52 xl:px-36 lg:px-20 md:px-12 px-6 md:py-24 py-10 gap-10">
      <div className="flex flex-col items-center gap-5 lg:w-1/5 md:w-1/4 w-full">
        <div className="md:w-full w-40">
          <Image src="" alt={''} width={200} height={200} quality={100} style={{ width: '100%' }} />
        </div>
        <div className="flex flex-col gap-3 text-sm underline w-full md:text-left text-center">
          <div className="cursor-pointer capitalize">Temp {id}</div>
          <div className="cursor-pointer capitalize">Temp {id}</div>
        </div>
      </div>
      <div className="flex flex-col md:gap-10 gap-5 lg:w-4/5 md:w-3/4 w-full">
        <div className="flex text-sm">
          <span className="text-[#7E8491] capitalize">
            [Categories&nbsp;-&gt;&nbsp;{router.query.slug}
          </span>
          <span className="capitalize">&nbsp;-&gt;&nbsp;{name}]</span>
        </div>
        <div className="flex flex-col md:gap-5 gap-2">
          <div className="md:text-3xl text-xl font-semibold capitalize">{name}</div>
          <div className="md:text-base text-sm">Temp {id}</div>
        </div>
      </div>
    </section>
  )
}

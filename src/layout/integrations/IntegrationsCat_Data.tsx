import { IconSearch } from '@tabler/icons'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  groups: Array<{
    category: string
    records: IntegrationRecord[]
  }>
}

export const IntegrationsCat_Data: FC<Props> = ({ groups }) => {
  return (
    <div className="w-full">
      <div className="">
        <div className="flex items-center relative">
          <input
            type="text"
            className="flex items-center sm:pl-16 pl-14 sm:py-3 py-2 lg:w-[65%] w-full rounded-3xl border border-[#919eab3d] text-sm"
            placeholder="Search"
          />
          <IconSearch className="absolute left-[20px] cursor-pointer" />
        </div>

        <div className="mt-14 space-y-8">
          {groups.map(g => (
            <div key={g.category}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-gray-900">{g.category}</h2>
              </div>

              <div className="grid lg:grid-cols-3 min-[500px]:grid-cols-2 grid-cols-1 xl:gap-10 lg:gap-8 gap-5">
                {g.records.map(record => (
                  <Link href={`/integrations/${record.slug}`} key={record.slug}>
                    <div className="mb-6 cursor-pointer text-sm">
                      <Image
                        src={record.Logo!}
                        alt={record.Name}
                        width={80}
                        height={80}
                        quality={100}
                      />
                      <div className="text-lg font-bold mt-5">{record.Name}</div>
                      <div className="text-sm text-[#7d848f] mt-1">{record.Description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

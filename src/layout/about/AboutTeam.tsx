import { IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

import { dataTeam } from './dataTeam'

export const AboutTeam: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="lg:max-w-5xl max-w-3xl mx-auto px-6 z-10 mt-12">
        <div className="flex flex-col justify-center lg:gap-20 sm:gap-14 gap-10 text-center">
          <h3 className="sm:text-4xl text-2xl font-bold">The minds behind the magic</h3>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            {dataTeam.map((team, index) => (
              <div
                key={index}
                className="flex flex-col xl:gap-6 gap-3 items-center rounded-md border border-slate-50 shadow-lg py-16"
              >
                <Image
                  src={team.avatar}
                  width={160}
                  height={160}
                  alt={team.name}
                  className="rounded-full md:w-1/2 w-32"
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="sm:text-lg text-sm font-medium text-slate-900">{team.name}</div>
                  <div className="text-sm text-slate-500 mb-2">{team.role}</div>
                  <div className="flex gap-3">
                    {team.linkedin !== '' && (
                      <a href={team.linkedin} target="_blank">
                        <IconBrandLinkedin />
                      </a>
                    )}
                    {team.twitter !== '' && (
                      <a href={team.twitter} target="_blank">
                        <IconBrandTwitter />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

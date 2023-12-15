import { isValidArray } from '@nily/utils'
import dayjs from 'dayjs'
import { useMemo } from 'react'

import { SkillsIcon } from '~/layout/builder3/rightSidebar2/AddWidget/AddSkills/SkillsIcons'

import { EducationExperience, ExperienceData, WidgetConfig, WorkExperience } from '../WidgetProps'
import Widget from './Widget'

export default class ExperienceWidget<T extends ExperienceData> extends Widget<T> {
  override Render1x1(config: WidgetConfig<T>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const data = useMemo(() => ExperienceWidget._getData(config.data), [config.data])

    return (
      <div className="block w-full h-full">
        <div className="flex h-full flex-col">
          <SkillsIcon
            iconType="svg"
            svgName={config.data.experienceType}
            imageUrl={config.data.imageUrl}
          />

          <div className="mt-2 md:mt-3 flex-1 flex flex-col space-y-1.5">
            <h3 className="line-clamp-2 md:line-clamp-3 md:mt-2 text-sm leading-[1.2] text-slate-950 dark:text-slate-50">
              {data?.name}
            </h3>
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{data?.role}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{data?.date}</div>
          </div>
        </div>
      </div>
    )
  }

  override Render2x1(config: WidgetConfig<T>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const data = useMemo(() => ExperienceWidget._getData(config.data), [config.data])

    return (
      <div className="block w-full h-full">
        <div className="flex h-full flex-col">
          <SkillsIcon
            iconType="svg"
            svgName={config.data.experienceType}
            imageUrl={config.data.imageUrl}
          />

          <div className="mt-2 md:mt-3 flex-1">
            <div className="flex items-start justify-between md:mt-2">
              <div className="w-[calc(100%-140px)] space-y-2">
                <h3 className="line-clamp-2 md:line-clamp-3 text-sm leading-[1.2] break-words text-slate-950 dark:text-slate-50">
                  {data?.name}
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {data?.role}
                </div>
              </div>
              <div className="w-[120px] text-right text-xs text-slate-500 dark:text-slate-400">
                {data?.date}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 2x0.5
  override Render2x05(config: WidgetConfig<T>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const data = useMemo(() => ExperienceWidget._getData(config.data), [config.data])

    return (
      <div className="block w-full h-full">
        <div className="flex h-full items-center gap-3">
          <SkillsIcon
            iconType="svg"
            svgName={config.data.experienceType}
            imageUrl={config.data.imageUrl}
          />

          <div className="max-[400px]:max-w-[calc(100%-44px)] max-w-[calc(100%-52px)]">
            <h3 className="truncate text-sm text-gray-900 dark:text-slate-50">{data?.name}</h3>
            <div className="text-xs text-slate-500 dark:text-slate-400">{data?.role}</div>
          </div>
        </div>
      </div>
    )
  }

  private static _getDates(dates: [string, string | undefined]) {
    if (!isValidArray(dates)) {
      return ''
    }

    const [startDate, endDate] = dates

    const start = dayjs(startDate).format('MMM YYYY')
    const end = endDate ? dayjs(endDate).format('MMM YYYY') : 'Present'

    return [start, end].join(' - ')
  }

  private static _getData(data: ExperienceData) {
    switch (data.experienceType) {
      case 'work':
        return {
          name: (data as WorkExperience).workName,
          role: (data as WorkExperience).workRole,
          date: ExperienceWidget._getDates((data as WorkExperience).workDate)
        }

      case 'education':
        return {
          name: (data as EducationExperience).educationName,
          role: (data as EducationExperience).educationField,
          date: ExperienceWidget._getDates((data as EducationExperience).educationDate)
        }
    }
  }
}

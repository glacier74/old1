import { Rating } from '~/components'
import { SkillsIcon } from '~/layout/builder3/rightSidebar2/AddWidget/AddSkills/SkillsIcons'

import { SkillsData, WidgetConfig } from '../WidgetProps'
import Widget from './Widget'

export default class SkillsWidget<T extends SkillsData> extends Widget<T> {
  override Render1x1(config: WidgetConfig<T>) {
    return (
      <div className="block w-full h-full">
        <div className="flex h-full flex-col">
          <SkillsIcon
            iconType={config.data.icon.type}
            svgName={config.data.icon.svgName}
            imageUrl={config.data.icon.imageUrl}
          />

          <div className="mt-2 md:mt-3 flex-1 flex flex-col">
            <h3 className="widget-headline mt-1 line-clamp-2 md:line-clamp-3 md:mt-2 text-sm leading-[1.2] text-slate-950 dark:text-slate-50">
              {config.data.title}
            </h3>
            <div className="flex-1"></div>
            <Rating
              className="w-full !gap-0 justify-between"
              itemClassName="!w-[22px] !h-[22px]"
              value={config.data.rating}
              readonly={true}
            />
          </div>
        </div>
      </div>
    )
  }

  // 2x0.5
  override Render2x05(config: WidgetConfig<T>) {
    return (
      <div className="block w-full h-full">
        <div className="flex h-full items-center gap-3">
          <SkillsIcon
            iconType={config.data.icon.type}
            svgName={config.data.icon.svgName}
            imageUrl={config.data.icon.imageUrl}
          />

          <h3 className="flex-1 truncate text-sm text-gray-900 dark:text-slate-50">
            {config.data.title}
          </h3>

          <Rating itemClassName="!w-[22px] !h-[22px]" value={config.data.rating} readonly={true} />
        </div>
      </div>
    )
  }
}

import { SkillsData } from '@earlybirdim/components/WidgetList/WidgetProps'
import { FC, useCallback, useMemo } from 'react'

import { useOptions } from '~/layout/builder3/context'

import { SkillsIconPicker, SkillsIconType } from '../AddWidget/AddSkills/SkillsIconPicker'

interface SkillsIconSubOptionProps {
  title: string
  path: string
}

export const SkillsIconSubOption: FC<SkillsIconSubOptionProps> = ({ title, path }) => {
  const { value: rawValue, update } = useOptions<SkillsData['icon']>(path, {} as any)
  const value = useMemo(
    () => ({
      type: rawValue?.type,
      value: rawValue?.type === 'svg' ? rawValue.svgName : rawValue.imageUrl
    }),
    [rawValue.imageUrl, rawValue.svgName, rawValue?.type]
  )

  const handleChange = useCallback(
    (newValue: SkillsIconType) => {
      update({
        ...rawValue,
        type: newValue.type,
        ...(newValue.type === 'svg' ? { svgName: newValue.value } : { imageUrl: newValue.value })
      })
    },
    [rawValue, update]
  )

  return (
    <div className="builder-option">
      <div className="builder-option__title">{title}</div>
      <div className="builder-option__content">
        <SkillsIconPicker value={value} onChange={handleChange} />
      </div>
    </div>
  )
}

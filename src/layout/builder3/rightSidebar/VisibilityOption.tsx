import { Button, Dropdown, Menus, Tooltip } from '@heyforms/ui'
import { IconEye } from '@tabler/icons'
import clsx from 'clsx'
import { FC, useCallback } from 'react'

import { IconEyeClosed, IconLayoutGridRemove } from '~/components'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'

interface SchemaItemProps {
  schema: any
  isHidden?: boolean
  onClick: (name: string) => void
}

const SchemaItem: FC<SchemaItemProps> = ({ schema, isHidden, onClick }) => {
  function handleClick() {
    onClick(schema.name)
  }

  return (
    <div className="flex items-center justify-between gap-2 text-sm py-0.5">
      <div className={clsx('truncate', isHidden ? 'text-slate-300' : 'text-slate-900')}>
        {schema.title}
      </div>
      <button
        className="-mr-2 p-1 text-slate-900 rounded-lg hover:bg-slate-100"
        onClick={handleClick}
      >
        {isHidden ? <IconEyeClosed className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
      </button>
    </div>
  )
}

export const VisibilityOption: FC<{ schemas: any[] }> = ({ schemas }) => {
  const { siteSettings, setSiteSettings } = useStore()

  const handleClick = useCallback(
    (name: string) => {
      const hiddenBlocks = siteSettings.hiddenBlocks.includes(name)
        ? siteSettings.hiddenBlocks.filter(hb => hb !== name)
        : [...siteSettings.hiddenBlocks, name]

      setSiteSettings({
        ...siteSettings,
        hiddenBlocks
      })

      SiteSettingsService.updateSettings(siteSettings.productId, {
        hiddenBlocks
      })
    },
    [siteSettings]
  )

  const Overlay = (
    <Menus className="text-sm p-4">
      <div className="font-semibold">Visibility</div>
      <div className="mt-3">
        {schemas.map(schema => (
          <SchemaItem
            key={schema.name}
            schema={schema}
            isHidden={siteSettings.hiddenBlocks.includes(schema.name)}
            onClick={handleClick}
          />
        ))}
      </div>
    </Menus>
  )

  return (
    <Dropdown overlay={Overlay} dismissOnClickInside={false}>
      <Tooltip ariaLabel="Visibility">
        <div>
          <Button
            className="!p-1"
            leading={<IconLayoutGridRemove className="w-5 h-5 text-slate-800" />}
          />
        </div>
      </Tooltip>
    </Dropdown>
  )
}

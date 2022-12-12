import { Switch, Tooltip } from '@heyforms/ui'
import { FC, useCallback, useMemo } from 'react'

import { IconLayoutLeft, IconLayoutRight } from '~/components'
import { useBuilderContext } from '~/layout/builder/context'

export const FeatureSettings: FC<{ block: FeatureBlock }> = ({ block }) => {
  const { dispatch } = useBuilderContext()

  const options: any[] = useMemo(
    () => [
      {
        value: 'left',
        label: (
          <Tooltip ariaLabel="Align left">
            <IconLayoutRight className="w-4 h-4" />
          </Tooltip>
        )
      },
      {
        value: 'right',
        label: (
          <Tooltip ariaLabel="Align right">
            <IconLayoutLeft className="w-4 h-4" />
          </Tooltip>
        )
      }
    ],
    []
  )

  const handleChange = useCallback(
    (layout: any) => {
      dispatch({
        type: 'updateBlock',
        payload: {
          blockId: block.id,
          updates: {
            layout
          }
        }
      })
    },
    [block.id]
  )

  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Layout</div>
        <Switch.Group
          className="builder-mode"
          value={block.layout || 'left'}
          options={options}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

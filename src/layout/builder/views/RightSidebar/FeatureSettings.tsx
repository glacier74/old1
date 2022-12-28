import { Switch } from '@heyforms/ui'
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
          <div className="flex items-center px-1">
            <IconLayoutLeft className="w-4 h-4" />
            <span className="text-sm ml-1">Left</span>
          </div>
        )
      },
      {
        value: 'right',
        label: (
          <div className="flex items-center px-1">
            <IconLayoutRight className="w-4 h-4" />
            <span className="text-sm ml-1">Right</span>
          </div>
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
        <div className="text-sm font-medium">Layout align</div>
        <Switch.Group value={block.layout || 'left'} options={options} onChange={handleChange} />
      </div>
    </div>
  )
}

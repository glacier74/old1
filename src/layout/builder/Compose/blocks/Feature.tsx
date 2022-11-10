import { Switch, Tooltip } from '@heyforms/ui'
import { IconLayoutAlignLeft, IconLayoutAlignRight } from '@tabler/icons'
import clsx from 'clsx'
import { FC, useMemo } from 'react'

import { useComposeStore } from '~/layout/builder/Compose/store'

import { Block, BlockProps } from './Block'
import { BlockWrapper } from './index'

interface FeatureProps extends Omit<BlockProps, 'enableCommand' | 'enableTextFormat'> {
  block: FeatureBlock
}

export const FeatureSettings: FC<Pick<FeatureProps, 'block'>> = ({ block }) => {
  const { dispatch } = useComposeStore()

  const options: any[] = useMemo(
    () => [
      {
        value: 'left',
        label: (
          <Tooltip ariaLabel="Left to right">
            <IconLayoutAlignLeft />
          </Tooltip>
        )
      },
      {
        value: 'right',
        label: (
          <Tooltip ariaLabel="Right to left">
            <IconLayoutAlignRight />
          </Tooltip>
        )
      }
    ],
    []
  )

  function handleChange(align: any) {
    dispatch({
      type: 'updateBlock',
      payload: {
        blockId: block.id,
        updates: {
          align
        }
      }
    })
  }

  return (
    <div className="flex items-center justify-between px-4 py-2 text-slate-700">
      <span>Layout</span>
      <Switch.Group value={block.align} options={options} onChange={handleChange} />
    </div>
  )
}

export const Feature: FC<FeatureProps> = ({ block, placeholder, ...restProps }) => {
  return (
    <Block className={`block-align-${block.align}`} block={block} {...restProps}>
      <div
        className={clsx('flex flex-start justify-between', {
          'flex-row-reverse': block.align === 'right'
        })}
      >
        {block.blocks.map(child => (
          <BlockWrapper key={child.id} block={child} enableAction={false} enableDropZone={false} />
        ))}
      </div>
    </Block>
  )
}

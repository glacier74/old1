import { Block, BlockProps } from '@earlybirdim/blocks'
import clsx from 'clsx'
import { FC, useMemo } from 'react'

import components from '~/layout/builder2/components'
import { useBuilderContext } from '~/layout/builder2/context'

export const BlockWrapper: FC<Omit<BlockProps<any>, 'children'>> = ({ data, ...restProps }) => {
  const { state, dispatch } = useBuilderContext()

  const component = useMemo(() => components[data.componentId], [data.componentId])
  const isSelected = useMemo(
    () => state.selectedBlockId === data.id,
    [data.id, state.selectedBlockId]
  )

  function handleClick() {
    dispatch({
      type: 'selectBlock',
      payload: {
        blockId: data.id
      }
    })
  }

  if (!component) {
    console.warn(`Component ${data.type} ${data.componentId} is not exists`)
    return null
  }

  return (
    <div
      className={clsx('block-root', { 'block-root-selected': isSelected })}
      data-block-type={data.type.replaceAll('_', ' ')}
      onClick={handleClick}
    >
      <Block data={data}>
        <component.render data={data} />
      </Block>
    </div>
  )
}

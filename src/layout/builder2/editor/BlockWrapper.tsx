import { Block, BlockProps } from '@earlybirdim/blocks'
import clsx from 'clsx'
import { FC, useMemo } from 'react'

import { useProductId } from '~/layout'
import components from '~/layout/builder2/components'
import { useBuilderContext } from '~/layout/builder2/context'

export const BlockWrapper: FC<Omit<BlockProps<any>, 'children' | 'productId'>> = ({ block }) => {
  const { state, dispatch } = useBuilderContext()
  const productId = useProductId()

  const component = useMemo(() => components[block.componentId], [block.componentId])
  const isSelected = useMemo(
    () => state.selectedBlockId === block.id,
    [block.id, state.selectedBlockId]
  )

  function handleClick() {
    dispatch({
      type: 'selectBlock',
      payload: {
        blockId: block.id
      }
    })
  }

  if (!component) {
    console.warn(`Component ${block.type} ${block.componentId} is not exists`)
    return null
  }

  return (
    <div
      className={clsx('block-root', { 'block-root-selected': isSelected })}
      data-block-type={block.type.replaceAll('_', ' ')}
      onClick={handleClick}
    >
      <Block productId={productId} block={block}>
        <component.render data={block} />
      </Block>
    </div>
  )
}

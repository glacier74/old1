import type { FC } from 'react'
import { ReactSortable } from 'react-sortablejs'

import { useBuilderContext } from '../../context'
import { BlockCard } from './BlockCard'

export const BlockCardList: FC = () => {
  const { state, dispatch } = useBuilderContext()

  function handleSortStart(event: any) {
    dispatch({
      type: 'selectBlock',
      payload: {
        blockId: state.blocks[event.oldIndex].id
      }
    })
  }

  function handleSortFields(blocks: Block[]) {
    dispatch({
      type: 'setBlocks',
      payload: blocks
    })
  }

  return (
    <ReactSortable
      className="flex-1 px-4 scrollbar"
      ghostClass="field-card-ghost"
      chosenClass="field-card-chosen"
      dragClass="field-card-dragging"
      fallbackClass="field-card-cloned"
      list={state.blocks}
      setList={handleSortFields}
      onStart={handleSortStart}
      delay={10}
      animation={150}
    >
      {state.blocks.map(block => (
        <BlockCard key={block.id} block={block} selectedId={state.selectBlockId} />
      ))}
    </ReactSortable>
  )
}

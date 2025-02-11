import { Button } from '@heyforms/ui'
import { IconX } from '@tabler/icons'
import { FC } from 'react'
import { ReactSortable } from 'react-sortablejs'

import { useBuilderContext } from '~/layout/builder2/context'

import { BlockItem } from './BlockItem'

export const Blocks: FC = () => {
  const { state, dispatch } = useBuilderContext()

  function handleSetList(blocks: any[]) {
    dispatch({
      type: 'setBlocks',
      payload: {
        blocks
      }
    })
  }

  function handleClose() {
    dispatch({
      type: 'updateState',
      payload: {
        updates: {
          activeTabName: undefined
        }
      }
    })
  }

  function handleModalOpen() {
    dispatch({
      type: 'updateState',
      payload: {
        updates: {
          isCreateBlockModalOpen: true
        }
      }
    })
  }

  if (state.activeTabName !== 'blocks') {
    return null
  }

  return (
    <div className="sidebar-container">
      <div className="flex items-center justify-between px-4 pb-2">
        <span>Blocks</span>
        <Button.Link className="-mr-3.5" leading={<IconX />} onClick={handleClose} />
      </div>
      <div className="flex-1 px-2 pb-2 scrollbar">
        <ReactSortable
          ghostClass="field-card-ghost"
          chosenClass="field-card-chosen"
          dragClass="field-card-dragging"
          fallbackClass="field-card-cloned"
          list={state.blocks}
          setList={handleSetList}
          delay={10}
          animation={150}
        >
          {state.blocks.map(block => (
            <BlockItem key={block.id} block={block} selectedId={state.selectedBlockId} />
          ))}
        </ReactSortable>
        <div className="mt-2 px-2">
          <Button className="w-full !py-1.5" onClick={handleModalOpen}>
            Add block
          </Button>
        </div>
      </div>
    </div>
  )
}

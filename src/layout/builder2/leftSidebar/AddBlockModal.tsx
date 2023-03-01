import { Modal } from '@heyforms/ui'
import { v4 } from 'uuid'

import components from '~/layout/builder2/components'
import { useBuilderContext } from '~/layout/builder2/context'
import { getBlockSetting } from '~/layout/builder2/utils'

const BLOCKS = [
  {
    title: 'Header',
    type: 'header',
    components: [
      {
        componentId: 'header1'
      }
    ]
  },
  {
    title: 'Hero',
    type: 'hero',
    components: [
      {
        componentId: 'hero1'
      }
    ]
  },
  {
    title: 'Feature',
    type: 'feature',
    components: [
      {
        componentId: 'feature1'
      }
    ]
  },
  {
    title: 'Email Capture',
    type: 'email_capture',
    components: [
      {
        componentId: 'email_capture1'
      }
    ]
  },
  {
    title: 'Payment',
    type: 'payment',
    components: [
      {
        componentId: 'payment1'
      }
    ]
  },
  {
    title: 'Testimonial',
    type: 'testimonial',
    components: [
      {
        componentId: 'testimonial1'
      }
    ]
  },
  {
    title: 'FAQ',
    type: 'faq',
    components: [
      {
        componentId: 'faq1'
      }
    ]
  },
  {
    title: 'Footer',
    type: 'footer',
    components: [
      {
        componentId: 'footer1'
      }
    ]
  }
]

export const AddBlockModal = () => {
  const { state, dispatch } = useBuilderContext()

  function handleModalClose() {
    dispatch({
      type: 'updateState',
      payload: {
        updates: {
          isCreateBlockModalOpen: false
        }
      }
    })
  }

  function handleClick(type: string, componentId: string) {
    const component = components[componentId]
    const block = {
      id: v4(),
      type,
      componentId,
      setting: getBlockSetting(component.settingSchemas)
    }

    dispatch({
      type: 'addBlock',
      payload: {
        block
      }
    })

    dispatch({
      type: 'selectBlock',
      payload: {
        blockId: block.id
      }
    })

    handleModalClose()
  }

  return (
    <Modal
      contentClassName="add-block-modal"
      visible={state.isCreateBlockModalOpen}
      showCloseIcon
      onClose={handleModalClose}
    >
      <div className="add-block-modal-header">
        <h1 className="text-lg leading-6 font-medium text-slate-900">Add a block</h1>
      </div>
      <div className="add-block-modal-body">
        <div className="add-block-modal-sidebar">
          {BLOCKS.map(block => (
            <div key={block.title} className="px-4 py-2 text-sm text-gray-700">
              <a href={`#${block.title}`}>{block.title}</a>
            </div>
          ))}
        </div>
        <div className="add-block-modal-right">
          {BLOCKS.map(block => (
            <div key={block.title} id={block.title}>
              <div className="py-1 text-base text-gray-700">{block.title}</div>
              <div className="mb-4 grid grid-cols-3">
                {block.components.map(component => (
                  <div
                    key={component.componentId}
                    className="h-32 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleClick(block.type, component.componentId)}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}

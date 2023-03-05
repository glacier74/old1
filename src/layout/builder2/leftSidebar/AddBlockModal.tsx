import { Modal } from '@heyforms/ui'
import Image from 'next/image'
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
        componentId: 'header1',
        title: 'Header',
        thumbnail: '/static/templates/header1.png'
      }
    ]
  },
  {
    title: 'Hero',
    type: 'hero',
    components: [
      {
        componentId: 'hero1',
        title: 'Hero',
        thumbnail: '/static/templates/hero1.png'
      },
      {
        componentId: 'hero2',
        title: 'Hero',
        thumbnail: '/static/templates/hero2.png'
      }
    ]
  },
  {
    title: 'Feature',
    type: 'feature',
    components: [
      {
        componentId: 'feature1',
        title: 'Feature',
        thumbnail: '/static/templates/feature1.png'
      },
      {
        componentId: 'feature2',
        title: 'Feature',
        thumbnail: '/static/templates/feature2.png'
      },
      {
        componentId: 'feature3',
        title: 'Feature grid',
        thumbnail: '/static/templates/feature3.png'
      }
    ]
  },
  {
    title: 'Email Capture',
    type: 'email_capture',
    components: [
      {
        componentId: 'email_capture1',
        title: 'Email capture',
        thumbnail: '/static/templates/email_capture1.png'
      }
    ]
  },
  {
    title: 'Payment',
    type: 'payment',
    components: [
      {
        componentId: 'payment1',
        title: 'Payment',
        thumbnail: '/static/templates/payment1.png'
      },
      {
        componentId: 'payment2',
        title: 'Pricing table',
        thumbnail: '/static/templates/payment2.png'
      }
    ]
  },
  {
    title: 'Testimonial',
    type: 'testimonial',
    components: [
      {
        componentId: 'testimonial1',
        title: 'Testimonial',
        thumbnail: '/static/templates/testimonial1.png'
      }
    ]
  },
  {
    title: 'FAQ',
    type: 'faq',
    components: [
      {
        componentId: 'faq1',
        title: 'FAQ',
        thumbnail: '/static/templates/faq1.png'
      },
      {
        componentId: 'faq2',
        title: 'FAQ',
        thumbnail: '/static/templates/faq2.png'
      }
    ]
  },
  {
    title: 'Footer',
    type: 'footer',
    components: [
      {
        componentId: 'footer1',
        title: 'Footer',
        thumbnail: '/static/templates/footer1.png'
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
      setting: getBlockSetting(
        component.settingSchemas.filter((s: any) => s.type !== 'schema_block')
      ),
      ...component.settingSchemas.find((s: any) => s.type === 'schema_block')?.default
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
            <div key={block.title} className="px-4 py-2 text-sm text-slate-700">
              <a href={`#${block.title}`}>{block.title}</a>
            </div>
          ))}
        </div>
        <div className="add-block-modal-right">
          {BLOCKS.map(block => (
            <div key={block.title} id={block.title}>
              <div className="py-1 text-lg font-bold text-slate-700">{block.title}</div>
              <div className="mb-4 grid grid-cols-3 gap-5">
                {block.components.map(component => (
                  <div
                    key={component.componentId}
                    className="cursor-pointer"
                    onClick={() => handleClick(block.type, component.componentId)}
                  >
                    <div className="h-56 p-1 rounded-lg bg-slate-50 hover:bg-slate-100">
                      <Image
                        className="object-contain w-full h-full"
                        src={component.thumbnail}
                        width={500}
                        height={0}
                        alt={component.title}
                      />
                    </div>
                    <div className="mt-1 text-center text-sm text-gray-700">{component.title}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}

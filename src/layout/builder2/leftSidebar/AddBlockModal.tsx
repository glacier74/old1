import { Modal } from '@heyforms/ui'
import Image from 'next/image'
import { v4 } from 'uuid'

import components from '~/layout/builder2/components'
import { useBuilderContext } from '~/layout/builder2/context'
import { getBlockSetting } from '~/layout/builder2/utils'

const BLOCKS = [
  {
    title: 'Header Navigation',
    type: 'header',
    components: [
      {
        componentId: 'header1',
        title: 'Header Navigation (right-aligned)',
        thumbnail: '/static/block/header1.png'
      },
      {
        componentId: 'header2',
        title: 'Header Navigation (constrained)',
        thumbnail: '/static/block/header2.png'
      }
    ]
  },
  {
    title: 'Hero',
    type: 'hero',
    components: [
      {
        componentId: 'hero1',
        title: 'Hero 1',
        thumbnail: '/static/block/hero1.png'
      },
      {
        componentId: 'hero2',
        title: 'Hero 2 (centered)',
        thumbnail: '/static/block/hero2.png'
      },
      {
        componentId: 'hero3',
        title: 'Hero 3 (split)',
        thumbnail: '/static/block/hero3.png'
      }
    ]
  },
  {
    title: 'Feature',
    type: 'feature',
    components: [
      {
        componentId: 'feature1',
        title: 'Feature walkthrough (text + image)',
        thumbnail: '/static/block/feature1.png'
      },
      {
        componentId: 'feature2',
        title: 'Feature walkthrough (image + text)',
        thumbnail: '/static/block/feature2.png'
      },
      {
        componentId: 'feature3',
        title: 'Feature grids',
        thumbnail: '/static/block/feature3.png'
      }
    ]
  },
  {
    title: 'Pricing',
    type: 'payment',
    components: [
      {
        componentId: 'payment1',
        title: 'Pricing section (single plan)',
        thumbnail: '/static/block/payment1.png'
      },
      {
        componentId: 'payment2',
        title: 'Pricing table (multiple plans)',
        thumbnail: '/static/block/payment2.png'
      }
    ]
  },
  {
    title: 'Image gallery',
    type: 'image_gallery',
    components: [
      {
        componentId: 'image_gallery1',
        title: 'Image gallery',
        thumbnail: '/static/block/image_gallery1.png'
      }
    ]
  },
  {
    title: 'Testimonials',
    type: 'testimonial',
    components: [
      {
        componentId: 'testimonial1',
        title: 'Testimonials',
        thumbnail: '/static/block/testimonial1.png'
      }
    ]
  },
  {
    title: 'FAQs',
    type: 'faq',
    components: [
      {
        componentId: 'faq1',
        title: 'FAQ 1',
        thumbnail: '/static/block/faq1.png'
      },
      {
        componentId: 'faq2',
        title: 'FAQ 2',
        thumbnail: '/static/block/faq2.png'
      }
    ]
  },
  {
    title: 'CTA',
    type: 'email_capture',
    components: [
      {
        componentId: 'email_capture1',
        title: 'Email capture 1',
        thumbnail: '/static/block/email_capture1.png'
      },
      {
        componentId: 'email_capture2',
        title: 'Email capture 2',
        thumbnail: '/static/block/email_capture2.png'
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
        thumbnail: '/static/block/footer1.png'
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
            <div key={block.title} className="text-sm text-slate-700">
              <a className="block px-4 py-2 hover:bg-slate-100" href={`#${block.title}`}>
                {block.title}
              </a>
            </div>
          ))}
        </div>
        <div className="add-block-modal-right">
          {BLOCKS.map(block => (
            <div key={block.title} id={block.title} className="mb-8">
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
                    <div className="mt-1 pl-1 pt-1 text-sm text-slate-700">{component.title}</div>
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

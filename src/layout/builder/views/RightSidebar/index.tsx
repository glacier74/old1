import { Button, Tooltip } from '@heyforms/ui'
import { IconX } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC, useCallback, useMemo } from 'react'
import { CSSTransition } from 'react-transition-group'

import { useBuilderContext } from '~/layout/builder/context'

import { EmailCaptureSettings } from './EmailCaptureSettings'
import { FeatureSettings } from './FeatureSettings'
import { FooterSettings } from './FooterSettings'
import { HeaderSettings } from './HeaderSettings'
import { HeroSectionSettings } from './HeroSectionSettings'
import { PaymentSettings } from './PaymentSettings'
import { TestimonialSettings } from './TestimonialSettings'

export const RightSidebar: FC = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useBuilderContext()

  const Settings = useMemo(() => {
    const block = state.blocks.find(b => b.id === state.selectBlockId)

    if (block) {
      switch (block.type) {
        case 'header':
          return <HeaderSettings block={block! as HeaderBlock} />

        case 'heroSection':
          return <HeroSectionSettings block={block! as HeroSectionBlock} />

        case 'feature':
          return <FeatureSettings block={block! as FeatureBlock} />

        case 'emailCapture':
          return <EmailCaptureSettings block={block! as EmailCaptureBlock} />

        case 'payment':
          return <PaymentSettings block={block! as PaymentBlock} />

        case 'testimonial':
          return <TestimonialSettings block={block! as TestimonialBlock} />

        case 'footer':
          return <FooterSettings block={block! as FooterBlock} />
      }
    }
  }, [state.blocks, state.selectBlockId])

  const handleDelete = useCallback(() => {
    dispatch({
      type: 'deleteBlock',
      payload: {
        blockId: state.selectBlockId!
      }
    })
  }, [state.selectBlockId])

  function handleExited() {
    dispatch({
      type: 'update',
      payload: {
        selectBlockId: undefined,
        isSettingsSidebarOpen: false
      }
    })
  }

  return (
    <CSSTransition
      in={state.isSettingsSidebarOpen}
      timeout={0}
      mountOnEnter={true}
      classNames="slide-in-right"
      unmountOnExit={false}
    >
      <div className="builder-right-sidebar fixed top-[3.75rem] right-0">
        <div className="sidebar-wrapper flex flex-col w-[18.75rem] h-full scrollbar bg-white border-l border-slate-200 duration-150 ease-in-out">
          <div className="py-6 space-y-4">
            <div className="flex items-center justify-between px-4">
              <div className="text-base font-medium">{t('builder.settings')}</div>
              <Tooltip ariaLabel={t('builder.closeSettings')}>
                <Button.Link className="w-6 h-6" leading={<IconX />} onClick={handleExited} />
              </Tooltip>
            </div>

            {Settings}

            <div className="px-4 pt-4 border-t border-slate-100">
              <Button.Link type="danger" onClick={handleDelete}>
                Delete block
              </Button.Link>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

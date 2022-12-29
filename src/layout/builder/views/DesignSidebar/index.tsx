import { Button, Tabs, Tooltip } from '@heyforms/ui'
import { IconX } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'

import { GOOGLE_FONTS } from '~/constants'
import { useBuilderContext } from '~/layout/builder/context'
import { loadFont } from '~/layout/builder/utils'

import { CustomizePane } from './CustomizePane'
import { ThemePane } from './ThemePane'

export const DesignSidebar: FC = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useBuilderContext()

  function handleExited() {
    dispatch({
      type: 'update',
      payload: {
        isDesignSidebarOpen: false
      }
    })
  }

  useEffect(() => {
    if (state.isDesignSidebarOpen) {
      GOOGLE_FONTS.forEach(loadFont)
    }
  }, [state.isDesignSidebarOpen])

  return (
    <CSSTransition
      in={state.isDesignSidebarOpen}
      timeout={0}
      mountOnEnter={true}
      classNames="slide-in-right"
      unmountOnExit={false}
    >
      <div className="builder-design-sidebar fixed top-[3.75rem] right-0">
        <div className="sidebar-wrapper flex flex-col w-[18.75rem] h-full scrollbar bg-white border-l border-gray-200 duration-150 ease-in-out">
          <div className="py-6 space-y-4">
            <div className="flex items-center justify-between px-4">
              <div className="text-base font-medium">{t('builder.design.name')}</div>
              <Tooltip ariaLabel={t('builder.closeDesign')}>
                <Button.Link className="w-6 h-6" leading={<IconX />} onClick={handleExited} />
              </Tooltip>
            </div>

            <Tabs type="segment" defaultActiveName="theme">
              <Tabs.Pane name="theme" title={t('builder.design.theme')}>
                <ThemePane />
              </Tabs.Pane>
              <Tabs.Pane name="customize" title={t('builder.design.customize')}>
                <CustomizePane />
              </Tabs.Pane>
            </Tabs>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

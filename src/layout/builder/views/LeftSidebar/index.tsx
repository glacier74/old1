import { Button, Tooltip } from '@heyforms/ui'
import { IconX } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { CSSTransition } from 'react-transition-group'

import { useBuilderContext } from '~/layout/builder/context'

import { BlockCardList } from './BlockCardList'

export const LeftSidebar: FC = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useBuilderContext()

  function handleExited() {
    dispatch({
      type: 'update',
      payload: {
        isBlocksSidebarOpen: false
      }
    })
  }

  return (
    <CSSTransition
      in={state.isBlocksSidebarOpen}
      timeout={0}
      mountOnEnter={true}
      classNames="slide-in-left"
      unmountOnExit={false}
    >
      <div className="builder-left-sidebar fixed top-[3.75rem] left-0">
        <div className="sidebar-wrapper flex flex-col w-[18.75rem] h-full bg-white border-r border-slate-200 duration-150 ease-in-out">
          <div className="flex items-center justify-between p-4">
            <div className="text-base font-medium">{t('builder.blocks')}</div>
            <Tooltip ariaLabel={t('builder.closeBlocks')}>
              <Button.Link className="w-6 h-6" leading={<IconX />} onClick={handleExited} />
            </Tooltip>
          </div>
          <BlockCardList />
        </div>
      </div>
    </CSSTransition>
  )
}

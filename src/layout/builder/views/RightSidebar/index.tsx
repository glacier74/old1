import { useTranslation } from 'next-i18next'
import { FC, useMemo } from 'react'

import { useBuilderContext } from '~/layout/builder/context'

import { FooterSettings } from './FooterSettings'
import { HeaderSettings } from './HeaderSettings'

export const RightSidebar: FC = () => {
  const { t } = useTranslation()
  const { state } = useBuilderContext()

  const Settings = useMemo(() => {
    const block = state.blocks.find(b => b.id === state.selectBlockId)

    if (block) {
      switch (block.type) {
        case 'header':
          return <HeaderSettings block={block! as HeaderBlock} />

        case 'footer':
          return <FooterSettings block={block! as FooterBlock} />
      }
    }
  }, [state.blocks, state.selectBlockId])

  return (
    <div className="builder-right-sidebar">
      <div className="flex flex-col h-full scrollbar bg-white border-l border-gray-200">
        <div className="px-4 py-6">
          <div className="text-base font-medium">{t('builder.settings')}</div>
          {Settings}
        </div>
      </div>
    </div>
  )
}

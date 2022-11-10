import { Input } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { FC, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { LogoPickerField } from '~/components'
import { useProduct } from '~/layout'

import { BlockList } from './BlockList'
import { ComposeStoreProvider, useComposeStore } from './store'
import { BubbleMenu, CommandMenu, StripeConnectModal } from './views'

interface ComposeProps {
  blocks?: Block[]
}

const Component = () => {
  const { t } = useTranslation()
  const { dispatch } = useComposeStore()
  const product = useProduct()

  // TODO - remove with backend data
  useEffect(() => {
    dispatch({
      type: 'setBlocks',
      payload: []
    })
  }, [])

  return (
    <div className="pl-72 pt-16">
      <div className="mx-auto max-w-6xl">
        <LogoPickerField
          className="mx-20"
          value={product?.logo}
          size={100}
          enableUnsplash={false}
        />

        <div className="editor-name mx-20">
          <Input value={product?.name} placeholder={t('onboarding.name')} />
        </div>

        <div className="editor-tagline mx-20 mt-3">
          <Input value={product?.tagline} placeholder={t('onboarding.tagline')} />
        </div>

        <div className="editor-content mt-6">
          <DndProvider backend={HTML5Backend}>
            <BlockList />
          </DndProvider>
        </div>

        <CommandMenu />
        <BubbleMenu />
        <StripeConnectModal />
      </div>
    </div>
  )
}

const Compose: FC<ComposeProps> = ({ blocks = [] }) => {
  return (
    <ComposeStoreProvider blocks={blocks}>
      <Component />
    </ComposeStoreProvider>
  )
}

export default Compose

import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { useBuilderContext } from '~/layout/builder/context'

import { BlockComponent, BlockPreview, BlockProps } from './Block'

export interface EmbedProps extends BlockProps {
  block: EmbedBlock
}

export const EmbedPreview: FC<EmbedProps> = ({ block, ...restProps }) => {
  return (
    <BlockPreview block={block} {...restProps}>
      <div className="block-embed-wrapper">
        <iframe
          sandbox="allow-scripts allow-downloads allow-same-origin allow-popups allow-presentation allow-forms"
          draggable="false"
          allow="encrypted-media;"
          referrerPolicy=""
          aha-samesite=""
          src="https://airtable.com/embed/shrs4PhummCCIHXXT?backgroundColor=purple&amp;viewControls=on"
          style={{
            width: block.width,
            height: block.height
          }}
          allowFullScreen
        />
      </div>
    </BlockPreview>
  )
}

export const Embed: FC<EmbedProps> = ({ block, ...restProps }) => {
  const { t } = useTranslation()
  const { dispatch } = useBuilderContext()

  return (
    <BlockComponent block={block} {...restProps}>
      <div className="block-embed-wrapper">
        <iframe
          sandbox="allow-scripts allow-downloads allow-same-origin allow-popups allow-presentation allow-forms"
          draggable="false"
          allow="encrypted-media;"
          referrerPolicy=""
          aha-samesite=""
          src={block.source}
          style={{
            width: block.width,
            height: block.height
          }}
          allowFullScreen
        />
      </div>
    </BlockComponent>
  )
}

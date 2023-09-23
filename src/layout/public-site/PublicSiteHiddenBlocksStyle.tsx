import { isEmpty } from '@nily/utils'
import { FC } from 'react'

export const PublicSiteHiddenBlocksStyle: FC<{ hiddenBlocks?: string[] }> = ({ hiddenBlocks }) => {
  if (isEmpty(hiddenBlocks)) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: hiddenBlocks!.map(name => `#${name} { display: none !important; }`).join('\n')
      }}
    />
  )
}

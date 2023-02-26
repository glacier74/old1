import { FC } from 'react'

export const CrispWidget: FC<{ settings: CrispSettings }> = ({ settings }) => {
  const html = `
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "${settings.websiteId}";
  `

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: html }} />
      <script src="https://client.crisp.chat/l.js" async={true} />
    </>
  )
}

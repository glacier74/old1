import { Modal } from '@heyforms/ui'
import { IconMail } from '@tabler/icons'
import { FC, useMemo } from 'react'

import { CopyButton, IconFacebook, IconLinkedin, IconTwitter } from '~/components'
import { useProduct } from '~/layout'
import { urlBuilder } from '~/utils'

export const ShareModal: FC<IModalProps> = ({ visible, onClose }) => {
  const product = useProduct()
  const shareURL = useMemo(
    () => `https://${product.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`,
    [product.domain]
  )

  function handleEmail() {
    const url = urlBuilder('mailto:', {
      subject: '',
      body: shareURL
    })
    window.open(url)
  }

  function handleFacebook() {
    const url = urlBuilder('https://www.facebook.com/sharer/sharer.php', {
      u: shareURL
    })
    window.open(url)
  }

  function handleLinkedin() {
    const url = urlBuilder('https://www.linkedin.com/sharing/share-offsite', {
      url: shareURL
    })
    window.open(url)
  }

  function handleTwitter() {
    const url = urlBuilder('https://twitter.com/share', {
      url: shareURL,
      title: product.name
    })
    window.open(url)
  }

  return (
    <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={onClose}>
      <div className="text-sm text-slate-700 space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-slate-900">Share</h1>
        </div>

        <div>
          <div className="text-slate-500">Share this link via</div>
          <div className="mt-1 flex items-center space-x-2">
            <button onClick={handleEmail}>
              <IconMail />
            </button>

            <button onClick={handleFacebook}>
              <IconFacebook />
            </button>

            <button onClick={handleTwitter}>
              <IconTwitter />
            </button>

            <button onClick={handleLinkedin}>
              <IconLinkedin />
            </button>
          </div>
        </div>

        <div>
          <div className="text-slate-500">Or copy link</div>
          <div className="mt-1 flex items-center">
            <div className="flex-1 p-2 border border-slate-300 rounded">{shareURL}</div>
            <CopyButton className="ml-2 !px-4 !py-2 !bg-green-500 !text-white" text={shareURL} />
          </div>
        </div>
      </div>
    </Modal>
  )
}

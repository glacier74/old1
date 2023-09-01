import { Modal } from '@heyforms/ui'
import { IconMail } from '@tabler/icons'
import { FC, useMemo } from 'react'

import { CopyButton, IconFacebook, IconLinkedin, IconTwitter } from '~/components'
import { useProduct } from '~/layout'
import { urlBuilder, useProductURL } from '~/utils'

export const ShareModal: FC<IModalProps> = ({ visible, onClose }) => {
  const product = useProduct()

  const host = useProductURL(product)
  const shareURL = useMemo(() => `https://${host}`, [host])
  const shareText = useMemo(() => {
    return `🚀 Just launched ${product.name} landing page with @EarlyBirdIM in 10 minutes!

I'd really appreciate it if you could take a moment to check it out and let me know what you think:
${shareURL}.`
  }, [shareURL, product.name])

  function handleEmail() {
    const url = urlBuilder('mailto:', {
      subject: 'Seeking feedback on my landing page',
      body: shareText
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
      title: shareText
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
          <div className="mb-8 grid grid-cols-4 gap-4 justify-items-center">
            <button onClick={handleEmail} className="bg-emerald-50 p-4 rounded-full">
              <IconMail className="w-8 h-8 text-emerald-500" />
            </button>

            <button onClick={handleFacebook} className="bg-blue-50 p-4 rounded-full">
              <IconFacebook className="w-8 h-8 text-blue-500" />
            </button>

            <button onClick={handleTwitter} className="bg-sky-50 p-4 rounded-full">
              <IconTwitter className="w-8 h-8 text-sky-400" />
            </button>

            <button onClick={handleLinkedin} className="bg-sky-100 p-4 rounded-full">
              <IconLinkedin className="w-8 h-8 text-sky-800" />
            </button>
          </div>
        </div>

        <div>
          <div className="text-slate-700 font-semibold mb-2">Landing page link</div>
          <div className="mt-1 flex items-center">
            <div className="flex-1 p-2 border border-slate-300 rounded">{shareURL}</div>
            <CopyButton className="ml-2 !px-4 !py-2 !bg-emerald-500 !text-white" text={shareText} />
          </div>
        </div>
      </div>
    </Modal>
  )
}

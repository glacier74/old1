import { Modal } from '@heyforms/ui'
import { IconChevronRight, IconMail, IconX } from '@tabler/icons'
import { FC, useMemo } from 'react'

import { CopyButton, IconFacebook, IconLinkedin, IconTwitter, QRCode } from '~/components'
import { useProduct } from '~/layout'
import { urlBuilder, useProductURL } from '~/utils'

const JINGLEBIO_TEXT = `Just crafted my digital hub with @JingleBio! 🎉

It's my personal slice of the web, made in minutes. Can you check it out? Your thoughts mean the world 🌍 to me.

Here's where you can find it: {url}.

Hope to see you there! 😊`
const EARLYBIRD_TEXT = `Just built a sleek landing page for my new idea with @EarlyBirdIM! 🚀

It's a no-code solution, crafted in no time, perfect for validating ideas early.

Find it here: {url}, and your feedback is invaluable to me.`

export const ShareModal: FC<IModalProps> = ({ visible, onClose }) => {
  const product = useProduct()

  const host = useProductURL(product)
  const shareURL = useMemo(() => `https://${host}`, [host])
  const shareText = useMemo(
    () => (product.isJingleBio ? JINGLEBIO_TEXT : EARLYBIRD_TEXT).replace('{url}', shareURL),
    [product.isJingleBio, shareURL]
  )

  function handleEmail() {
    const url = urlBuilder('mailto:', {
      subject: 'Seeking feedback on my landing page',
      body: shareText
    })
    window.open(url)
  }

  return (
    <Modal
      className="share-modal"
      contentClassName="max-w-md md:max-w-lg"
      visible={visible}
      onClose={onClose}
    >
      <div className="text-sm text-slate-700 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg leading-6 font-medium text-slate-900">
            {product.isJingleBio ? 'Share this bio page' : 'Share this page'}
          </h1>

          <button onClick={onClose}>
            <IconX className="text-slate-700 hover:text-slate-900" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <QRCode
            className="mx-auto w-[180px] h-[180px] border border-slate-200/80 shadow-sm rounded-lg"
            canvasClassName="w-full h-full rounded-lg"
            text={shareURL}
            icon={product.logo}
          />

          <div className="flex-1 space-y-3">
            <a
              className="group w-full flex items-center justify-between text-slate-700 hover:text-slate-900"
              target="_blank"
              rel="noreferrer"
              href={urlBuilder('https://twitter.com/share', {
                title: shareText
              })}
            >
              <div className="flex flex-1 items-center gap-2">
                <IconTwitter className="border border-slate-200/80 p-1.5 rounded-full w-8 h-8 text-sky-400" />
                <span>Share on Twitter </span>
              </div>
              <IconChevronRight className="w-5 h-5 text-slate-400 transition-colors group-hover:text-slate-900 group-hover:animate-bounce-x" />
            </a>

            <a
              className="group w-full flex items-center justify-between text-slate-700 hover:text-slate-900"
              target="_blank"
              rel="noreferrer"
              href={urlBuilder('https://www.facebook.com/sharer/sharer.php', {
                u: shareURL
              })}
            >
              <div className="flex flex-1 items-center gap-2">
                <IconFacebook className="border border-slate-200/80 p-1 rounded-full w-8 h-8 text-blue-500" />
                <span>Share on Facebook </span>
              </div>
              <IconChevronRight className="w-5 h-5 text-slate-400 transition-colors group-hover:text-slate-900 group-hover:animate-bounce-x" />
            </a>

            <a
              className="group w-full flex items-center justify-between text-slate-700 hover:text-slate-900"
              target="_blank"
              rel="noreferrer"
              href={urlBuilder('http://www.linkedin.com/shareArticle?mini=true', {
                url: shareURL,
                title: shareText
              })}
            >
              <div className="flex flex-1 items-center gap-2">
                <IconLinkedin className="border border-slate-200/80 p-1.5 rounded-full w-8 h-8 text-sky-800" />
                <span>Share on LinkedIn </span>
              </div>
              <IconChevronRight className="w-5 h-5 text-slate-400 transition-colors group-hover:text-slate-900 group-hover:animate-bounce-x" />
            </a>

            <button
              className="group w-full flex items-center justify-between text-slate-700 hover:text-slate-900"
              onClick={handleEmail}
            >
              <div className="flex flex-1 items-center gap-2">
                <IconMail className="border border-slate-200/80 p-1.5 rounded-full w-8 h-8 text-emerald-500" />
                <span>Share via Email </span>
              </div>
              <IconChevronRight className="w-5 h-5 text-slate-400 transition-colors group-hover:text-slate-900 group-hover:animate-bounce-x" />
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex-1 p-2 border border-slate-300 rounded">{shareURL}</div>
          <CopyButton className="ml-2 !px-4 !py-2 !bg-emerald-500 !text-white" text={shareURL} />
        </div>
      </div>
    </Modal>
  )
}

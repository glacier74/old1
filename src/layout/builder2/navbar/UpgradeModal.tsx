import { Modal } from '@heyforms/ui'
// import { IconBadgeTm, IconCodeDots, IconPhotoStar, IconUsers, IconWorldWww } from '@tabler/icons'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

// const FEATURES = [
//   {
//     icon: IconUsers,
//     title: 'Team collaboration',
//     description:
//       'Invite team members to co-create landing-pages and streamline data collection experiences that meet organizational needs and goals.'
//   },
//   {
//     icon: IconWorldWww,
//     title: 'Connect custom domain',
//     description:
//       'Add your own domains (or subdomains) to your landing-pages and create SEO-friendly pretty URLs. We take care of hosting and SSL certificates for you.'
//   },
//   {
//     icon: IconBadgeTm,
//     title: 'Remove EarlyBird branding',
//     description:
//       'Remove all EarlyBird branding and have your landing-pages seamlessly represent your brand.'
//   },
//   {
//     icon: IconCodeDots,
//     title: 'Embed custom code',
//     description:
//       'Remove all EarlyBird branding and have your landing-pages seamlessly represent your brand.'
//   },
//   {
//     icon: IconPhotoStar,
//     title: 'Custom meta image',
//     description:
//       'Remove all EarlyBird branding and have your landing-pages seamlessly represent your brand.'
//   },
//   {
//     icon: IconUsers,
//     title: '',
//     description:
//       'Remove all EarlyBird branding and have your landing-pages seamlessly represent your brand.'
//   },
//   {
//     icon: IconCodeDots,
//     title: 'Embed custom code',
//     description:
//       'Remove all EarlyBird branding and have your landing-pages seamlessly represent your brand.'
//   },
//   {
//     icon: IconPhotoStar,
//     title: 'Custom meta image',
//     description:
//       'Remove all EarlyBird branding and have your landing-pages seamlessly represent your brand.'
//   },
//   {
//     icon: IconUsers,
//     title: '',
//     description:
//       'Remove all EarlyBird branding and have your landing-pages seamlessly represent your brand.'
//   }
// ]

export const UpgradeModal: FC<IModalProps & { onPublish: () => void }> = ({
  visible,
  onPublish,
  onClose
}) => {
  return (
    <Modal
      className="upgrade-modal"
      visible={visible}
      maskClosable={false}
      showCloseIcon
      onClose={onClose}
      style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
    >
      <div className="flex flex-col justify-center items-center h-full">
        <div className="my-2">
          <Image
            src="/static/upgrade.png"
            alt="Upgrade EarlyBird plan"
            width={288}
            height={288}
            className="w-64 h-64 mx-auto"
          />
          <h1 className="max-w-xl mx-auto font-bold text-slate-900 text-4xl text-center">
            Level up your landing page with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              EarlyBird Pro
            </span>
          </h1>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-slate-500 text-center">
            EarlyBird Pro plans are designed to help you get more done in less time. Upgrade today
            to unlock the full power of EarlyBird, starting at just $4/month.
          </p>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-center">
            <Link className="py-2.5 px-6 bg-[#10b981] rounded-md text-white" href="/account/plan">
              Upgrade today
            </Link>
            <button
              className="ml-4 text-sm text-slate-700 hover:text-[#10b981]"
              onClick={onPublish}
            >
              Maybe next time
            </button>
          </div>
          {/* <div className="mt-12">
            <ul className="grid grid-cols-3 gap-4 text-lg mb-12">
              {FEATURES.map((f, index) => (
                <li key={index} className="mb-4">
                  <f.icon className="inline w-8 h-8 mr-2 text-slate-500 mb-2" />
                  <h3 className="text-lg font-medium">{f.title}</h3>
                  <p className="text-base text-slate-500">{f.description}</p>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
    </Modal>
  )
}

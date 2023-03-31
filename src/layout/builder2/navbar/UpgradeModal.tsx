import { Modal } from '@heyforms/ui'
import { IconBadgeTm, IconCodeDots, IconPhotoStar, IconUsers, IconWorldWww } from '@tabler/icons'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const FEATURES = [
  {
    icon: IconUsers,
    title: 'Team collaboration',
    description:
      'Invite team members to co-create landing-pages and streamline data collection experiences that meet organizational needs and goals.'
  },
  {
    icon: IconWorldWww,
    title: 'Connect custom domain',
    description:
      'Add your own domains (or subdomains) to your landing-pages and create SEO-friendly pretty URLs. We take care of hosting and SSL certificates for you.'
  },
  {
    icon: IconBadgeTm,
    title: 'Remove EarlyBird branding',
    description:
      'Remove all EarlyBird branding and have your landing-pages seamlessly represent your brand.'
  },
  {
    icon: IconCodeDots,
    title: 'Embed custom code',
    description:
      'Remove all EarlyBird branding and have your landing-pages seamlessly represent your brand.'
  },
  {
    icon: IconPhotoStar,
    title: 'Custom meta image',
    description:
      'Remove all EarlyBird branding and have your landing-pages seamlessly represent your brand.'
  },
  {
    icon: IconUsers,
    title: '',
    description:
      'Remove all EarlyBird branding and have your landing-pages seamlessly represent your brand.'
  },
  {
    icon: IconCodeDots,
    title: 'Embed custom code',
    description:
      'Remove all EarlyBird branding and have your landing-pages seamlessly represent your brand.'
  },
  {
    icon: IconPhotoStar,
    title: 'Custom meta image',
    description:
      'Remove all EarlyBird branding and have your landing-pages seamlessly represent your brand.'
  },
  {
    icon: IconUsers,
    title: '',
    description:
      'Remove all EarlyBird branding and have your landing-pages seamlessly represent your brand.'
  }
]

export const UpgradeModal: FC<IModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      className="upgrade-modal"
      visible={visible}
      maskClosable={false}
      showCloseIcon
      onClose={onClose}
    >
      <div className="space-y-6">
        <div className="my-4">
          <Image
            src="/static/upgrade.png"
            alt="Upgrade EarlyBird plan"
            width={288}
            height={288}
            className="w-72 h-72 mx-auto"
          />
          <h1 className="font-bold text-slate-900 text-2xl sm:tracking-tight text-center">
            Upgrade to unlock all features
          </h1>
          <p className="max-w-3xl mx-auto mt-2 text-base text-slate-500 text-center">
            EarlyBird is completely free to use, but if you need advanced features, consider
            upgrading you plan.
          </p>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-center">
            <Link className="py-2.5 px-6 bg-blue-700 rounded-md text-white" href="/account/plan">
              Upgrade plan
            </Link>
          </div>
          <div className="mt-12">
            <ul className="grid grid-cols-3 gap-4 text-lg mb-12">
              {FEATURES.map((f, index) => (
                <li key={index} className="mb-4">
                  <f.icon className="inline w-8 h-8 mr-2 text-slate-500 mb-2" />
                  <h3 className="text-lg font-medium">{f.title}</h3>
                  <p className="text-base text-slate-500">{f.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  )
}

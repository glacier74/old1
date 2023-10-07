import { Button, Form, Input, Modal, Table, notification } from '@heyforms/ui'
import { TableColumn } from '@heyforms/ui/types/table'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { FC, useMemo, useState } from 'react'

import { CopyButton, RoundImage } from '~/components'
import { useProduct } from '~/layout'
import { ProductService } from '~/service'
import { useStore } from '~/store'
import { useVisible } from '~/utils'

import { LeaveProduct } from './LeaveProduct'
import { RemoveMember } from './RemoveMember'

export const ProductMemberModal: FC<IModalProps> = ({ visible }) => {
  const { t } = useTranslation('dashboard')
  const { user, closeMemberList } = useStore()
  const product = useProduct()

  const [leaveModalVisible, openLeaveModal, closeLeaveModal] = useVisible()
  const [removeModalVisible, openRemoveModal, closeRemoveModal] = useVisible()

  const [member, setMember] = useState<User>()

  const isOwner = useMemo(
    () => !!product?.users.find(u => u.role === 'owner' && u.id === user.id),
    [product?.users, user.id]
  )
  const invitationURL = useMemo(
    () => `${process.env.NEXT_PUBLIC_HOMEPAGE}/invite/${product?.inviteCode}`,
    [product]
  )

  async function handleSendEmailInvitation(values: AnyMap<string>) {
    await ProductService.sendInvitation(product!.id, values.email)

    notification.success({
      title: t('member.emailInvitation.success')
    })
  }

  function handleRemove(row: User) {
    setMember(row)
    openRemoveModal()
  }

  function handleCloseRemoveModal() {
    setMember(undefined)
    closeRemoveModal()
  }

  // Table columns
  const columns: TableColumn<User>[] = [
    {
      key: 'id',
      name: '',
      render(row) {
        return (
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <RoundImage src={row.avatar} imageSize={36} size={36} />
            </div>
            <div className="flex-1 px-4">
              <p className="text-sm font-medium text-slate-700 truncate">
                {row.name} {user.id === row.id && <span>({t('member.you')})</span>}
              </p>
              <p className="font-normal text-sm text-slate-400">{row.email}</p>
            </div>
          </div>
        )
      }
    },
    {
      key: 'action',
      name: '',
      align: 'right',
      render(row) {
        if (row.role !== 'owner') {
          if (isOwner) {
            return (
              <Button type="danger" onClick={() => handleRemove(row)}>
                {t('member.removeModal.button')}
              </Button>
            )
          }

          if (user.id === row.id) {
            return (
              <Button type="danger" onClick={openLeaveModal}>
                {t('member.leaveModal.button')}
              </Button>
            )
          }
        }

        return null
      }
    }
  ]

  return (
    <>
      <Modal visible={visible} onClose={closeMemberList} showCloseIcon>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl leading-6 font-bold text-slate-900">{t('member.heading')}</h1>
            <p className="mt-2 text-sm text-slate-500">{t('member.description')}</p>
          </div>

          {/* Email invitation */}
          <Form.Custom
            inline
            submitText={t('member.emailInvitation.send')}
            submitOptions={{
              type: 'success',
              className: 'mt-5 ml-3'
            }}
            onlySubmitOnValueChange={true}
            request={handleSendEmailInvitation}
          >
            <Form.Item
              name="email"
              label={t('member.emailInvitation.heading')}
              rules={[
                { type: 'email', required: true, message: t('member.emailInvitation.invalid') }
              ]}
            >
              <Input type="email" placeholder="john@example.com" />
            </Form.Item>
          </Form.Custom>

          {/* Invite link */}
          <div>
            <div className="mb-1 block text-sm font-medium text-slate-700">
              {t('member.linkInvitation.heading')}
            </div>
            <div className="input">
              <div className="flex-1 text-sm truncate">{invitationURL}</div>
              <CopyButton
                className="ml-4 !px-1.5 !py-0.5"
                text={invitationURL}
                copyText={t('member.linkInvitation.copy')}
                copiedText={t('member.linkInvitation.copied')}
              />
            </div>
            <p className="mt-1 text-slate-500 text-xs">
              This invitation link will be reset on{' '}
              {dayjs.unix(product?.inviteExpiredAt).format('MMM DD, YYYY')}.
            </p>
          </div>

          {/* Members */}
          <div>
            <div className="mb-1 block text-sm font-medium text-slate-700">
              {t('member.heading')}
            </div>
            <Table<User>
              className="member-table"
              columns={columns}
              data={product?.users}
              hideHead
            />
          </div>
        </div>
      </Modal>

      {/* Leave product */}
      <LeaveProduct visible={leaveModalVisible} onClose={closeLeaveModal} />

      {/* Remove member */}
      <RemoveMember visible={removeModalVisible} member={member} onClose={handleCloseRemoveModal} />
    </>
  )
}

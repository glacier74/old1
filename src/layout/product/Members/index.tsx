import { Dropdown, Form, Input, Menus, Modal, Select, Table, notification } from '@heyforms/ui'
import { TableColumn } from '@heyforms/ui/types/table'
import { IconDots } from '@tabler/icons'
import clsx from 'clsx'
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
import { TransferProduct } from './TransferProduct'

interface MemberRoleProps {
  productId: number
  isOwner?: boolean
  member: User
}

const MemberRole: FC<MemberRoleProps> = ({ productId, member, isOwner }) => {
  const { t } = useTranslation('dashboard')
  const { updateMember } = useStore()

  const [loading, setLoading] = useState(false)

  const roleMap: AnyMap<{ label: string; className: string }> = {
    owner: {
      label: t('member.role.owner'),
      className: 'bg-emerald-100 text-emerald-600'
    },
    admin: {
      label: t('member.role.admin'),
      className: 'bg-blue-100 text-blue-600'
    },
    member: {
      label: t('member.role.member'),
      className: 'bg-slate-100 text-slate-600'
    }
  }

  const roleOptions = [
    {
      label: roleMap.admin.label,
      value: 'admin'
    },
    {
      label: roleMap.member.label,
      value: 'member'
    }
  ]

  async function handleChange(newRole: any) {
    setLoading(true)

    try {
      await ProductService.updateMember(productId, member.id, newRole)
      updateMember(productId, [{ id: member.id, role: newRole }])
    } catch (err: any) {
      notification.error({
        title: err.message
      })
    }

    setLoading(false)
  }

  if (isOwner && member.role !== 'owner') {
    return (
      <Select
        className="mr-4 !w-[110px]"
        value={member.role}
        options={roleOptions}
        loading={loading}
        onChange={handleChange}
      />
    )
  }

  const role = roleMap[member.role]

  return (
    <span
      className={clsx(
        'inline-block mr-4 w-[64px] text-[13px] text-center py-1 rounded-[14px]',
        role.className
      )}
    >
      {role.label}
    </span>
  )
}

export const ProductMemberModal: FC<IModalProps> = ({ visible }) => {
  const { t } = useTranslation('dashboard')
  const { user, closeMemberList } = useStore()
  const product = useProduct()

  const [leaveModalVisible, openLeaveModal, closeLeaveModal] = useVisible()
  const [removeModalVisible, openRemoveModal, closeRemoveModal] = useVisible()
  const [transferModalVisible, openTransferModal, closeTransferModal] = useVisible()

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

  function handleTransfer(row: User) {
    setMember(row)
    openTransferModal()
  }

  function handleCloseTransferModal() {
    setMember(undefined)
    closeTransferModal()
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
                {row.name}{' '}
                {user.id === row.id && (
                  <span className="text-emerald-600">({t('member.you')})</span>
                )}
              </p>
              <p className="font-normal text-sm text-slate-400">{row.email}</p>
            </div>
          </div>
        )
      }
    },
    {
      key: 'role',
      name: '',
      align: 'right',
      render: row => <MemberRole productId={product.id} isOwner={isOwner} member={row} />
    },
    {
      key: 'action',
      name: '',
      align: 'right',
      render(row) {
        if (row.role === 'owner' || (!isOwner && row.id !== user.id)) {
          return null
        }

        const Overlay = isOwner ? (
          <Menus>
            <Menus.Item label="Transfer" onClick={() => handleTransfer(row)} />
            <Menus.Item
              role="danger"
              label={t('member.removeModal.button')}
              onClick={() => handleRemove(row)}
            />
          </Menus>
        ) : (
          <Menus>
            <Menus.Item label={t('member.leaveModal.button')} onClick={openLeaveModal} />
          </Menus>
        )

        return (
          <Dropdown
            className="inline-flex items-center"
            overlay={Overlay}
            popupClassName="member-role-popup"
          >
            <button className="text-slate-500 hover:text-slate-800">
              <IconDots />
            </button>
          </Dropdown>
        )
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
            className="flex-col md:flex-row"
            inline
            submitText={t('member.emailInvitation.send')}
            submitOptions={{
              type: 'success',
              className: 'w-full mt-3 md:ml-3 md:mt-5 md:w-auto'
            }}
            onlySubmitOnValueChange={true}
            request={handleSendEmailInvitation}
          >
            <Form.Item
              className="w-full mt-2 md:w-auto md:mt-1"
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

      {/* Transfer product */}
      <TransferProduct
        visible={transferModalVisible}
        member={member}
        onClose={handleCloseTransferModal}
      />
    </>
  )
}

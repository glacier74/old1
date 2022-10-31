import { FC, useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Avatar, Button, Form, Input, Modal, Table } from '@heyforms/ui'
import { useStore } from '@/store'
import { CopyButton } from '@/components'
import { useProductId, useTeams } from '@/layout/team/hook'
import { TableColumn } from '@heyforms/ui/types/table'
import { RemoveMember } from './RemoveMember'
import { LeaveTeam } from './LeaveTeam'
import { useVisible } from '@/utils'

export const TeamMemberModal: FC<IModalProps> = ({ visible }) => {
  const { t } = useTranslation()
  const { user, closeMemberList } = useStore()

  const { team } = useTeams()
  const productId = useProductId()

  const [leaveModalVisible, openLeaveModal, closeLeaveModal] = useVisible()
  const [removeModalVisible, openRemoveModal, closeRemoveModal] = useVisible()

  const [selectedUser, setSelectedUser] = useState<User>()

  const isOwner = useMemo(
    () => !!team?.users.find(u => u.role === 'owner' && u.id === user.id),
    [team?.users, user.id]
  )
  const invitationURL = useMemo(
    () => `${process.env.NEXT_PUBLIC_HOMEPAGE}/invite/${productId}.${team?.inviteCode}`,
    [productId, team?.inviteCode]
  )

  async function handleSendEmailInvitation() {}

  function handleRemove(row: User) {
    setSelectedUser(row)
    openRemoveModal()
  }

  function handleCloseRemoveModal() {
    setSelectedUser(undefined)
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
              <Avatar src={row.avatar} size={36} rounded circular />
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
              className: 'mt-6 ml-3'
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
            <div>
              <Input
                className="cursor-default"
                value={invitationURL}
                disabled
                trailing={
                  <CopyButton
                    text={invitationURL}
                    copyText={t('member.linkInvitation.copy')}
                    copiedText={t('member.linkInvitation.copied')}
                  />
                }
              />
            </div>
          </div>

          {/* Members */}
          <div>
            <div className="mb-1 block text-sm font-medium text-slate-700">
              {t('member.heading')}
            </div>
            <Table<User> className="member-table" columns={columns} data={team?.users} hideHead />
          </div>
        </div>
      </Modal>

      {/* Leave team */}
      <LeaveTeam visible={leaveModalVisible} onClose={closeLeaveModal} />

      {/* Remove member */}
      <RemoveMember
        visible={removeModalVisible}
        user={selectedUser}
        onClose={handleCloseRemoveModal}
      />
    </>
  )
}

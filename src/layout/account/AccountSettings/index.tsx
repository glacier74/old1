import type { FC } from 'react'

import { AvatarSettings } from './AvatarSettings'
import { DeleteAccount } from './DeleteAccount'
import { EmailAddress } from './EmailAddress'
import { Password } from './Password'
import { UserName } from './UserName'

export const AccountSettings: FC = () => {
  return (
    <div className="mt-12 pb-20 space-y-8">
      {/* User avatar */}
      <AvatarSettings />

      {/* User name */}
      <UserName />

      {/* Email address */}
      <EmailAddress />

      {/* Password */}
      <Password />

      {/* Delete account */}
      <DeleteAccount />
    </div>
  )
}

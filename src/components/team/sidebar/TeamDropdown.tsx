import { Avatar, Dropdown, Menus } from '@heyforms/ui'
import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Product, Team } from '@/service'
import { useRouter } from 'next/router'
import { IconChevronDown, IconCircleCheck, IconPlus } from '@tabler/icons'
import { useStoreContext } from '@/store'
import { isEqual } from '@nily/utils'
import { useParam, useTeam } from '@/hook'

interface CurrentTeamProps {
  team?: Team
}

interface TeamItemProps {
  team: Team
  onClick: (product: Product) => void
}

const TeamItem: FC<TeamItemProps> = ({ team, onClick }) => {
  const { t } = useTranslation()
  const product = useMemo(() => team.products[0], [team])
  const productId = useParam('id')

  function handleClick() {
    onClick(product)
  }

  return (
    <div
      className="group flex items-center px-4 py-2.5 text-sm text-slate-700 cursor-pointer hover:bg-slate-100"
      onClick={handleClick}
    >
      <Avatar src={product?.logo} size={24} retainLength={2} rounded circular />

      <div className="ml-4 flex-auto">
        <p className="text-sm font-medium text-slate-700 truncate">{product?.name}</p>
        <p className="text-xs text-slate-500 truncate">
          {team.users?.length} {t('sidebar.member')}
        </p>
      </div>

      {isEqual(productId, product?.id) && (
        <IconCircleCheck className="ml-4 w-5 h-5 text-blue-500" />
      )}
    </div>
  )
}

const CurrentTeam: FC<CurrentTeamProps> = ({ team }) => {
  const product = useMemo(() => team?.products[0], [team])

  return (
    <button className="flex items-center w-full rounded-md text-sm text-left text-slate-700 hover:text-slate-900">
      <span className="flex min-w-0 items-center justify-between space-x-3">
        <Avatar
          className="w-6 h-6 rounded-full flex-shrink-0"
          src={product?.logo}
          size={24}
          rounded
          circular
        />
        <span className="flex-1 text-sm font-medium truncate">{product?.name}</span>
      </span>
      <IconChevronDown className="flex-shrink-0 h-4 w-4 ml-1" />
    </button>
  )
}

const NavigationSkeleton = () => {
  return (
    <div className="flex items-center">
      <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
      <div className="ml-3 h-4 flex-1 rounded skeleton"></div>
    </div>
  )
}

export const TeamDropdown: FC = () => {
  const { t } = useTranslation()
  const { state } = useStoreContext()
  const router = useRouter()

  const { current, teams } = useTeam()
  const [visible, setVisible] = useState(false)

  function handleCreate() {}

  function handleClick(product: Product) {
    setVisible(false)
    router.push(`/product/${product.id}`)
  }

  const Overlay = (
    <div className="menus w-64">
      {teams.map(team => (
        <TeamItem key={team.id} team={team} onClick={handleClick} />
      ))}
      <Menus.Divider />
      <Menus.Item
        value="create"
        icon={<IconPlus />}
        label={t('sidebar.createProduct')}
        onClick={handleCreate}
      />
    </div>
  )

  return (
    <div className="px-4">
      {state.isReady ? (
        <Dropdown
          className="block w-full"
          placement="bottom-start"
          overlay={Overlay}
          visible={visible}
        >
          <CurrentTeam team={current} />
        </Dropdown>
      ) : (
        <NavigationSkeleton />
      )}
    </div>
  )
}

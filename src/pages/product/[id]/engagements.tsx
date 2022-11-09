import { Table } from '@heyforms/ui'
import { TableColumn } from '@heyforms/ui/types/table'
import { useTranslation } from 'next-i18next'

import { RoundImage } from '~/components'
import { ProductLayout } from '~/layout'
import { withTranslations } from '~/utils'

const engagements: any[] = [
  {
    id: 1,
    avatar: '',
    name: 'Frank Boehm',
    email: 'frank.boehm@example.com'
  },
  {
    id: 2,
    avatar: '',
    name: 'Frank Boehm',
    email: 'frank.boehm@example.com'
  },
  {
    id: 3,
    avatar: '',
    name: 'Frank Boehm',
    email: 'frank.boehm@example.com'
  },
  {
    id: 4,
    avatar: '',
    name: 'Frank Boehm',
    email: 'frank.boehm@example.com'
  },
  {
    id: 5,
    avatar: '',
    name: 'Frank Boehm',
    email: 'frank.boehm@example.com'
  }
]

const ProductEngagements = (): JSX.Element => {
  const { t } = useTranslation()

  // Table columns
  const columns: TableColumn<User>[] = [
    {
      key: 'id',
      name: '',
      width: '40%',
      render(user) {
        return (
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <RoundImage src={user.avatar} size={36} />
            </div>
            <div className="flex-1 px-4">
              <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
              <p className="mt-0.5 font-normal text-sm text-slate-500">1 days ago</p>
            </div>
          </div>
        )
      }
    },
    {
      key: 'email',
      name: '',
      width: '30%',
      render(user) {
        return user.email
      }
    },
    {
      key: 'type',
      name: '',
      width: '20%',
      render(user) {
        return 'One time'
      }
    },
    {
      key: 'amount',
      name: '',
      align: 'right',
      render(user) {
        return '$300'
      }
    }
  ]

  return (
    <ProductLayout seo={{ title: 'engagements.title' }}>
      <h1 className="mt-10 mb-4 text-3xl leading-6 font-bold text-slate-900">
        {t('engagements.heading')}
      </h1>

      <div className="mt-6">
        <Table<User> className="mt-8" columns={columns} data={engagements} hideHead />
      </div>
    </ProductLayout>
  )
}

export const getServerSideProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default ProductEngagements

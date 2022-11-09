import { Select } from '@heyforms/ui'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { Breakdown, MainGraph, ProductLayout } from '~/layout'
import { withTranslations } from '~/utils'

const Product = (): JSX.Element => {
  const { t } = useTranslation()

  const date = dayjs().format('YYYY-MM-DD')
  const [period, setPeriod] = useState<any>('day')

  const options = [
    {
      label: t('productStats.today'),
      value: 'day'
    },
    {
      label: t('productStats.last7Days'),
      value: '7d'
    },
    {
      label: t('productStats.last30Days'),
      value: '30d'
    },
    {
      label: t('productStats.monthToDate'),
      value: 'month'
    },
    {
      label: t('productStats.last6Months'),
      value: '6mo'
    },
    {
      label: t('productStats.last12Months'),
      value: '12mo'
    }
  ]

  return (
    <ProductLayout seo={{ title: 'product.title' }}>
      <div className="mt-10 mb-4 flex items-center justify-end">
        <div className="w-20 sm:w-36 md:w-44 md:relative">
          <Select value={period} options={options} onChange={setPeriod} />
        </div>
      </div>

      <div className="space-y-8">
        <MainGraph date={date} period={period} />

        <div className="md:grid md:grid-cols-2 md:gap-1">
          <Breakdown
            sourceName={t('productStats.topSources')}
            propertyName={t('productStats.source')}
            propertyValue="visit:source"
            labelKey="source"
            date={date}
            period={period}
            backgroundClassName="bg-blue-700"
          />
          <Breakdown
            className="ml-0 md:ml-6"
            sourceName={t('productStats.topPages')}
            propertyName={t('productStats.pageUrl')}
            propertyValue="event:page"
            labelKey="page"
            date={date}
            period={period}
            backgroundClassName="bg-yellow-700"
          />
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-1">
          <Breakdown
            sourceName={t('productStats.countries')}
            propertyName={t('productStats.country')}
            propertyValue="visit:country"
            labelKey="country"
            date={date}
            period={period}
            backgroundClassName="bg-red-700"
          />
          <Breakdown
            className="ml-0 md:ml-6"
            sourceName={t('productStats.devices')}
            propertyName={t('productStats.operatingSystem')}
            propertyValue="visit:os"
            labelKey="os"
            date={date}
            period={period}
            backgroundClassName="bg-green-700"
          />
        </div>
      </div>
    </ProductLayout>
  )
}

export const getServerSideProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default Product

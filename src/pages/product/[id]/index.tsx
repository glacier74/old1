import { Button, Select } from '@heyforms/ui'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useState } from 'react'

import { RoundImage } from '~/components'
import { Breakdown, MainGraph, ProductLayout, useProduct } from '~/layout'
import { useStore } from '~/store'
import { withTranslations } from '~/utils'

const Skeleton = () => {
  return (
    <div className="flex items-center flex-1 min-w-0 pt-1">
      <div className="flex items-center mr-5">
        <div className="bg-slate-200 rounded-full" style={{ width: 54, height: 54 }}></div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="w-72 h-6 mt-0.5 mb-2 rounded-sm skeleton"></div>
        <div className="w-24 h-4 rounded-sm skeleton"></div>
      </div>
    </div>
  )
}

const TaglineSkeleton = () => {
  return <div className="mt-6 w-64 h-4 rounded-sm skeleton"></div>
}

const Product = (): JSX.Element => {
  const { t } = useTranslation()
  const { isReady } = useStore()
  const product = useProduct()

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

  function handlePreview() {
    window.open(`https://${product.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`)
  }

  return (
    <ProductLayout seo={{ title: 'product.title' }}>
      <div>
        <div className="relative lg:flex lg:items-center lg:justify-between">
          {isReady ? (
            <div className="flex items-center flex-1 min-w-0">
              <div className="flex items-center mr-5">
                <RoundImage
                  src={product.logo}
                  text={product.name}
                  retainLength={2}
                  imageSize={120}
                  size={54}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-3xl font-bold text-slate-900">{product.name}</div>
                <div className="text-sm text-slate-500 mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
                  {t('product.member', { count: product.users.length })}
                </div>
              </div>
            </div>
          ) : (
            <Skeleton />
          )}

          <div className="flex items-center space-x-3">
            <Link className="link-button" href={`/product/${product?.id}/edit`}>
              {t('product.edit')}
            </Link>
            <Button type="success" onClick={handlePreview}>
              {t('product.viewSite')}
            </Button>
          </div>
        </div>

        {isReady ? <div className="mt-4">{product?.tagline}</div> : <TaglineSkeleton />}
      </div>

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
            backgroundClassName="bg-green-500"
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
            backgroundClassName="bg-green-500"
          />
        </div>
      </div>
    </ProductLayout>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps = withTranslations(
  async context => {
    return {
      props: {}
    }
  },
  ['common', 'country']
)

export default Product

import { useTranslation } from 'next-i18next'
import { useRef, useState } from 'react'

import { AsyncRequest, AsyncRequestInstance } from '~/components'
import { Integrations, ProductSidebarLayout, useProductId } from '~/layout'
import { IntegrationsProvider } from '~/layout/product/Integrations/context'
import { IntegrationService } from '~/service'
import { withTranslations } from '~/utils'

const Skeleton = () => {
  return (
    <>
      <div className="min-w-0 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-slate-200"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="rounded-sm skeleton" style={{ width: 100, height: 18 }}></div>
            <div className="mt-1.5 rounded-sm skeleton" style={{ width: 400, height: 14 }}></div>
          </div>
        </div>
      </div>
      <div className="min-w-0 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-slate-200"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="rounded-sm skeleton" style={{ width: 100, height: 18 }}></div>
            <div className="mt-1.5 rounded-sm skeleton" style={{ width: 400, height: 14 }}></div>
          </div>
        </div>
      </div>
    </>
  )
}

const ProductIntegrations = (): JSX.Element => {
  const { t } = useTranslation('dashboard')
  const productId = useProductId()

  const asyncRequestRef = useRef<AsyncRequestInstance>()
  const [integrations, setIntegrations] = useState<Integration[]>([])

  async function fetchData() {
    const result = await IntegrationService.list(productId)

    setIntegrations(result)

    return result.length > 0
  }

  function reload() {
    asyncRequestRef.current?.reload()
  }

  return (
    <ProductSidebarLayout seo={{ title: t('integrations.title') }}>
      <h1 className="mb-4 text-3xl leading-6 font-bold text-slate-900">
        {t('integrations.heading')}
      </h1>
      <div className="mt-4 text-slate-600">{t('integrations.description')}</div>

      <AsyncRequest
        ref={asyncRequestRef as any}
        className="mt-12"
        request={fetchData}
        deps={[productId]}
        skeleton={<Skeleton />}
      >
        <IntegrationsProvider reload={reload}>
          <Integrations integrations={integrations} />
        </IntegrationsProvider>
      </AsyncRequest>
    </ProductSidebarLayout>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps = withTranslations(async context => {
  return {
    props: {}
  }
},
['common', 'dashboard'])

export default ProductIntegrations

import { Form, Input } from '@heyforms/ui'
import * as dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { AvatarPickerField } from '~/components'
import { CreateProductLayout } from '~/layout'
import { ProductService } from '~/service'
import { withTranslations } from '~/utils'

dayjs.extend(utc)
dayjs.extend(timezone)

const CreateProduct = (): JSX.Element => {
  const router = useRouter()
  const { t } = useTranslation()
  // const [templates, setTemplates] = useState<Template[]>([])

  async function handleFinish(values: AnyMap<any>) {
    const productId = await ProductService.create({
      ...values,
      // eslint-disable-next-line import/namespace
      timezone: dayjs.tz.guess(),
      blocks: []
      // blocks: templates.find(t => t.id === values.templateId)?.blocks || []
    })

    await router.replace(`/product/${productId}/edit`)
  }

  // useAsyncEffect(async () => {
  //   setTemplates(await ProductService.templates())
  // }, [])

  return (
    <CreateProductLayout seo={{ title: t('createProduct.title') }}>
      <h2 className="mb-2 text-2xl font-bold text-slate-900">
        {t('createProduct.createProductTitle')}
      </h2>
      <p className="mb-6 text-slate-500">{t('createProduct.createProductDesc')}</p>

      <Form.Custom
        submitText={t('createProduct.createProduct')}
        submitOptions={{
          type: 'success',
          block: true
        }}
        request={handleFinish}
      >
        <Form.Item
          name="name"
          label={t('createProduct.name')}
          rules={[{ required: true, message: t('createProduct.invalidName') }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="tagline"
          label={t('createProduct.tagline')}
          rules={[{ required: true, message: t('createProduct.invalidTagline') }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="domain"
          label={t('createProduct.publicSiteURL')}
          rules={[
            {
              required: true,
              pattern: /^[a-z0-9-]{3,}$/i,
              message: t('createProduct.invalidDomain')
            }
          ]}
        >
          <Input trailing={`.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`} />
        </Form.Item>

        <Form.Item
          name="logo"
          label={t('createProduct.logo')}
          rules={[{ required: false, message: t('createProduct.invalidLogo') }]}
        >
          <AvatarPickerField namespace="avatar" enableUnsplash={false} />
        </Form.Item>

        {/*<Form.Item*/}
        {/*  name="templateId"*/}
        {/*  label={t('createProduct.templates')}*/}
        {/*  rules={[{ required: true, message: t('createProduct.invalidTemplate') }]}*/}
        {/*>*/}
        {/*  <Template templates={templates} />*/}
        {/*</Form.Item>*/}
      </Form.Custom>
    </CreateProductLayout>
  )
}

export const getStaticProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default CreateProduct

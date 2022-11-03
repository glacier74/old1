import { useTranslation } from 'next-i18next'
import { Form, Input } from '@heyforms/ui'
import { useRouter } from 'next/router'
import * as dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { OnboardingLayout } from '@/layout'
import { LogoPickerField } from '@/components'
import { withTranslations } from '@/utils'
import { ProductService } from '@/service'

dayjs.extend(utc)
dayjs.extend(timezone)

const Onboarding = (): JSX.Element => {
  const router = useRouter()
  const { t } = useTranslation()

  async function handleFinish(values: AnyMap<any>) {
    const productId = await ProductService.create({
      ...values,
      timezone: dayjs.tz.guess()
    })
    router.replace(`/product/${productId}`)
  }

  return (
    <OnboardingLayout seo={{ title: '' }}>
      <h2 className="mb-6 text-2xl font-bold text-slate-900">{t('onboarding.createProduct')}</h2>

      <Form.Custom
        submitText={t('onboarding.createProduct')}
        submitOptions={{
          type: 'primary',
          block: true
        }}
        request={handleFinish}
      >
        <Form.Item name="logo" rules={[{ required: true, message: t('onboarding.invalidLogo') }]}>
          <LogoPickerField />
        </Form.Item>

        <Form.Item
          name="name"
          label={t('onboarding.name')}
          rules={[{ required: true, message: t('onboarding.invalidName') }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="tagline"
          label={t('onboarding.tagline')}
          rules={[{ required: true, message: t('onboarding.invalidTagline') }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label={t('onboarding.description')}
          rules={[{ required: true, message: t('onboarding.invalidDescription') }]}
        >
          <Input.Textarea />
        </Form.Item>
      </Form.Custom>
    </OnboardingLayout>
  )
}

export const getServerSideProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default Onboarding

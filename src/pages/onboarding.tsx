import { useTranslation } from 'next-i18next'
import { OnboardingLayout } from '@/layout'
import { Form, Input } from '@heyforms/ui'
import { LogoPickerField } from '@/components'
import { withTranslations } from '@/utils'
import { ProductService } from '@/service'
import { useRouter } from 'next/router'

const Onboarding = (): JSX.Element => {
  const router = useRouter()
  const { t } = useTranslation()

  async function handleFinish(values: AnyMap<any>) {
    const productId = await ProductService.create(values)
    router.replace(`/product/${productId}`)
  }

  return (
    <OnboardingLayout seo={{ title: '' }}>
      <h2 className="mb-6 text-2xl font-bold text-slate-900">{t('onboarding.createProduct')}</h2>

      <Form.Custom
        submitText={t('onboarding.createProduct')}
        submitOptions={{
          type: 'primary',
          className: 'mt-6',
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

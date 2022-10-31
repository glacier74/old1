import { useTranslation } from 'next-i18next'
import { OnboardingLayout } from '@/layout'
import { Button, Form, Input } from '@heyforms/ui'
import { PhotoPickerField } from '@/components'
import { useRequest, withTranslations } from '@/utils'

const Onboarding = (): JSX.Element => {
  const { t } = useTranslation()
  const { loading, error, request } = useRequest(async () => {})

  function handleFinish() {}

  return (
    <OnboardingLayout seo={{ title: '' }}>
      <h2 className="mt-6 text-2xl font-bold text-slate-900">Create Product</h2>

      <Form onFinish={handleFinish}>
        <Form.Item name="logo" label={t('onboarding.logo')} rules={[{ required: true }]}>
          <PhotoPickerField />
        </Form.Item>

        <Form.Item name="name" label={t('onboarding.name')} rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="tagline" label={t('onboarding.tagline')} rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label={t('onboarding.description')}
          rules={[{ required: true }]}
        >
          <Input.Textarea />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          {t('onboarding.create')}
        </Button>

        {error && <div className="form-item-error">{error.message}</div>}
      </Form>
    </OnboardingLayout>
  )
}

export const getServerSideProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default Onboarding

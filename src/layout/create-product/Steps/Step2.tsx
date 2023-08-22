import { Button, Select } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'

import { useStore } from '~/store'

const options = [
  { label: 'E-commerce', value: 'E-commerce' },
  { label: 'Service offering', value: 'Service offering' },
  { label: 'Lead generation', value: 'Lead generation' },
  { label: 'Webinar registration', value: 'Webinar registration' },
  { label: 'Event registration', value: 'Event registration' },
  { label: 'App download', value: 'App download' },
  { label: 'Ebook', value: 'Ebook' },
  { label: 'Newsletter', value: 'Newsletter' },
  { label: 'Online course', value: 'Online course' },
  { label: 'Pre-order', value: 'Pre-order' },
  { label: 'Coming soon', value: 'Coming soon' },
  { label: 'Waitlist', value: 'Waitlist' },
  { label: 'Non-profit donation', value: 'Non-profit donation' },
  { label: 'Job application', value: 'Job application' },
  { label: 'Personal portfolio', value: 'Personal portfolio' },
  { label: 'Resume', value: 'Resume' },
  { label: 'Company profile', value: 'Company profile' },
  { label: 'Fitness ', value: 'Fitness ' },
  { label: 'Health', value: 'Health' },
  { label: 'Travel', value: 'Travel' },
  { label: 'Financial services', value: 'Financial services' },
  { label: 'Food', value: 'Food' },
  { label: 'Restaurant', value: 'Restaurant' },
  { label: 'SaaS product', value: 'SaaS product' },
  { label: 'Software', value: 'Software' },
  { label: 'Pet care', value: 'Pet care' },
  { label: 'Education', value: 'Education' },
  { label: 'Fashion ', value: 'Fashion ' },
  { label: 'Clothing', value: 'Clothing' },
  { label: 'Technology', value: 'Technology' },
  { label: 'Wedding ', value: 'Wedding ' },
  { label: 'Event planning', value: 'Event planning' },
  { label: 'Automotive', value: 'Automotive' },
  { label: 'Dating', value: 'Dating' },
  { label: 'Matchmaking', value: 'Matchmaking' },
  { label: 'Legal services', value: 'Legal services' },
  { label: 'Gaming', value: 'Gaming' }
]

export const Step2 = () => {
  const { product, setStep, setProduct } = useStore()

  function handleClick() {
    setStep(3)
  }

  function handleChange(category: any) {
    setProduct({
      ...product,
      category
    })
  }

  return (
    <div>
      <div className="flex items-center mb-2 text-3xl font-semibold text-slate-900">
        I am creating a landing page for{' '}
        <Select
          className="create-product-select"
          popupClassName="create-product-select-popup"
          options={options}
          value={product?.category}
          onChange={handleChange}
        />
      </div>
      <p className="mb-8 text-slate-500 text-xl">
        Understanding your industry would enable us to better comprehend your specific needs and
        requirements.
      </p>

      <Button
        type="success"
        className="!px-6 !py-2 !rounded-full !text-lg"
        disabled={isEmpty(product?.category)}
        onClick={handleClick}
      >
        Next
      </Button>
    </div>
  )
}

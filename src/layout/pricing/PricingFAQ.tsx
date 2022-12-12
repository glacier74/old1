import { Disclosure } from '@headlessui/react'
import { IconChevronDown } from '@tabler/icons'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

const faqs = [
  {
    question: 'Who is behind EarlyBird?',
    answer:
      "Hi! My name is Luo and I created EarlyBird to solve a problem I was facing as a creator. I had multiple startup ideas, but as a developer, it took me a long time to create a landing page and validate each idea. I wondered how people without technical skills could do this quickly and easily, so I decided to build something for them. And that's how EarlyBird was born!"
  },
  {
    question: 'Do you offer discounts?',
    answer:
      'Discounts are only available for members on special occasions. To stay informed about discounts, follow us on Twitter and create an account. Additionally, if you have a blog or newsletter, you can write a post about EarlyBird and receive 3 months of free membership.'
  },
  {
    question: 'Can I start for free and upgrade later?',
    answer:
      'You can upgrade your plan at any time through the dashboard billing. Simply log in to your dashboard and navigate to the billing section to choose a new plan.'
  },
  {
    question: 'Can I cancel my plan anytime?',
    answer:
      'Yes, you can cancel your plan at any time through your dashboard. Simply log in to your dashboard and navigate to the billing section to cancel your plan.'
  },
  {
    question: 'Do you offer refunds?',
    answer:
      "There is a 72-hour money-back guarantee, no questions asked. However, we do love to hear your feedback. Please send a refund request to support@earlybird.im and we'll process it as soon as w can."
  }
  // More questions...
]

export const PricingFAQ: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-3xl font-extrabold text-white sm:text-5xl">
            Frequently asked questions
          </h2>

          <dl className="mt-8 space-y-6 divide-y divide-slate-700">
            {faqs.map(faq => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-slate-400">
                        <span className="font-medium text-white">{faq.question}</span>
                        <span className="ml-6 h-7 flex items-center">
                          <IconChevronDown
                            className={clsx(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-slate-400">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

import { Disclosure } from '@headlessui/react'
import { IconChevronDown } from '@tabler/icons'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

const faqs = [
  {
    question: 'faq.q1',
    answer: 'faq.a1'
  },
  {
    question: 'faq.q2',
    answer: 'faq.a2'
  },
  {
    question: 'faq.q3',
    answer: 'faq.a3'
  },
  {
    question: 'faq.q4',
    answer: 'faq.a4'
  },
  {
    question: 'faq.q5',
    answer: 'faq.a5'
  }
]

export const PricingFAQ: FC = () => {
  const { t } = useTranslation('pricing')

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 pb-32 sm:px-6 lg:px-8 mt-16 sm:mt-0">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            {t('faq.headline')}
          </h2>

          <dl className="mt-12 space-y-3 divide-y divide-slate-200">
            {faqs.map(faq => (
              <Disclosure as="div" key={faq.question} className="pt-3">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-slate-700">
                        <span className="font-medium text-lg text-slate-900">
                          {t(faq.question)}
                        </span>
                        <span className="ml-6 h-7 flex items-center">
                          <IconChevronDown
                            className={clsx(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="py-2">
                      <p className="text-slate-700">{t(faq.answer)}</p>
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

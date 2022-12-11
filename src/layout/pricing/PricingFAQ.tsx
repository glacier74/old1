import { useTranslation } from 'next-i18next'
import { Disclosure } from '@headlessui/react'
import { IconChevronDown } from '@tabler/icons'
import Link from 'next/link'
import { FC } from 'react'

const faqs = [
    {
      question: "What's the best thing about Switzerland?",
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    // More questions...
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export const PricingFAQ: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-center text-3xl font-extrabold text-white sm:text-5xl">Frequently asked questions</h2>

            <dl className="mt-8 space-y-6 divide-y divide-slate-700">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-slate-400">
                        <span className="font-medium text-white">{faq.question}</span>
                        <span className="ml-6 h-7 flex items-center">
                          <IconChevronDown
                            className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
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

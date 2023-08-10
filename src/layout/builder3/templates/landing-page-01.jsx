import { Collapse, Form, Icon, Image, Tab, Toggle, clsx } from '@earlybirdim/components'

export const schemas = [
  {
    name: 'header',
    title: 'Header',
    fields: [
      {
        name: 'brand_name',
        title: 'Brand name',
        type: 'text',
        default: 'Bright',
        ai: true
      },
      {
        name: 'brand_logo',
        title: 'Brand logo',
        type: 'image',
        default: 'https://storage.earlybird.im/example/bright-logo.png'
      },
      {
        name: 'navigation',
        title: 'Navigation',
        type: 'list',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'text',
            primary: true
          },
          {
            name: 'url',
            title: 'Link',
            type: 'text'
          }
        ],
        default: [
          {
            title: 'Features',
            url: '#features'
          },
          {
            title: 'Pricing',
            url: '#pricing'
          },
          {
            title: 'FAQs',
            url: '#faq'
          },
          {
            title: 'NewsLetter',
            url: '#newsletter'
          }
        ]
      },
      {
        name: 'cta',
        title: 'Call-to-action',
        type: 'list',
        fields: [
          {
            name: 'icon',
            title: 'Icon',
            type: 'icon'
          },
          {
            name: 'title',
            title: 'Title',
            type: 'text',
            primary: true
          },
          {
            name: 'url',
            title: 'Link',
            type: 'text'
          }
        ],
        default: [
          {
            icon: 'brand-x-line',
            title: 'Follow us',
            url: '#'
          }
        ]
      }
    ]
  },
  {
    name: 'hero',
    title: 'Hero',
    fields: [
      {
        name: 'headline',
        title: 'Headline',
        type: 'html',
        default: 'A better way to ship your projects',
        ai: true
      },
      {
        name: 'description',
        title: 'Description',
        type: 'html',
        default:
          'Effortlessly create, pitch, and validate your early-stage business with our no-code landing page builder.',
        ai: true,
        max_words: 20
      },
      {
        name: 'cta1',
        title: 'Call-to-action 1',
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'text',
            default: 'Get started',
            ai: true
          },
          {
            name: 'url',
            title: 'Link',
            type: 'text',
            default: '#'
          }
        ]
      },
      {
        name: 'cta2',
        title: 'Call-to-action 2',
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'text',
            default: 'Learn more',
            ai: true
          },
          {
            name: 'icon',
            title: 'Icon',
            type: 'icon',
            default: 'arrow-right-line'
          },
          {
            name: 'url',
            title: 'Link',
            type: 'text',
            default: '#'
          }
        ]
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        default: 'https://storage.earlybird.im/example/feature-light.png'
      }
    ]
  },
  {
    name: 'features',
    title: 'Features',
    type: 'list',
    fields: [
      {
        name: 'align',
        title: 'Align',
        type: 'select',
        options: [
          {
            label: 'Left',
            value: 'left'
          },
          {
            label: 'Right',
            value: 'right'
          }
        ]
      },
      {
        name: 'caption',
        title: 'Caption',
        type: 'text',
        ai: true
      },
      {
        name: 'headline',
        title: 'Headline',
        type: 'html',
        primary: true,
        ai: true
      },
      {
        name: 'description',
        title: 'Description',
        type: 'html',
        ai: true
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image'
      },
      {
        name: 'cta',
        title: 'Call-to-action',
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'text',
            ai: true
          },
          {
            name: 'icon',
            title: 'Icon',
            type: 'icon'
          },
          {
            name: 'url',
            title: 'Link',
            type: 'text'
          }
        ]
      }
    ],
    default: [
      {
        align: 'left',
        caption: 'Turn your idea into a reality',
        headline: 'Pitch an idea and convince the audience',
        description:
          'Convince the audience that your idea is worth their attention and investment, and encourage them to take the desired action.',
        cta: {
          title: 'Get started',
          icon: 'arrow-right',
          url: '#'
        },
        image: 'https://storage.earlybird.im/example/feature-04.png'
      },
      {
        align: 'right',
        caption: 'Turn your idea into a reality',
        headline: 'Pitch an idea and convince the audience',
        description:
          'Convince the audience that your idea is worth their attention and investment, and encourage them to take the desired action.',
        image: 'https://storage.earlybird.im/example/feature-05.png'
      },
      {
        align: 'left',
        caption: 'Turn your idea into a reality',
        headline: 'Pitch an idea and convince the audience',
        description:
          'Convince the audience that your idea is worth their attention and investment, and encourage them to take the desired action.',
        image: 'https://storage.earlybird.im/example/feature-06.png'
      }
    ]
  },
  {
    name: 'pricing',
    title: 'Pricing table',
    fields: [
      {
        name: 'headline',
        title: 'Headline',
        type: 'html',
        default: 'Pricing for apps of all sizes',
        ai: true
      },
      {
        name: 'description',
        title: 'Description',
        type: 'html',
        default: 'Your company is free to get started and scales with you as you grow.',
        ai: true
      },
      {
        name: 'products',
        title: 'Products',
        type: 'list',
        fields: [
          {
            name: 'monthly_price',
            title: 'Monthly price',
            type: 'text'
          },
          {
            name: 'yearly_price',
            title: 'Yearly price',
            type: 'text'
          },
          {
            name: 'product_name',
            title: 'Product name',
            type: 'text',
            primary: true,
            ai: true
          },
          {
            name: 'product_headline',
            title: 'Product headline',
            type: 'text',
            ai: true
          },
          {
            name: 'form',
            title: 'Payment',
            type: 'payment',
            fields: [
              {
                name: 'button_text',
                title: 'Button text',
                type: 'text',
                ai: true
              }
            ]
          },
          {
            name: 'product_features',
            title: 'Product features',
            type: 'text_list',
            ai: true
          }
        ],
        default: [
          {
            monthly_price: 0,
            yearly_price: 0,
            product_name: 'Starter',
            product_headline: 'For new makers who want to fine-tune and test an idea.',
            form: {
              button_text: 'Get started for free'
            },
            product_features: [
              '50 conversion actions included',
              'Access to all UI blocks',
              'Real-time analytics',
              'Basic transaction anonymization'
            ]
          },
          {
            monthly_price: '$9',
            yearly_price: '$90',
            product_name: 'Superior',
            product_headline:
              'For creators with multiple ideas who want to efficiently test and refine them.',
            form: {
              button_text: 'Subscribe'
            },
            product_features: [
              '50 conversion actions included',
              'Access to all UI blocks',
              'Real-time analytics',
              'Basic transaction anonymization'
            ]
          },
          {
            monthly_price: '$19',
            yearly_price: '$190',
            product_name: 'Shipper',
            product_headline: 'For productive shippers who want to work more efficiently.',
            form: {
              button_text: 'Subscribe'
            },
            product_features: [
              '50 conversion actions included',
              'Access to all UI blocks',
              'Real-time analytics',
              'Basic transaction anonymization'
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'faq',
    title: 'FAQ',
    fields: [
      {
        name: 'headline',
        title: 'Headline',
        type: 'html',
        default: 'Frequently asked questions',
        ai: true
      },
      {
        name: 'list',
        title: 'Questions and answers',
        type: 'list',
        fields: [
          {
            name: 'question',
            title: 'Question',
            type: 'text',
            primary: true,
            ai: true
          },
          {
            name: 'answer',
            title: 'Answer',
            type: 'text',
            ai: true
          }
        ],
        default: [
          {
            question: 'How does the pricing work?',
            answer:
              'Our business plan is based on volume and the packages and add-ons you choose. We tailor our plans to best fit your needs and volume, so please contact us for a custom quote.'
          },
          {
            question: 'I have a large database of contacts. Can you help?',
            answer:
              'Yes, our integrations and infrastructure are designed to handle large volumes of contacts. If you have more than 1 million contacts, contact us for a match test to get an idea of how much data we can return.'
          },
          {
            question: 'Do you provide premium support?',
            answer: 'Yes! All business plans include a dedicated account manager.'
          },
          {
            question: 'Can you invoice me?',
            answer:
              'Yes! We offer invoicing for business and startup plans. Please contact us for details.'
          },
          {
            question: 'I have more questions!',
            answer: "Just contact us and we'll be more than happy to help."
          }
        ]
      }
    ]
  },
  {
    name: 'newsletter',
    title: 'Newsletter',
    fields: [
      {
        name: 'headline',
        title: 'Headline',
        type: 'html',
        default: 'Join the newsletter!',
        ai: true
      },
      {
        name: 'description',
        title: 'Description',
        type: 'html',
        default:
          'Subscribe now for hand-pickerd holiday deals, inspiration and the latest tips, straight to your inbox.',
        ai: true
      },
      {
        name: 'form',
        title: 'Subscribe',
        type: 'email_capture',
        fields: [
          {
            name: 'button_text',
            title: 'Button text',
            type: 'text',
            default: 'Subscribe',
            ai: true
          }
        ]
      }
    ]
  },
  {
    name: 'footer',
    title: 'Footer',
    fields: [
      {
        name: 'copyright',
        title: 'Copyright',
        type: 'html',
        default: '© 2023 Your Company, Inc. All rights reserved.',
        ai: true
      },
      {
        name: 'socials',
        title: 'Social networks',
        type: 'list',
        fields: [
          {
            name: 'icon',
            title: 'Icon',
            type: 'icon',
            primary: true
          },
          {
            name: 'url',
            title: 'Link',
            type: 'text'
          }
        ],
        default: [
          {
            icon: 'brand-x',
            url: '#'
          },
          {
            icon: 'brand-facebook',
            url: '#'
          },
          {
            icon: 'brand-github',
            url: '#'
          }
        ]
      }
    ]
  }
]

export function render({ options: { header, hero, features, pricing, faq, newsletter, footer } }) {
  return (
    <div>
      <div className="earlybird-voA6dW antialiased font-[Inter] bg-[linear-gradient(#f1f6ff_0%,#fff_1000px)]">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap"
        />
        <div id="header">
          <div className="earlybird-26JxzY max-w-7xl mx-auto">
            <Toggle>
              {(isActive, toggle) => (
                <div
                  className={clsx('earlybird-AGxgTE', 'px-6 lg:px-8 py-6', isActive ? 'pb-6' : '')}
                >
                  <div
                    className={clsx(
                      'earlybird-rXCl6p',
                      'flex flex-col lg:flex-row md:items-center md:justify-between w-full text-base font-medium',
                      isActive
                        ? 'fixed inset-0 px-6 py-6 bg-[linear-gradient(#f1f6ff_0%,#fff_100%)]'
                        : ''
                    )}
                  >
                    <div className="earlybird-tdObc7 w-full flex items-center justify-between lg:w-auto lg:justify-start">
                      <a className="earlybird-rSgvx4 flex items-center gap-3" href="#">
                        <Image
                          className="earlybird-VVSNrN h-[32px] w-auto"
                          src={header.brand_logo}
                          width={32}
                          height={32}
                          alt={header.brand_name}
                        />
                        <span>{header.brand_name}</span>
                      </a>
                      <button className="earlybird-CZErir lg:hidden p-2.5 -mr-4" onClick={toggle}>
                        <Icon
                          className="earlybird-c3MoJX text-gray-600"
                          name={isActive ? 'multiply-line' : 'menu-line'}
                        />
                      </button>
                    </div>
                    <div
                      className={clsx(
                        'earlybird-JIRm65',
                        'mt-4 lg:mt-0 lg:flex-row lg:items-center lg:ml-8 gap-8',
                        isActive ? 'flex flex-col' : 'hidden lg:flex'
                      )}
                    >
                      <nav className="earlybird-FS2ZAp flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-8">
                        {header.navigation.map((row, index) => (
                          <a
                            key={index}
                            className="earlybird-JKn2Rv py-2 lg:py-0 hover:opacity-80"
                            href={row.url}
                          >
                            <span>{row.title}</span>
                          </a>
                        ))}
                      </nav>
                      <ul className="earlybird-CYZbEU flex flex-col lg:flex-row items-center gap-8">
                        {header.cta.map((row, index) => (
                          <a
                            key={index}
                            className="earlybird-Id3Jdd flex items-center w-full lg:w-auto gap-2 px-4 py-1 rounded-full font-medium bg-gray-900 text-[#fff] transition-colors hover:bg-gray-700"
                            href={row.url}
                          >
                            <Icon className="earlybird-kA8QdT w-5 h-5" name={row.icon} />
                            <span>{row.title}</span>
                          </a>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </Toggle>
          </div>
        </div>

        <div id="hero">
          <div className="earlybird-liQnlK mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8 lg:py-32">
            <h1
              className="earlybird-V6w6zJ max-w-3xl mx-auto text-4xl font-bold tracking-tight sm:text-6xl text-center"
              dangerouslySetInnerHTML={{
                __html: hero.headline
              }}
            />
            <div
              className="earlybird-KRsHv3 max-w-2xl mx-auto mt-6 text-lg leading-8 text-center"
              dangerouslySetInnerHTML={{
                __html: hero.description
              }}
            />
            <div className="earlybird-rRIy5N mt-10">
              <ul className="earlybird-7Ve0EV flex items-center justify-center gap-6">
                <a
                  className="earlybird-DXprED py-2 px-4 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-500"
                  href={hero.cta1.url}
                >
                  {hero.cta1.title}
                </a>
                <a
                  className="earlybird-IXRXfG flex items-center gap-1 py-2 rounded-md font-medium text-gray-800 hover:text-gray-600"
                  href={hero.cta2.url}
                >
                  <span>{hero.cta2.title}</span>
                  <Icon className="earlybird-jf2PMR w-5 h-5" name={hero.cta2.icon} />
                </a>
              </ul>
            </div>
            <div className="earlybird-I04QmZ mt-16 sm:mt-24 lg:flex-shrink-0 lg:flex-grow">
              <Image
                className="earlybird-IqLapD mx-auto max-w-full rounded-md shadow-2xl ring-1 ring-gray-900/10"
                src={hero.image}
                loading="lazy"
                width={1200}
                decoding="async"
              />
            </div>
          </div>
        </div>

        <div id="features">
          {features.map((row, index) => (
            <div key={index} className="earlybird-bGCt4Y group py-12 md:py-24">
              <div className="earlybird-aUNB4p mx-auto max-w-7xl px-6 lg:px-8">
                <div className="earlybird-pgvHyh grid grid-cols-1 gap-y-6 gap-x-8 sm:gap-y-16 lg:grid-cols-2 lg:items-start">
                  <div className="earlybird-E5i8Em md:flex-1 md:my-auto lg:pr-4">
                    <div className="earlybird-WhBRg3 mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                      <div className="earlybird-TqB1SY mb-2 font-semibold leading-8 tracking-tight group-[:nth-of-type(3n+1)]:text-blue-600 group-[:nth-of-type(3n+2)]:text-red-600 group-[:nth-of-type(3n+0)]:text-emerald-600">
                        {row.caption}
                      </div>
                      <h2
                        className="earlybird-zndAHP text-3xl font-bold tracking-tight sm:text-4xl"
                        dangerouslySetInnerHTML={{
                          __html: row.headline
                        }}
                      />
                      <div
                        className="earlybird-U17FhW mt-6 text-lg leading-8"
                        dangerouslySetInnerHTML={{
                          __html: row.description
                        }}
                      />
                      <ul className="earlybird-EyWZVk flex items-center mt-6 md:mt-8 space-x-5">
                        {row.cta && (
                          <a
                            className="earlybird-zAqfMT inline-flex items-center font-semibold text-blue-700 gap-2"
                            href={row.cta.url}
                          >
                            <span>{row.cta.title}</span>
                            <Icon className="earlybird-ubO92E w-5 h-5" name={row.cta.icon} />
                          </a>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div
                    className={`earlybird-VY6ms5 md:flex-1 md:flex md:items-center sm:px-6 lg:px-0 ${
                      row.align === 'right' ? 'lg:-order-[999]' : ''
                    }`}
                  >
                    <div className="earlybird-oJEbIp sm:mx-auto sm:max-w-2xl lg:max-w-none">
                      <img
                        className="earlybird-L5hT9Q rounded-lg"
                        src={row.image}
                        alt=""
                        loading="lazy"
                        width="590"
                        height="auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id="pricing">
          <div className="earlybird-KgxQ39 py-24 sm:py-32">
            <div className="earlybird-NEssN4 mx-auto max-w-7xl px-6 lg:px-8 text-center">
              <div className="earlybird-qqUbLe mx-auto max-w-2xl lg:text-center">
                <h2
                  className="earlybird-16BUPJ text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                  dangerouslySetInnerHTML={{
                    __html: pricing.headline
                  }}
                />
                <div
                  className="earlybird-P5UmNY mt-3 mx-auto max-w-4xl text-lg leading-8 text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: pricing.description
                  }}
                />
              </div>

              <Tab defaultActiveKey="monthly">
                <div className="earlybird-q4DOhw mt-14 flex justify-center">
                  <Tab.NavList className="earlybird-Z4L4wr flex items-center gap-1 p-1 rounded-[9999px] shadow-[inset_0_0_0_1px_rgba(30,30,30,0.1)]">
                    {[
                      {
                        label: 'Monthly',
                        key: 'monthly'
                      },
                      {
                        label: 'Yearly',
                        key: 'yearly'
                      }
                    ].map(row => (
                      <Tab.Nav key={row.key}>
                        {(isSelected, select) => (
                          <button
                            className={`earlybird-cIU6pc py-1 px-2.5 text-sm font-medium rounded-[9999px] ${
                              isSelected ? 'text-[#fff] bg-[#2563eb]' : 'text-gray-700'
                            }`}
                            tabIndex={0}
                            type="button"
                            role="tab"
                            aria-selected="true"
                            id={`tab-${row.key}`}
                            aria-controls={`tabpanel-${row.key}`}
                            onClick={select}
                          >
                            {row.label}
                          </button>
                        )}
                      </Tab.Nav>
                    ))}
                  </Tab.NavList>
                </div>
                <Tab.Panel>
                  {activeKey => (
                    <div
                      role="tabpanel"
                      id={`tabpanel-${activeKey}`}
                      aria-labelledby={`tab-${activeKey}`}
                    >
                      <div className="earlybird-MPZz6H mx-auto mt-6 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <ul className="earlybird-0Vhmmk grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
                          {pricing.products.map((row, index) => (
                            <li key={index}>
                              <div className="earlybird-9UY4q4 p-6 border border-gray-200 rounded-3xl text-left">
                                <h2 className="earlybird-OcGLhQ text-xl font-bold">
                                  {row.product_name}
                                </h2>
                                <p className="earlybird-OefdwQ mt-2 text-base leading-tight">
                                  {row.product_headline}
                                </p>
                                <div className="earlybird-Jj9Gm1 mt-8">
                                  <span className="earlybird-VbQJQp text-4xl font-bold">
                                    {activeKey === 'monthly' ? row.monthly_price : row.yearly_price}
                                  </span>
                                  <span className="earlybird-KRYSuV pl-1 text-base font-medium opacity-80">
                                    /{activeKey === 'monthly' ? 'month' : 'year'}
                                  </span>
                                </div>
                                <Form {...row.form}>
                                  <Form.Button className="earlybird-O0kyhP mt-6 block w-full bg-gray-900 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-700">
                                    {row.form.button_text}
                                  </Form.Button>
                                </Form>
                                <ul className="earlybird-MhmZvQ mt-6 space-y-3 text-[#4b5563]">
                                  {row.product_features.map((feature, index) => (
                                    <li
                                      key={index}
                                      className="earlybird-w6eIOQ flex items-center gap-2"
                                    >
                                      <Icon
                                        className="earlybird-eaOvA1 w-5 h-5 text-[#2563eb]"
                                        name="check-circle-line"
                                      />
                                      <span className="earlybird-I3zdG5 flex-1">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </Tab.Panel>
              </Tab>
            </div>
          </div>
        </div>

        <div id="faq">
          <div className="earlybird-2WqGzd mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
            <div className="earlybird-hfKogK mx-auto max-w-4xl">
              <h2
                className="earlybird-QjDtpr text-2xl font-bold leading-10 tracking-tight text-gray-900"
                dangerouslySetInnerHTML={{
                  __html: faq.headline
                }}
              />

              <Collapse className="earlybird-OXj2FW mt-4 divide-y">
                {faq.list.map((row, index) => (
                  <Collapse.Item key={index}>
                    {(isExpand, toggle) => (
                      <li>
                        <div
                          className="earlybird-Yy9s4l group py-6 flex w-full items-center justify-between gap-2 text-gray-900 cursor-pointer"
                          tabIndex={0}
                          role="button"
                          aria-expanded={isExpand}
                          aria-controls={`faq${index}-content`}
                          id={`faq${index}-header`}
                          onClick={toggle}
                        >
                          <h3 className="earlybird-AJgFmE text-base text-left font-semibold leading-7">
                            {row.question}
                          </h3>
                          {isExpand ? (
                            <Icon name="minus-line" className="earlybird-99BmU9 w-5 h-5" />
                          ) : (
                            <Icon
                              name="plus-line"
                              className="earlybird-Imqi4F w-5 h-5 opacity-60 group-hover:opacity-100"
                            />
                          )}
                        </div>
                        {isExpand && (
                          <div
                            className="earlybird-OTSw68 pb-6 text-base text-gray-700 leading-6"
                            aria-labelledby={`faq${index}-header`}
                            id={`faq${index}-content`}
                            role="region"
                          >
                            {row.answer}
                          </div>
                        )}
                      </li>
                    )}
                  </Collapse.Item>
                ))}
              </Collapse>
            </div>
          </div>
        </div>

        <div id="newsletter">
          <div className="earlybird-YzhJaa py-24 sm:py-32 bg-gray-50">
            <div className="earlybird-MWGmnV mx-auto max-w-7xl px-6 lg:px-8 text-center">
              <h2
                className="earlybird-l39bgH text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                dangerouslySetInnerHTML={{
                  __html: newsletter.headline
                }}
              />
              <div
                className="earlybird-bC2kcd mt-3 mx-auto max-w-4xl text-lg leading-8 text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: newsletter.description
                }}
              />
              <Form
                className="earlybird-DwttLV mt-12 sm:mx-auto sm:flex sm:max-w-lg space-x-0 space-y-3 sm:space-x-3 sm:space-y-0 border-gray-300"
                {...newsletter.form}
              >
                <Form.Item name="email" required={true}>
                  <Form.Input
                    type="email"
                    className="earlybird-Cdf9Zj w-full sm:w-[16rem] rounded-md bg-white px-4 py-[7px] border border-gray-200 text-gray-900 placeholder:text-gray-400"
                    placeholder="Enter email address"
                  />
                </Form.Item>
                <Form.Button className="earlybird-LSYwNC relative w-full sm:w-auto h-[40px] rounded-md px-5 py-1 text-base text-center font-medium bg-blue-600 text-white hover:bg-blue-500">
                  {newsletter.form.button_text}
                </Form.Button>
              </Form>
            </div>
          </div>
        </div>

        <div id="footer">
          <div className="earlybird-NIrP5w mx-auto max-w-7xl py-12 px-6 md:flex md:items-center md:justify-between lg:px-8">
            <ul className="earlybird-uxAVxM flex justify-center space-x-3 md:order-2">
              {footer.socials.map((row, index) => (
                <a key={index} href={row.url}>
                  <Icon name={row.icon} className="earlybird-aDqCH5 h-6 w-6" />
                </a>
              ))}
            </ul>
            <div className="earlybird-BCacn4 block sm:flex sm:items-center sm:justify-center md:justify-start mt-8 md:order-1 md:mt-0 text-sm leading-5 text-center sm:text-left">
              <div
                className="earlybird-srkMVw text-sm"
                dangerouslySetInnerHTML={{ __html: footer.copyright }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Collapse, Form, Icon, Image, Toggle, clsx } from '@earlybirdim/components'

export const schemas = [
  {
    name: 'header',
    title: 'Header',
    fields: [
      {
        name: 'brand_name',
        title: 'Brand name',
        type: 'text',
        default: 'Your Company',
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
            title: 'Payment',
            url: '#payment'
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
            title: 'Contact us',
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
        name: 'announcement',
        title: 'Announcement',
        type: 'html',
        default: 'Take a look at our latest <a href="#" style="color:#2563eb">blog post</a>',
        ai: true
      },
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
        ai: true
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
        default: 'https://storage.earlybird.im/example/hero-image.png'
      }
    ]
  },
  {
    name: 'features',
    title: 'Features',
    fields: [
      {
        name: 'caption',
        title: 'Caption',
        type: 'html',
        default: '<span style="color:#2563eb">Turn your idea into a reality</span>',
        ai: true
      },
      {
        name: 'headline',
        title: 'Headline',
        type: 'html',
        default: 'Pitch an idea and convince the audience',
        ai: true
      },
      {
        name: 'description',
        title: 'Description',
        type: 'html',
        default:
          'Convince the audience that your idea is worth their attention and investment, and encourage them to take the desired action.',
        ai: true
      },
      {
        name: 'feature_list',
        title: 'Feature List',
        type: 'list',
        fields: [
          {
            name: 'emoji',
            title: 'Emoji',
            type: 'text',
            ai: true
          },
          {
            name: 'headline',
            title: 'Headline',
            type: 'text',
            primary: true,
            ai: true
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
            ai: true,
            max_words: 16
          }
        ],
        default: [
          {
            emoji: '📦',
            headline: 'Custom branding',
            description:
              'Add your own logo, colors, and other branding elements to reflect your own brand.'
          },
          {
            emoji: '🧲',
            headline: 'Social proof',
            description:
              'Show testimonials and ratings to build trust and credibility with potential customers.'
          },
          {
            emoji: '🌁',
            headline: 'Image Carousel',
            description:
              'Showcase your product, service, or other visual content in an engaging way to your customers that your offering is worth investing in.'
          },
          {
            emoji: '⛺',
            headline: 'Features walkthrough',
            description:
              'Highlight the key benefits and features of your product, and explain how it solves specific problems that your target customers have.'
          },
          {
            emoji: '✨',
            headline: 'Custom Open Graph',
            description:
              'Get your content stand out and attract more attention on social media with custom title, description, image, and other information.'
          },
          {
            emoji: '🥅',
            headline: 'Custom domain',
            description:
              'Use your own domain name to create a more professional-looking and cohesive experience for your customers.'
          }
        ]
      }
    ]
  },
  {
    name: 'payment',
    title: 'Payment',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'html',
        default: 'Pricing for apps of all sizes',
        ai: true
      },
      {
        name: 'subtitle',
        title: 'Subtitle',
        type: 'html',
        default: 'Your company is free to get started and scales with you as you grow.',
        ai: true
      },
      {
        name: 'product_name',
        title: 'Product name',
        type: 'text',
        default: 'Starter',
        ai: true
      },
      {
        name: 'product_description',
        title: 'Product description',
        type: 'text',
        default: 'For new makers who want to fine-tune and test an idea.',
        ai: true
      },
      {
        name: 'product_features',
        title: 'Product features',
        type: 'text_list',
        ai: true,
        default: [
          '50 conversion actions included',
          'Access to all UI blocks',
          'Real-time analytics',
          'Basic transaction anonymization',
          'Real-time analytics',
          'Custom domain'
        ]
      },
      {
        name: 'price',
        title: 'Product price',
        type: 'text',
        default: '$199'
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
            default: 'Get access',
            ai: true
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
        name: 'title',
        title: 'Title',
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

export function render({ options: { header, hero, features, payment, faq, newsletter, footer } }) {
  return (
    <div className="antialiased font-[Inter] bg-white">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap"
      />
      <div id="header">
        <div className="max-w-7xl mx-auto">
          <Toggle>
            {(isActive, toggle) => (
              <div className={clsx('px-6 lg:px-8 py-6', isActive ? 'pb-6' : '')}>
                <div
                  className={clsx(
                    'flex flex-col lg:flex-row lg:items-center lg:justify-between w-full text-base font-medium',
                    isActive ? 'fixed inset-0 px-6 py-6 bg-white' : ''
                  )}
                >
                  <div className="w-full lg:w-1/3 flex items-center justify-between lg:justify-start">
                    <a className="flex items-center gap-3" href="#">
                      <Image
                        className="h-[32px] w-auto"
                        src={header.brand_logo}
                        width={32}
                        height={32}
                        alt={header.brand_name}
                      />
                      <span className="font-semibold">{header.brand_name}</span>
                    </a>
                    <button className="lg:hidden p-2.5 -mr-4" onClick={toggle}>
                      <Icon
                        className="text-gray-600"
                        name={isActive ? 'multiply-line' : 'menu-line'}
                      />
                    </button>
                  </div>
                  <div
                    className={clsx(
                      'w-full lg:w-2/3 mt-4 lg:mt-0 lg:flex-row lg:items-center lg:justify-between gap-8',
                      isActive ? 'flex flex-col' : 'hidden lg:flex'
                    )}
                  >
                    <nav className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-8">
                      {header.navigation.map((row, index) => (
                        <a key={index} className="py-2 lg:py-0 hover:opacity-80" href={row.url}>
                          <span>{row.title}</span>
                        </a>
                      ))}
                    </nav>
                    <ul className="flex flex-col lg:flex-row items-center gap-8">
                      {header.cta.map((row, index) => (
                        <a
                          key={index}
                          className="flex items-center w-full lg:w-auto gap-2 px-4 py-1 rounded-full font-medium border border-gray-900 text-gray-900 transition-colors hover:border-gray-700 hover:text-gray-700"
                          href={row.url}
                        >
                          <Icon className="w-5 h-5" name={row.icon} />
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
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <div className="mb-10">
              <p
                className="inline-block md:inline rounded-full py-1.5 px-3 text-sm text-center leading-6 border"
                dangerouslySetInnerHTML={{
                  __html: hero.announcement
                }}
              />
            </div>
            <h1
              className="max-w-2xl mx-auto text-4xl font-bold tracking-tight sm:text-6xl"
              dangerouslySetInnerHTML={{
                __html: hero.headline
              }}
            />
            <p
              className="max-w-3xl mx-auto mt-6 text-lg leading-8"
              dangerouslySetInnerHTML={{
                __html: hero.description
              }}
            />
            <div className="mt-10">
              <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <a
                  className="py-2 px-4 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-500"
                  href={hero.cta1.url}
                >
                  {hero.cta1.title}
                </a>
                <a
                  className="flex items-center gap-1 py-2 rounded-md font-medium text-gray-800 hover:text-gray-600"
                  href={hero.cta2.url}
                >
                  <span>{hero.cta2.title}</span>
                  <Icon className="w-5 h-5" name={hero.cta2.icon} />
                </a>
              </ul>
            </div>
          </div>
          <div className="relative mt-16 sm:mt-28 lg:mt-0 lg:flex-shrink-0 lg:flex-grow z-10">
            <div className="absolute pointer-events-none w-[420px] h-[420px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(-45deg,#f3d594_40%,#89e7d6_80%)] blur-[80px] rounded-[50%] z-10"></div>
            <Image
              className="relative mx-auto max-w-full z-30"
              src={hero.image}
              loading="lazy"
              width={420}
              decoding="async"
            />
          </div>
        </div>
      </div>

      <div id="features">
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <div className="mx-auto max-w-2xl lg:text-center">
              <p
                className="text-lg font-semibold leading-8 tracking-tight"
                dangerouslySetInnerHTML={{
                  __html: features.caption
                }}
              />
              <h2
                className="text-3xl font-bold tracking-tight sm:text-4xl"
                dangerouslySetInnerHTML={{
                  __html: features.headline
                }}
              />
              <p
                className="mt-3 text-lg leading-8"
                dangerouslySetInnerHTML={{
                  __html: features.description
                }}
              />
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <ul className="grid md:max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.feature_list.map((row, index) => (
                  <li key={index}>
                    <span className="mx-auto mb-6 flex h-14 w-14 text-[2rem] items-center justify-center rounded-lg bg-slate-100">
                      <span>{row.emoji}</span>
                    </span>
                    <h3 className="text-xl font-semibold leading-7">{row.headline}</h3>
                    <div className="mt-1 flex flex-auto flex-col text-base leading-7 md:px-8">
                      {row.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="payment">
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2
                className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
                dangerouslySetInnerHTML={{
                  __html: payment.title
                }}
              />
              <p
                className="mt-3 mx-auto max-w-4xl text-lg leading-8 text-slate-600"
                dangerouslySetInnerHTML={{
                  __html: payment.subtitle
                }}
              />
            </div>
            <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-slate-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
              <div className="p-8 sm:p-10 lg:flex-auto text-left">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  {payment.product_name}
                </h2>
                <p className="mt-2 text-base leading-7 text-slate-600">
                  {payment.product_description}
                </p>
                <ul className="mt-8 grid grid-cols-1 gap-2 text-sm text-slate-600 sm:grid-cols-2 sm:gap-4 whitespace-pre-line">
                  {payment.product_features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-blue-600" name="check-line" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="h-auto md:h-full rounded-2xl py-8 text-center bg-[#f9fafb] ring-1 ring-inset ring-slate-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div className="mx-auto w-full md:w-[20rem] px-8">
                    <div className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                      <span>{payment.price}</span>
                    </div>
                    <Form {...payment.form}>
                      <Form.Button className="mt-10 block w-full rounded-md bg-slate-900 text-white px-3 py-2 text-center text-sm font-semibold shadow-sm hover:bg-slate-700">
                        {payment.form.button_text}
                      </Form.Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="faq">
        <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2
              className="text-2xl font-bold leading-10 tracking-tight text-gray-900"
              dangerouslySetInnerHTML={{
                __html: faq.title
              }}
            />

            <Collapse className="mt-4 divide-y">
              {faq.list.map((row, index) => (
                <Collapse.Item key={index}>
                  {(isExpand, toggle) => (
                    <li>
                      <div
                        className="group py-6 flex w-full items-center justify-between gap-2 text-gray-900 cursor-pointer"
                        tabIndex={0}
                        role="button"
                        aria-expanded={isExpand}
                        aria-controls={`faq${index}-content`}
                        id={`faq${index}-header`}
                        onClick={toggle}
                      >
                        <h3 className="text-base text-left font-semibold leading-7">
                          {row.question}
                        </h3>
                        {isExpand ? (
                          <Icon name="minus-line" className="w-5 h-5" />
                        ) : (
                          <Icon
                            name="plus-line"
                            className="w-5 h-5 opacity-60 group-hover:opacity-100"
                          />
                        )}
                      </div>
                      {isExpand && (
                        <div
                          className="pb-6 text-base text-gray-700 leading-6"
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
        <div className="mx-auto max-w-7xl py-12 px-6 lg:py-16 lg:px-8">
          <div className="rounded-lg bg-blue-700 px-6 py-6 md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center">
            <div className="xl:w-0 xl:flex-1">
              <h2
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
                dangerouslySetInnerHTML={{
                  __html: newsletter.headline
                }}
              />
              <p
                className="mt-3 max-w-3xl text-lg leading-6 text-blue-200"
                dangerouslySetInnerHTML={{
                  __html: newsletter.description
                }}
              />
            </div>
            <div className="mt-8 xl:mt-0 xl:ml-8">
              <Form
                className="space-x-0 space-y-3 sm:space-x-3 sm:space-y-0 sm:flex border-slate-300"
                {...newsletter.form}
              >
                <Form.Item name="email" required={true}>
                  <Form.Input
                    type="email"
                    className="w-full sm:w-[16rem] rounded-md bg-white/20 px-4 py-[7px] border border-white/30 text-white placeholder:text-white/50 focus:ring-1 focus:border-white/80 focus:ring-white/80 focus-visible:ring-1 focus-visible:border-white/80 focus-visible:ring-white/80"
                    placeholder="Enter email address"
                  />
                </Form.Item>
                <Form.Button className="relative w-full sm:w-auto h-[40px] rounded-md px-5 py-1 text-base text-center font-medium bg-white text-blue-600 hover:bg-blue-50">
                  {newsletter.form.button_text}
                </Form.Button>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <div id="footer">
        <div className="mx-auto max-w-7xl py-12 px-6 md:flex md:items-center md:justify-between lg:px-8">
          <ul className="flex justify-center space-x-3 md:order-2">
            {footer.socials.map((row, index) => (
              <a key={index} href={row.url}>
                <Icon name={row.icon} className="h-6 w-6" />
              </a>
            ))}
          </ul>
          <div className="block sm:flex sm:items-center sm:justify-center md:justify-start mt-8 md:order-1 md:mt-0 text-sm leading-5 text-center sm:text-left">
            <p className="text-sm" dangerouslySetInnerHTML={{ __html: footer.copyright }} />
          </div>
        </div>
      </div>
    </div>
  )
}

import { Form, Icon, Image, Toggle, clsx } from '@earlybirdim/components'
import { Fragment } from 'react'

export const schemas = [
  {
    name: 'header',
    title: 'Header',
    fields: [
      {
        name: 'logo',
        title: 'Logo',
        type: 'text',
        default: 'PandaZen'
      },
      {
        name: 'nav',
        title: 'Navigation',
        type: 'list',
        fields: [
          {
            name: 'label',
            title: 'Label',
            type: 'text'
          },
          {
            name: 'link',
            title: 'Link',
            type: 'text'
          }
        ],
        default: [
          {
            label: 'Roadmap',
            link: '#'
          },
          {
            label: 'Feedback',
            link: '#'
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
        name: 'title',
        title: 'Hero title',
        ai: true,
        type: 'text',
        default: 'Launch your product site in 10 minutes'
      },
      {
        name: 'description',
        title: 'Hero description',
        ai: true,
        type: 'text',
        default:
          "Utilize PandaZen to create a compelling product landing page. Highlight your product's strengths, engage visitors, and convert them into customers effortlessly."
      },
      {
        name: 'cta_button',
        title: 'CTA button',
        ai: true,
        type: 'text',
        default: '👋 Try it for free'
      },
      {
        name: 'cta_link',
        title: 'CTA button link',
        type: 'text',
        default: 'https://earlybird.im'
      },
      {
        name: 'image',
        title: 'Image',
        type: 'text',
        default: 'https://storage.earlybird.im/examples/hero-02.png'
      }
    ]
  },
  {
    name: 'socialproof',
    title: 'Social proof',
    fields: [
      {
        name: 'title',
        title: 'Title',
        ai: true,
        type: 'text',
        default: 'Trusted by leading product companies'
      },
      {
        name: 'list',
        title: 'List',
        type: 'text_list',
        default: [
          'https://earlybird.b-cdn.net/template-assets/PandaZen/Google-Logo.webp',
          'https://earlybird.b-cdn.net/template-assets/PandaZen/Shopify-Logo.svg',
          'https://earlybird.b-cdn.net/template-assets/PandaZen/Cloudflare-Logo.svg',
          'https://earlybird.b-cdn.net/template-assets/PandaZen/PayPal-Logo.png'
        ]
      }
    ]
  },
  {
    name: 'feature',
    title: 'Features',
    fields: [
      {
        name: 'title',
        title: 'Title',
        ai: true,
        type: 'text',
        default: 'Less code, less effort'
      },
      {
        name: 'description',
        title: 'Description',
        ai: true,
        type: 'text',
        default: 'Simply update the copywriting and you are good to go!'
      },
      {
        name: 'image',
        title: 'Image',
        ai: true,
        type: 'image',
        default: 'https://earlybird.b-cdn.net/template-assets/PandaZen/placeholder.png'
      }
    ]
  },
  {
    name: 'newsletter',
    title: 'Newsletter',
    fields: [
      {
        name: 'title',
        title: 'Title',
        ai: true,
        type: 'text',
        default: 'Subscribe to our newsletter'
      },
      {
        name: 'description',
        title: 'Description',
        ai: true,
        type: 'text',
        default: 'Enter your email address and get our newsletters straight away.'
      },
      {
        name: 'form',
        title: 'Subscribe',
        type: 'email_capture',
        fields: [
          {
            name: 'placeholder',
            title: 'Placeholder',
            type: 'text',
            default: 'Enter your email address',
            ai: true
          },
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
        name: 'list',
        title: 'List',
        type: 'list',
        fields: [
          {
            name: 'label',
            title: 'Label',
            type: 'text'
          },
          {
            name: 'link',
            title: 'Link',
            type: 'text'
          }
        ],
        default: [
          {
            label: 'Terms of Service',
            link: '#'
          },
          {
            label: 'Privacy Policy',
            link: '#'
          }
        ]
      },
      {
        name: 'copyright',
        title: 'Copyright',
        ai: true,
        type: 'text',
        default: '© 2023 Your Company Inc.'
      }
    ]
  }
]

export function render({ options: { header, hero, socialproof, feature, newsletter, footer } }) {
  return (
    <Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: `.clearNav {
backdrop-filter: saturate(180%) blur(15px)!important;
background-color: hsla(0,0%,100%,.6)!important;
}

.greyC {
filter: grayscale(100%);
transition: .4s;
}

.greyC:hover {
filter: none;
}

.g327 {
border-color: #302f30;
}

.newsletter-button > div {
display: inline;
}

`
        }}
      />
      <div>
        <div className="earlybird-KbtPeR antialiased font-[Inter]">
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap"
          />

          <div
            id="header"
            className="earlybird-om1Y8Z fixed top-0 w-full z-30 clearNav md:bg-opacity-90 transition duration-300 ease-in-out"
          >
            <Toggle>
              {(isActive, toggle) => (
                <div
                  className={clsx(
                    'earlybird-kL8Nfr flex flex-col max-w-7xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8',
                    {
                      'pb-6 shadow-2xl': isActive
                    }
                  )}
                >
                  <div className="earlybird-i6Gk7X flex flex-row items-center justify-between py-4">
                    <a
                      href="/"
                      className="earlybird-hGgPS0 text-lg font-semibold rounded-lg tracking-widest focus:outline-none focus:shadow-outline"
                    >
                      <h1 className="earlybird-U8PfEc text-2xl tracking-tighter text-slate-950 md:text-4x1 lg:text-3xl">
                        {header.logo}
                      </h1>
                    </a>
                    <button
                      className="earlybird-uudAo7 cursor-pointer leading-none px-3 py-1 md:hidden outline-none focus:outline-none"
                      onClick={toggle}
                    >
                      <Icon name={isActive ? 'multiply-line' : 'menu'} />
                    </button>
                  </div>
                  <div
                    className={`earlybird-xOwzdg md:flex flex-grow items-center ${
                      !isActive ? 'hidden' : 'flex'
                    }`}
                  >
                    <div className="earlybird-nfI6IL flex-col flex-grow">
                      <div className="earlybird-3hy5ik sm:flex sm:flex-grow sm:justify-end flex-wrap items-center">
                        {header.nav.map((row, index) => (
                          <div key={index}>
                            <a
                              href={row.link}
                              className="earlybird-NaAQVS font-medium text-slate-600 hover:text-slate-950 px-5 py-3 flex flex-col sm:flex-row items-center justify-center transition duration-150 ease-in-out"
                            >
                              {row.label}
                            </a>
                          </div>
                        ))}
                        <ul className="earlybird-CYZbEU flex flex-col lg:flex-row items-center ml-4 mt-4 md:mt-0 gap-8">
                          {header.cta.map((row, index) => (
                            <a
                              key={index}
                              className="earlybird-Id3Jdd flex items-center justify-center w-full lg:w-auto gap-2 px-4 py-2 rounded-md font-medium bg-slate-950 text-white hover:bg-slate-700"
                              href={row.url}
                            >
                              <div className="earlybird-4ufCPV flex justify-center items-center">
                                <Icon className="earlybird-kA8QdT w-5 h-5" name={row.icon} />
                                <span>{row.title}</span>
                              </div>
                            </a>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Toggle>
          </div>

          <div
            id="hero"
            className="earlybird-9NfZTU max-w-7xl mx-auto flex flex-col lg:flex-row px-8 py-24 items-center"
          >
            <div
              className="earlybird-Tahsnx md:max-w-xl
             md:mx-auto lg:flex-grow w-full lg:w-1/2 pt-6 flex flex-col items-center lg:items-start text-center lg:text-left justify-center"
            >
              <h1 className="earlybird-wIbpI8 mb-5 lg:text-6xl md:text-5xl text-4xl items-center font-bold xl:w-2/2 text-slate-950">
                {hero.title}
              </h1>
              <p className="earlybird-FLNg2z mb-4 text-gray-600 text-lg">{hero.description}</p>
              <div className="earlybird-0whZ1P flex justify-center">
                <a
                  className="earlybird-FN7lEG inline-flex items-center px-5 py-3 mt-2 font-medium text-white transition duration-500 ease-in-out transform border rounded-lg bg-gray-900"
                  href={hero.cta_link}
                >
                  {hero.cta_button}
                </a>
              </div>
            </div>
            <div className="earlybird-2kAQw2 sm:mb-28 mb-0 lg:mb-0 flex items-center mt-8 justify-center w-full md:w-1/2">
              <Image
                className="earlybird-ssl8oE object-contain w-80"
                alt={hero.title}
                src={hero.image}
                height={600}
                priority={true}
              />
            </div>
          </div>

          <div id="socialproof" className="earlybird-s6vSnV mx-auto">
            <div className="earlybird-PANJc5 container px-5 mx-auto lg:px-24">
              <div className="earlybird-Vg2hcF flex flex-col w-full mb-4 text-center md">
                <h1 className="earlybird-zgTz1t mb-8 text-2xl Avenir font-semibold text-black">
                  {socialproof.title}
                </h1>
              </div>
              <div className="earlybird-d8L4w7 grid grid-cols-2 gap-6 md:gap-16 mb-6 md:mb-16 text-center lg:grid-cols-4">
                {socialproof.list.map((row, index) => (
                  <div key={index} className="earlybird-iZe060 flex items-center justify-center">
                    <Image
                      src={row}
                      alt={row}
                      height={64}
                      className="earlybird-diXxHp block object-contain h-16 greyC"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div id="feature" className="earlybird-CRMFvy max-w-7xl pt-20 mx-auto text-center">
            <h1 className="earlybird-bsfpax mb-4 lg:text-6xl text-3xl font-bold text-gray-900">
              {feature.title}
            </h1>
            <h1 className="earlybird-DKjETu mb-8 lg:text-2xl text-lg font-semibold text-gray-600 text-center">
              {feature.description}
            </h1>
            <div className="earlybird-8O1lVf container flex flex-col items-center justify-center mx-auto rounded-lg">
              <Image
                className="earlybird-gxdZsp object-cover object-center w-full md:w-3/4 mb-0 md:mb-10 border rounded-lg shadow-md"
                alt={feature.title}
                src={feature.image}
                height={540}
              />
            </div>
          </div>
          <div id="newsletter" className="earlybird-jphtKj relative">
            <div className="earlybird-ZijEV4 max-w-6xl mx-auto px-4 sm:px-6 text-center">
              <Form {...newsletter.form} className="earlybird-5jBcTv py-24 md:py-36">
                <h2 className="earlybird-oi8QYe mb-5 lg:text-5xl text-3xl font-bold text-slate-950">
                  {newsletter.title}
                </h2>
                <p className="earlybird-Nm1rdU mb-9 lg:text-2xl text-xl font-medium text-slate-500">
                  {newsletter.description}
                </p>

                <Form.Item name="email" required={true} className="earlybird-PWtHwc inline">
                  <Form.Input
                    type="email"
                    className="earlybird-eGAMbE border border-gray-600 w-full md:w-1/4 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-800 font-semibold hover:border-gray-900"
                    placeholder={newsletter.form.placeholder}
                  />
                </Form.Item>
                <Form.Item className="earlybird-uh7CvA inline newsletter-button">
                  <Form.Button className="earlybird-kLrWXO inline items-center w-full md:w-auto px-14 py-3 mt-2 sm:ml-2 font-medium text-white transition duration-500 ease-in-out transform border rounded-lg bg-slate-950">
                    {newsletter.form.button_text}
                  </Form.Button>
                </Form.Item>
              </Form>
            </div>
          </div>

          <div id="footer" className="earlybird-4F7lDf pb-4">
            <div className="earlybird-eg1Zeh max-w-6xl xl:max-w-6xl mx-auto divide-y divide-gray-200 px-4 sm:px-6 md:px-8">
              <div className="earlybird-xsAjak flex flex-col-reverse justify-between pt-5 pb-4 border-t lg:flex-row bg-top border-black">
                <div className="earlybird-lU88fE flex flex-col space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                  {footer.list.map((row, index) => (
                    <div key={index}>
                      <a
                        href={row.link}
                        className="earlybird-75WWnp text-md text-black transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold"
                      >
                        {row.label}
                      </a>
                    </div>
                  ))}
                </div>
                <div className="earlybird-RaAPe3 flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                  <p className="earlybird-1nRgqm text-md text-black transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold tracking-tight">
                    {footer.copyright}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

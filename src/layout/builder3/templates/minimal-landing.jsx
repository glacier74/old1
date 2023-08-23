import { Form, Icon, Image } from '@earlybirdim/components'

export const schemas = [
  {
    name: 'header',
    title: 'Header',
    fields: [
      {
        name: 'brand_name',
        title: 'Brand name',
        type: 'text',
        default: 'EarlyBird'
      },
      {
        name: 'cta1',
        title: 'Call-to-action',
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'text',
            default: 'Sign up'
          },
          {
            name: 'url',
            title: 'Link',
            type: 'text',
            default: '#'
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
        title: 'Title',
        type: 'html',
        default: 'Create landing pages that converts',
        ai: true
      },
      {
        name: 'subtitle',
        title: 'Subtitle',
        type: 'html',
        default:
          'Your ideas have the potential to be worth millions, and you can start without any technical knowledge!',
        max_words: 24,
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
            default: '🚀 Get started for free',
            ai: true
          },
          {
            name: 'url',
            title: 'Link',
            type: 'text',
            default: 'https://earlybird.im/sign-up'
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
            name: 'url',
            title: 'Link',
            type: 'text',
            default: 'https://earlybird.im'
          }
        ]
      },
      {
        name: 'image',
        title: 'Hero Image',
        type: 'image',
        default: 'https://earlybird.b-cdn.net/template-assets/Minimal_Landing.png'
      }
    ]
  },
  {
    name: 'features',
    title: 'Features',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'html',
        default: 'Features'
      },
      {
        name: 'feature_list',
        title: 'Feature List',
        type: 'list',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'text',
            primary: true,
            max_words: 5,
            ai: true
          },
          {
            name: 'subtitle',
            title: 'Subtitle',
            type: 'text',
            max_words: 20,
            ai: true
          }
        ],
        default: [
          {
            title: 'Start with a template',
            subtitle: 'Choose your ideal template and effortlessly build a landing page.'
          },
          {
            title: 'Copywriting from the wise',
            subtitle:
              'Tap into the potential of AI for generating engaging copy for your landing page. '
          },
          {
            title: 'Fully responsive',
            subtitle:
              'Every landing page is set to be responsive and looks great on all devices, ensuring accessibility for everyone.'
          },
          {
            title: 'Text formatting',
            subtitle:
              'Easily add headings, links, paragraphs, and apply various text styles, including bold, italic, underline, etc.'
          },
          {
            title: 'SEO ready',
            subtitle:
              'All landing pages are optimized for search engines by default, and you can customize the SEO fields to suit your specific needs.'
          },
          {
            title: 'Private mode',
            subtitle:
              'Restrict access to your landing pages by keeping them password-protected for a select group of users.'
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
        default: 'Be the first to receive our latest updates',
        max_words: 10,
        ai: true
      },
      {
        name: 'placeholder',
        title: 'Placeholder',
        type: 'text',
        default: 'Enter email address',
        max_words: 4,
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
        default: '© 2023 Earlybird Inc.'
      },
      {
        name: 'socials',
        title: 'Socials',
        type: 'list',
        fields: [
          {
            name: 'icon',
            title: 'Icon',
            type: 'icon'
          },
          {
            name: 'link',
            title: 'Link',
            type: 'text'
          }
        ],
        default: [
          {
            icon: 'brand-twitter',
            link: 'https://twitter.com'
          },
          {
            icon: 'brand-linkedin',
            link: 'https://www.linkedin.com'
          },
          {
            icon: 'brand-github',
            link: 'http://www.instagram.com'
          }
        ]
      }
    ]
  }
]

export function render({ options: { header, hero, features, newsletter, footer } }) {
  return (
    <div>
      <div>
        <main className={`earlybird-wcl9tu bg-zinc-50 text-slate-950`}>
          <div id="header" className="earlybird-FzPE8l border-b border-slate-950">
            <div className="earlybird-wJtwh2 max-w-5xl mx-auto h-[60px] flex items-center justify-between px-5">
              <a href="/" className="earlybird-yEjDuL flex items-center gap-2">
                <span className="earlybird-qHCUrE text-xl whitespace-nowrap font-bold">
                  {header.brand_name}
                </span>
              </a>

              <a
                href={header.cta1.url}
                className="earlybird-iqvy1J flex items-center gap-2 py-2 bg-slate-950 text-slate-50 px-6 rounded-md"
              >
                <span>{header.cta1.title}</span>
              </a>
            </div>
          </div>

          <div id="hero" className="earlybird-8UpJHb max-w-5xl mx-auto my-24 px-5">
            <div className="earlybird-CEuNdx flex flex-wrap items-center">
              <div className="earlybird-Y6qLQO max-w-md mb-8 w-full md:w-1/2">
                <h1 className="earlybird-qf8Zph text-4xl font-extrabold mb-5">{hero.title}</h1>
                <p className="earlybird-dGehra text-lg md:text-xl text-slate-500">
                  {hero.subtitle}
                </p>

                <div className="earlybird-0yRjHM flex items-center gap-4 mt-4">
                  <button className="earlybird-8u4Quz flex items-center gap-2 py-3 bg-slate-950 px-6 rounded-md">
                    <span className="earlybird-KVT5ZY text-slate-50">{hero.cta1.title}</span>
                  </button>

                  <a href={hero.cta2.url} className="earlybird-WqWTZ3 text-slate-950 font-medium">
                    <span className="">{hero.cta2.title}</span>
                  </a>
                </div>
              </div>

              <div className="earlybird-CAHajc w-full md:w-1/2 justify-center items-center">
                <Image
                  src={hero.image}
                  loading="lazy"
                  width={500}
                  decoding="async"
                  className="earlybird-uok0iT w-full"
                />
              </div>
            </div>
          </div>

          <div id="features" className="earlybird-PKV16p max-w-5xl mx-auto my-24 px-5">
            <div className="">
              <h1 className="earlybird-SZzPeR text-2xl leading-[1.25] font-bold mb-6">
                {features.title}
              </h1>

              <div className="earlybird-nmAu9f grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
                {features.feature_list.map((row, index) => (
                  <div
                    key={index}
                    className="earlybird-vskMlx p-5 border border-slate-950 rounded-md shadow-sm"
                  >
                    <h4 className="earlybird-WzInqh text-base mb-2 font-semibold">{row.title}</h4>
                    <p className="earlybird-s2Otcf text-[.875rem]">{row.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div id="newsletter" className="earlybird-RgxkZ1 sm:max-w-3xl mx-auto px-8 mb-16">
            <h3 className="earlybird-7q127M text-2xl font-medium mb-8 text-center">
              {newsletter.headline}
            </h3>
            <div className="earlybird-hBI4NF max-w-md mx-auto">
              <Form
                className="earlybird-rSzuDp  flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 border-slate-300"
                {...newsletter.form}
              >
                <Form.Item name="email" required={true} className="earlybird-eYpfJo flex-grow">
                  <Form.Input
                    type="email"
                    className="earlybird-gK6WzW  bg-transparent w-full h-10 rounded-md px-4 py-2 border border-slate-300/80"
                    placeholder={newsletter.placeholder}
                  />
                </Form.Item>
                <Form.Button className="earlybird-rGIr7g relative w-full sm:w-auto h-10 rounded-md px-5 py-1 bg-slate-950 text-white">
                  {newsletter.form.button_text}
                </Form.Button>
              </Form>
            </div>
          </div>

          <div id="footer" className="earlybird-3Yj1XV border-t border-slate-950">
            <div className="earlybird-gmqIvy max-w-5xl mx-auto py-8 flex items-center justify-between px-5">
              <span className="earlybird-NauSRQ text-slate-500">
                <p
                  className="earlybird-T8ntlb text-base"
                  dangerouslySetInnerHTML={{ __html: footer.copyright }}
                />
              </span>

              <div className="earlybird-XTvTXs flex items-center gap-2">
                {footer.socials.map((item, key) => (
                  <a
                    key={key}
                    href={item.link}
                    target="_blank"
                    className="earlybird-49lBm1 rounded-full flex items-center justify-center"
                  >
                    <Icon name={item.icon} className="earlybird-UVAMAl w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

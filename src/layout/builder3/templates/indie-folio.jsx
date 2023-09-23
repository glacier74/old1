import { Form, Icon, Image } from '@earlybirdim/components'

export const schemas = [
  {
    name: 'profile',
    title: 'Profile',
    fields: [
      {
        name: 'profile_logo',
        title: 'Profile Logo',
        type: 'image',
        default: 'https://earlybird.b-cdn.net/template-assets/luo.jpeg'
      },
      {
        name: 'profile_name',
        title: 'Profile Name',
        type: 'text',
        default: 'Luo Baishun'
      },
      {
        name: 'profile_desc',
        title: 'Profile Description',
        type: 'text',
        default: 'Bootstrapped Indie Hakcer'
      },
      {
        name: 'profile_desc_long',
        title: 'Profile Long Description',
        type: 'text',
        default:
          'I strive to inspire and spread positivity, infusing everything I do with passion and a personal touch. Join me on this transformative journey as we bring fresh perspectives and innovative design solutions to the table.'
      },
      {
        name: 'social_links',
        title: 'Social Links',
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
            icon: 'brand-x',
            link: 'https://twitter.com/LuoBaishun'
          },
          {
            icon: 'brand-linkedin',
            link: 'https://www.linkedin.com/in/luobaishun/'
          }
        ]
      }
    ]
  },
  {
    name: 'products',
    title: 'Products',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'text',
        default: 'My Products'
      },
      {
        name: 'list',
        title: 'List',
        type: 'list',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'text'
          },
          {
            name: 'desc',
            title: 'Desc',
            type: 'text'
          },
          {
            name: 'status',
            title: 'Status',
            options: [
              {
                label: 'Active',
                value: 'Active'
              },
              {
                label: 'Paused',
                value: 'Paused'
              },
              {
                label: 'Acquired',
                value: 'Acquired'
              },
              {
                label: 'Discontinued',
                value: 'Discontinued'
              }
            ]
          },
          {
            name: 'link',
            title: 'Link',
            type: 'text'
          },
          {
            name: 'image',
            title: 'Image',
            type: 'text'
          }
        ],
        default: [
          {
            title: 'EarlyBid',
            desc: 'No-code landing page builder for idea validation',
            status: 'Active',
            link: 'https://earlybird.im',
            image: 'https://earlybird.b-cdn.net/template-assets/earlybird.png'
          },
          {
            title: 'TinySnap',
            desc: 'Production-ready screenshot tool',
            status: 'Active',
            link: 'https://tinysnap.app',
            image: 'https://earlybird.b-cdn.net/template-assets/tinysnap.png'
          },
          {
            title: 'HeyForm',
            desc: 'No-code online form builder',
            status: 'Active',
            link: 'https://heyform.net',
            image: 'https://earlybird.b-cdn.net/template-assets/heyform.png'
          },
          {
            title: 'RewriteWise',
            status: 'Paused',
            desc: 'AI-powered Telegram bot for social media content',
            link: 'https://rewritewise.com',
            image: 'https://earlybird.b-cdn.net/template-assets/rewritewise.png'
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
        default: 'Be the first to know when I launch new product.'
      },
      {
        name: 'description',
        title: 'Description',
        type: 'html',
        default:
          'Subscribe now for hand-pickerd holiday deals, inspiration and the latest tips, straight to your inbox.'
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
            default: 'Subscribe'
          }
        ]
      }
    ]
  }
]

export function render({ options: { profile, products, newsletter } }) {
  return (
    <div>
      <div className="earlybird-KJC8FI antialiased font-[Inter] bg-white">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap"
        />
        <div className="earlybird-P2OOI4 p-6 py-8 max-w-7xl mx-auto">
          <div className="earlybird-VrDC9W relative grid md:grid-cols-3 gap-6 mt-12">
            <div className="earlybird-HSY8kz relative">
              <div className="earlybird-ELhxa2 sticky top-6 space-y-6">
                <div
                  id="profile"
                  className="earlybird-2NP1u6 bg-white px-6 py-8 rounded-2xl text-slate-900 border border-slate-300/50 shadow-sm mb-8"
                >
                  <Image
                    alt={profile.profile_name}
                    src={profile.profile_logo}
                    width={80}
                    height={80}
                    decoding="async"
                    className="earlybird-NiD4ph bg-sky-200 rounded-full"
                  />
                  <div className="earlybird-RB9Elq mt-3">
                    <p className="earlybird-4ptqS7 text-2xl font-bold">{profile.profile_name}</p>
                    <p className="earlybird-WCzC7b text-slate-700">{profile.profile_desc}</p>
                    <div className="earlybird-1angkx mt-4 text-slate-500 leading-relaxed">
                      {profile.profile_desc_long}
                    </div>
                    <div className="earlybird-sqQX0Z mt-4">
                      <div className="earlybird-nNYh2E flex items-center gap-4">
                        {profile.social_links.map((item, key) => (
                          <a
                            key={key}
                            href={item.link}
                            className="earlybird-2zkA8G group inline-flex items-center justify-center"
                          >
                            <Icon
                              name={item.icon}
                              className="earlybird-Gu0G5k h-6 w-6 text-slate-700"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div id="newsletter" className="earlybird-LlU0Bq mt-4">
                  <h3 className="earlybird-mZ6JEc font-medium mb-3">{newsletter.headline}</h3>
                  <Form
                    className="earlybird-46FCAp flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 border-slate-300"
                    {...newsletter.form}
                  >
                    <Form.Item name="email" required={true} className="earlybird-J7PKat flex-grow">
                      <Form.Input
                        type="email"
                        className="earlybird-nw0ugn w-full h-10 rounded-md px-4 py-2 border border-slate-300"
                        placeholder="Enter email address"
                      />
                    </Form.Item>
                    <Form.Button className="earlybird-OCkKxa relative w-full sm:w-auto h-10 rounded-md px-5 py-1 bg-emerald-500 text-white">
                      {newsletter.form.button_text}
                    </Form.Button>
                  </Form>
                </div>
              </div>
            </div>
            <div id="products" className="earlybird-LVWr93 md:col-span-2">
              <div>
                <h2 className="earlybird-7TIfXp text-2xl font-medium" id="products">
                  {products.title}
                </h2>
                <div className="earlybird-otGKwM my-3 grid md:grid-cols-2 gap-6">
                  {products.list.map((item, key) => (
                    <a
                      key={key}
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.title}
                      className="earlybird-octMLM group rounded-2xl border border-slate-300/60 overflow-hidden flex flex-col justify-between"
                    >
                      <div className="earlybird-J9AkfK p-6">
                        <div className="earlybird-5PYRSL mb-3 flex items-center justify-between">
                          <p className="earlybird-QHHKqb text-lg font-medium">{item.title}</p>

                          {(() => {
                            switch (item.status) {
                              case 'Active':
                                return (
                                  <div className="earlybird-bEHKJE group inline-flex items-center justify-center gap-1 px-3 py-1 text-xs bg-emerald-500 shadow-md text-white rounded-2xl">
                                    {item.status}
                                  </div>
                                )

                              case 'Paused':
                                return (
                                  <div className="earlybird-xgz1bv group inline-flex items-center justify-center gap-1 px-3 py-1 text-xs bg-orange-500 shadow-md text-white rounded-2xl">
                                    {item.status}
                                  </div>
                                )

                              case 'Acquired':
                                return (
                                  <div className="earlybird-GVg8Ks group inline-flex items-center justify-center gap-1 px-3 py-1 text-xs bg-blue-500 shadow-md text-white rounded-2xl">
                                    {item.status}
                                  </div>
                                )

                              case 'Discontinued':
                                return (
                                  <div className="earlybird-lZKD4m group inline-flex items-center justify-center gap-1 px-3 py-1 text-xs bg-slate-700 shadow-md text-white rounded-2xl">
                                    {item.status}
                                  </div>
                                )

                              default:
                                return null
                            }
                          })()}
                        </div>
                        <p className="earlybird-ctTLTR text-sm text-slate-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <div className="earlybird-oczFmb w-full h-60 bg-slate-100">
                        <Image
                          className="earlybird-c15brc w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          src={item.image}
                          width={400}
                          height={240}
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

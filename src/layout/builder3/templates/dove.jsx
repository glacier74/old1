import { Form, Icon, Image } from '@earlybirdim/components'
import { Fragment } from 'react'

export const schemas = [
  {
    name: 'user_info',
    title: 'User Information',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'text',
        default: 'Luo Baishun'
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        default: 'Proud dadpreneur building bootstrapped micro SaaS products.'
      },
      {
        name: 'location',
        title: 'Location',
        type: 'text',
        default: '📍 San Francisco, US'
      },
      {
        name: 'avatar',
        title: 'Avatar',
        type: 'image',
        default: 'https://earlybird.b-cdn.net/template-assets/luo.jpeg'
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
        default: 'Products'
      },
      {
        name: 'list',
        title: 'List',
        type: 'list',
        fields: [
          {
            name: 'image',
            title: 'Image',
            type: 'image'
          },
          {
            name: 'title',
            title: 'Title',
            type: 'text',
            primary: true
          },
          {
            name: 'description',
            title: 'Description',
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
          }
        ],
        default: [
          {
            image: 'https://earlybird.b-cdn.net/template-assets/EarlyBird-icon.png',
            title: 'EarlyBird',
            description: 'The best no-code landing page builder that captures early adopters',
            status: 'Active',
            link: 'https://earlybird.im'
          },
          {
            image: 'https://earlybird.b-cdn.net/template-assets/HeyForm-icon.png',
            title: 'HeyForm',
            description: 'Build user-focused forms that drive impactful results',
            status: 'Active',
            link: 'https://heyform.net'
          },
          {
            image: 'https://earlybird.b-cdn.net/template-assets/TinySnap-icon.png',
            title: 'TinySnap',
            description: 'Make beautiful screenshots without any design skills',
            status: 'Active',
            link: 'https://tinysnap.app'
          }
        ]
      }
    ]
  },
  {
    name: 'subscribe',
    title: 'Subscribe',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'text',
        default: 'Subscribe for updates'
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        default: 'Be the first to know when I launch new product.'
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
  },
  {
    name: 'follow_me',
    title: 'Follow Me',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'text',
        default: 'Follow Me'
      },
      {
        name: 'list',
        title: 'List',
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
            link: 'https://twitter.com/nurpraditya'
          },
          {
            icon: 'brand-instagram-line',
            link: 'https://instagram.com/'
          },
          {
            icon: 'brand-dribbble-line',
            link: 'https://dribbble.com/nurpraditya'
          },
          {
            icon: 'brand-linkedin',
            link: 'https://linkedin.com/'
          }
        ]
      }
    ]
  }
]

export function render({ options: { user_info, products, subscribe, follow_me } }) {
  return (
    <Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: `.button-shadow {
box-shadow: 0px 1px 1px 0px rgba(102, 109, 128, 0.08), 0px 4px 8px 0px rgba(102, 109, 128, 0.2), 0px 0px 0px 0px #fff /* {"name":"White"} */, 0px 0px 0px 0px rgba(53, 56, 73, 0.16);
}

.main-content {
box-shadow: 0 1.267198085784912px 1.267198085784912px #666d8014, 0 5.068792343139648px 10.137584686279297px #666d8014;
}

.follow-shadow {
box-shadow: 0px 1px 1px 0px rgba(102, 109, 128, 0.08), 0px 4px 6px 0px rgba(102, 109, 128, 0.06), 0px 0px 0px 0px #fff /* {"name":"White"} */, 0px 0px 0px 0px rgba(53, 56, 73, 0.16);
}

.avatar-shadow {
box-shadow: rgb(236, 239, 244) 0px 0px 0px 2.22222px;
}

.project-card-shadow {
box-shadow: 0px 1px 1px 0px rgba(102, 109, 128, 0.08), 0px 4px 8px 0px rgba(102, 109, 128, 0.08), 0px 0px 0px 0px #fff /* {"name":"White"} */, 0px 0px 0px 3px rgba(53, 56, 73, 0);
}

`
        }}
      />
      <div>
        <div>
          <div className="earlybird-4gHmZ1 antialiased font-[Inter] bg-white">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap"
            />
            <div className="earlybird-muRDDY min-h-screen px-2 pt-24 pb-10 bg-slate-50 flex flex-col items-center">
              <div className="earlybird-KlKSzb main-content max-w-2xl w-full bg-white rounded-xl pt-8 pb-2 px-2">
                <div className="earlybird-t85i3O pb-10 px-6">
                  <div className="earlybird-A75me4 flex flex-col-reverse md:flex-row items-center md:justify-between justify-center">
                    <div className="earlybird-DHyLIP flex flex-col md:items-start items-center md:text-start text-center">
                      <h1 className="earlybird-6LHEan text-3xl font-semibold text-slate-950">
                        {user_info.name}
                      </h1>
                      <p className="earlybird-J1x8Eh mt-2 text-slate-500">
                        {user_info.description}
                      </p>
                      <p className="earlybird-Ibor8Y text-xs mt-4">{user_info.location}</p>
                    </div>
                    <div className="earlybird-9bTgkS w-[178px] h-[178px] flex items-center justify-center md:mb-0 mb-3">
                      <div className="earlybird-iey86X w-40 h-40 border- avatar-shadow rounded-full p-2">
                        <Image
                          src={user_info.avatar}
                          className="earlybird-7Y3z5c rounded-full"
                          width={144}
                          height={144}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="earlybird-zdxwc2 mt-2 bg-slate-50 p-6 rounded-xl">
                  <div className="earlybird-DOjZjs flex items-center mb-6">
                    <p className="earlybird-F9cYSS text-xl leading-none font-bold text-slate-900">
                      {products.title}
                    </p>
                  </div>
                  <div className="earlybird-XzhtE8 flex flex-col gap-3">
                    {products.list.map((item, key) => (
                      <a
                        href={item.link}
                        key={key}
                        target="_blank"
                        className="earlybird-aAcSnx bg-white p-4 flex justify-between items-center group rounded-xl border border-slate-100 project-card-shadow"
                      >
                        <div className="earlybird-tmRXTm flex items-center">
                          <div className="earlybird-kkVYil w-10 h-10 flex items-center justify-center border border-slate-100 rounded-full sm:mr-4 mr-1">
                            <Image
                              src={item.image}
                              className="earlybird-LWV68P rounded-full w-8 h-8"
                              alt={item.title}
                            />
                          </div>
                          <div className="earlybird-JYwyCI flex flex-col">
                            <h3 className="earlybird-IqDZiB sm:text-xl text-lg text-slate-900">
                              {item.title}
                            </h3>
                            <p className="earlybird-lFkfX3 hidden sm:block text-xs text-slate-500">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="earlybird-fOH0GH flex justify-center items-center">
                          {(() => {
                            const commonClasses =
                              'group inline-flex items-center justify-center gap-1 sm:px-4 px-2 py-1 shadow-md sm:text-sm text-xs text-white rounded-md mr-2'

                            switch (item.status) {
                              case 'Active':
                                return (
                                  <div
                                    className={`earlybird-L7O7UC ${commonClasses} bg-emerald-500`}
                                  >
                                    {item.status}
                                  </div>
                                )

                              case 'Paused':
                                return (
                                  <div
                                    className={`earlybird-D0qfdb ${commonClasses} bg-orange-500`}
                                  >
                                    {item.status}
                                  </div>
                                )

                              case 'Acquired':
                                return (
                                  <div className={`earlybird-YO8w5F ${commonClasses} bg-blue-500`}>
                                    {item.status}
                                  </div>
                                )

                              case 'Discontinued':
                                return (
                                  <div className={`earlybird-IePK57 ${commonClasses} bg-slate-700`}>
                                    {item.status}
                                  </div>
                                )

                              default:
                                return null
                            }
                          })()}
                          <Icon
                            name="arrow-up-right-line"
                            className="earlybird-Xb1AO0 transition-all duration-300 text-slate-400 group-hover:text-slate-500 group-hover:translate-x-1 w-5 h-5 group-hover:-translate-y-1"
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="earlybird-JnUbBQ mt-2 py-12 px-2 text-center">
                  <h1 className="earlybird-ogs8Y3 sm:text-3xl text-2xl font-bold text-slate-900">
                    {subscribe.title}
                  </h1>
                  <p className="earlybird-JbeB9t sm:text-lg text-slate-500 mt-3">
                    {subscribe.description}
                  </p>
                  <div className="earlybird-AZyzHS flex justify-center gap-3 mt-6">
                    <Form
                      className="earlybird-uAxYB5 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 border-slate-300"
                      {...subscribe.form}
                    >
                      <Form.Item
                        name="email"
                        required={true}
                        className="earlybird-7OESIb flex-grow"
                      >
                        <Form.Input
                          type="email"
                          className="earlybird-OCb9Hm w-full h-10 rounded-md px-4 py-2 border border-slate-300"
                          placeholder="Enter email address"
                        />
                      </Form.Item>
                      <Form.Button className="earlybird-ZRFbOl relative w-full sm:w-auto h-10 rounded-md px-5 py-1 bg-emerald-500 text-white">
                        {subscribe.form.button_text}
                      </Form.Button>
                    </Form>
                  </div>
                </div>
                <div className="earlybird-Oy2n9G mt-2 bg-slate-50 p-6 rounded-xl flex justify-between items-center">
                  <div className="earlybird-3zk33U flex items-center">
                    <p className="earlybird-q963aB sm:text-lg leading-none font-medium text-slate-900">
                      {follow_me.title}
                    </p>
                  </div>
                  <div className="earlybird-gbkFPI flex items-center gap-3">
                    {follow_me.list.map((item, key) => (
                      <a
                        href={item.link}
                        target="_blank"
                        key={key}
                        className="earlybird-ysF2il sm:w-10 sm:h-10 w-8 h-8 bg-white flex justify-center items-center rounded-full follow-shadow"
                      >
                        <Icon
                          name={item.icon}
                          className="earlybird-NINjPi sm:w-5 sm:h-5 w-4 h-4 text-slate-700"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

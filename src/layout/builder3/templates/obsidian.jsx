import { Form, Icon, Image, Toggle, clsx } from '@earlybirdim/components'
import { Fragment } from 'react'

export const schemas = [
  {
    name: 'banner_image',
    title: 'Banner Image',
    type: 'image',
    default:
      'https://images.unsplash.com/photo-1524275804141-5e9f2bc5a71d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'user_info',
    title: 'User Info',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'text',
        default: 'Liam Taylor'
      },
      {
        name: 'location',
        title: 'Location',
        type: 'text',
        default: '📍 San Francisco, US'
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
            icon: 'brand-twitter-line',
            link: 'https://twitter.com/'
          },
          {
            icon: 'brand-instagram-line',
            link: 'https://instagram.com/'
          },
          {
            icon: 'brand-linkedin-line',
            link: 'https://linkedin.com/'
          },
          {
            icon: 'brand-github-line',
            link: 'https://github.com/'
          }
        ]
      }
    ]
  },
  {
    name: 'buttons',
    title: 'Buttons',
    fields: [
      {
        name: 'contact_me',
        title: 'Contact me',
        type: 'object',
        fields: [
          {
            name: 'label',
            title: 'Label',
            type: 'text',
            default: 'Contact me'
          },
          {
            name: 'icon',
            title: 'Icon',
            type: 'icon',
            default: 'mail-line'
          }
        ]
      },
      {
        name: 'subscribe',
        title: 'Subscribe',
        type: 'object',
        fields: [
          {
            name: 'label',
            title: 'Label',
            type: 'text',
            default: 'Subscribe for updates'
          },
          {
            name: 'icon',
            title: 'Icon',
            type: 'icon',
            default: 'plus-line'
          }
        ]
      }
    ]
  },
  {
    name: 'products',
    title: 'Products',
    type: 'list',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'text'
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image'
      },
      {
        name: 'link',
        title: 'Link',
        type: 'text'
      }
    ],
    default: [
      {
        title: 'EaryBird',
        image: 'https://earlybird.b-cdn.net/template-assets/earlybird.png',
        link: 'https://earlybird.im'
      },
      {
        title: 'HeyForm',
        image: 'https://earlybird.b-cdn.net/template-assets/heyform.png',
        link: 'https://heyform.net'
      },
      {
        title: 'TinySnap',
        image: 'https://earlybird.b-cdn.net/template-assets/tinysnap.png',
        link: 'https://tinysnap.app'
      },
      {
        title: 'RewriteWise',
        image: 'https://earlybird.b-cdn.net/template-assets/rewritewise.png',
        link: 'https://rewritewise.com'
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
        type: 'text',
        default: 'Subscribe to my updates'
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

export function render({ options: { banner_image, user_info, buttons, products, newsletter } }) {
  return (
    <Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: `.button::after {
content: "";
background: #e0e2e5;
opacity: 0;
transform: scale(0);
position: absolute;
left: 0;
right: 0;
top: 0;
bottom: 0;
border-radius: inherit;
transition: all 0.2s;
}

.button:hover::after {
opacity: 0.05;
transform: scale(1);
}

`
        }}
      />
      <div>
        <div>
          <div className="earlybird-vtE076 antialiased font-[Inter] bg-white">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap"
            />
            <Toggle>
              {(isActive, toggle) => (
                <div className="earlybird-s1N2qX bg-slate-900 min-h-screen">
                  <div
                    className={clsx(
                      'earlybird-VLVV0n',
                      'fixed top-0 left-0 right-0 bottom-0 text-white bg-slate-900 z-50 p-8 transition-all duration-300',
                      isActive ? 'opacity-100 visible' : 'opacity-0 invisible'
                    )}
                  >
                    <div className="earlybird-15KrPD flex justify-end items-center">
                      <Icon
                        name="multiply-line"
                        className="earlybird-uXxxBT cursor-pointer"
                        onClick={toggle}
                      />
                    </div>
                    <div className="earlybird-voKov5 w-full h-full flex flex-col items-center justify-center">
                      <h1 className="earlybird-xs5LfE text-4xl mb-10 font-bold text-center">
                        {newsletter.headline}
                      </h1>
                      <Form
                        className="earlybird-irznbm max-w-[380px] w-[95%] mx-auto"
                        {...newsletter.form}
                      >
                        <Form.Item
                          name="name"
                          required={true}
                          className="earlybird-zhMsdS w-full mb-4"
                        >
                          <Form.Input
                            type="text"
                            placeholder="username@example.com"
                            className="earlybird-aDw98o w-full bg-transparent border rounded-md border-slate-50 h-12 px-4 text-sm leading-none"
                          />
                        </Form.Item>
                        <Form.Button className="earlybird-YWCgP9 bg-emerald-400 rounded-md w-full h-10 text-sm font-semibold text-slate-950">
                          {newsletter.form.button_text}
                        </Form.Button>
                      </Form>
                    </div>
                  </div>
                  <div className="earlybird-VsHeNC lg:h-[400px] md:h-[300px] h-[200px] transition-all duration-300">
                    <Image
                      src={banner_image}
                      width={9999}
                      height={200}
                      className="earlybird-HeZyA6 h-full w-full object-cover"
                    />
                  </div>
                  <div className="earlybird-zTGBaB max-w-[380px] text-center w-[95%] m-auto text-[#e0e2e5] py-10">
                    <h1 className="earlybird-dCT6dp text-[41px] font-bold mb-4">
                      {user_info.name}
                    </h1>
                    <p className="earlybird-axlFDl text-base mb-4">{user_info.location}</p>
                    <div className="earlybird-BPA7Ge flex gap-[22px] justify-center items-center mb-11">
                      {user_info.socials.map((item, key) => (
                        <a
                          href={item.link}
                          key={key}
                          target="_blank"
                          className="earlybird-tzJJJy h-7 w-7 flex items-center justify-center"
                        >
                          <Icon name={item.icon} className="earlybird-dBa1wx w-5 h-5" />
                        </a>
                      ))}
                    </div>
                    <div className="earlybird-t3P3GD flex flex-col gap-3 mb-11">
                      <button className="earlybird-xsxucp bg-emerald-400 px-[26px] flex items-center h-[47px] justify-center rounded-md relative button text-slate-950">
                        <span className="earlybird-j5zI1I mr-3">
                          <Icon
                            name={buttons.contact_me.icon}
                            className="earlybird-MzegNE w-5 h-5"
                          />
                        </span>
                        <span className="earlybird-Bsxoud text-base font-semibold">
                          {buttons.contact_me.label}
                        </span>
                      </button>
                      <button
                        className="earlybird-vBFLYv w-full bg-white px-6 flex items-center h-[47px] justify-center rounded-md relative button text-slate-950"
                        onClick={toggle}
                      >
                        <span className="earlybird-mh2tS0 mr-3">
                          <Icon
                            name={buttons.subscribe.icon}
                            className="earlybird-2FfhLz w-5 h-5"
                          />
                        </span>
                        <span className="earlybird-fq3NY6 text-base font-semibold">
                          {buttons.subscribe.label}
                        </span>
                      </button>
                    </div>
                    <div className="earlybird-6Hux87 flex flex-col gap-6">
                      {products.map((item, key) => (
                        <a
                          href={item.link}
                          key={key}
                          target="_blank"
                          className="earlybird-0L6d1p rounded-xl overflow-hidden relative button"
                        >
                          <div className="earlybird-TfEpbM h-64">
                            <Image
                              src={item.image}
                              width={380}
                              height={256}
                              className="earlybird-XzbHOw h-full w-full object-cover"
                            />
                          </div>
                          <div className="earlybird-pAzxlH bg-slate-800/70 h-12 flex items-center justify-center text-base font-bold">
                            {item.title}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Toggle>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

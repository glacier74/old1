import { Form, Icon, Image } from '@earlybirdim/components'
import { Fragment } from 'react'

export const schemas = [
  {
    name: 'header',
    title: 'Header',
    fields: [
      {
        name: 'avatar',
        title: 'Avatar',
        type: 'image',
        default: 'https://storage.earlybird.im/examples/logo.png?v=2'
      },
      {
        name: 'product_name',
        title: 'Product name',
        type: 'text',
        default: 'CashFlow'
      },
      {
        name: 'subheadline',
        title: 'Subheadline',
        type: 'text',
        default: 'Stay informed about our latest updates'
      }
    ]
  },
  {
    name: 'subscribe',
    title: 'Subscribe',
    fields: [
      {
        name: 'form',
        title: 'Form',
        type: 'email_capture',
        fields: [
          {
            name: 'button_text',
            title: 'Button text',
            type: 'text',
            default: 'Join the waitlist'
          }
        ]
      }
    ]
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
        icon: 'brand-x-line',
        url: ''
      },
      {
        icon: 'brand-facebook-line',
        url: ''
      },
      {
        icon: 'brand-instagram-line',
        url: ''
      },
      {
        icon: 'brand-linkedin-line',
        url: ''
      },
      {
        icon: 'brand-youtube-line',
        url: ''
      }
    ]
  }
]

export function render({ options: { header, subscribe, socials } }) {
  return (
    <Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: `.bg-light {
background-image: radial-gradient(70% 35% at 50% 0, #fff 60%, transparent), radial-gradient(45% 45% at 50% 20%, #fff 25%, transparent), linear-gradient(112.1deg, #feffee 7.68%, #d9f0ff 81.07%);
}

.bg-dark {
background: radial-gradient(52.56% 52.56% at 50% 117.61%,#1c1c21 0,rgba(28,28,33,0) 100%),radial-gradient(63.94% 63.94% at 50% 0,#1c1c21 0,rgba(28,28,33,0) 78.13%),#07070d
}

`
        }}
      />
      <div>
        <div>
          <div className="earlybird-iZNuk6 bg-light antialiased font-sans flex items-center justify-center w-screen h-screen">
            <div className="earlybird-0taVrs max-w-2xl px-8 py-6">
              <div id="header">
                <Image
                  className="earlybird-rVDmRK h-24 w-24 mx-auto lg:h-32 lg:w-32 rounded-full border border-white/10 mb-8"
                  src={header.avatar}
                  width={128}
                  height={128}
                  loading="lazy"
                />
                <div className="earlybird-l51k33 text-center">
                  <h2 className="earlybird-HnOJua text-3xl lg:text-5xl text-slate-900 font-bold leading-tight">
                    <span className="earlybird-HXptD4 block">Join the waitlist for</span>
                    <span className="earlybird-TYX63F block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400">
                      {header.product_name}
                    </span>
                  </h2>
                  <p className="earlybird-WBZkdB mt-4 text-base text-slate-500">
                    {header.subheadline}
                  </p>
                </div>
              </div>

              <div className="earlybird-d2fgt6 mt-8 max-w-sm mx-auto">
                <Form id="form" {...subscribe.form}>
                  <div className="earlybird-lsbzn3 flex flex-col mb-6 space-y-3">
                    <Form.Item name="name">
                      <Form.Input
                        className="earlybird-KV1a70 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
                        type="text"
                        placeholder="Your Name"
                      />
                    </Form.Item>

                    <Form.Item name="email">
                      <Form.Input
                        className="earlybird-sLwthS appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
                        type="email"
                        placeholder="Your Email"
                      />
                    </Form.Item>
                  </div>
                  <div className="earlybird-if4sZE flex justify-center mt-6">
                    <Form.Button
                      rootClassName="earlybird-EBF9kL w-full"
                      className="earlybird-3HJHpE w-full px-4 py-4 bg-slate-900 dark:bg-emerald-500 text-white text-sm font-medium rounded-md focus:outline-none"
                    >
                      {subscribe.form.button_text}
                    </Form.Button>
                  </div>
                </Form>

                <div id="socials" className="earlybird-oyGFdZ mt-12 flex justify-center">
                  <ul className="earlybird-EukmC3 flex flex-row gap-4 text-slate-700 dark:text-slate-300">
                    {socials.map((row, index) => (
                      <li key={index} className="earlybird-M92YwO text-xl">
                        <a href={row.url}>
                          <Icon className="earlybird-LyKHRU w-5 h-5" name={row.icon} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

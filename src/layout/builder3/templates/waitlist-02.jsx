import { Form, Icon } from '@earlybirdim/components'
import React from 'react'

export const schemas = [
  {
    name: 'product_info',
    title: 'Personal Information',
    fields: [
      {
        name: 'name',
        title: 'User Name',
        type: 'text',
        default: 'Waitlist Demo',
        ai: true
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
            icon: 'brand-x-line',
            link: 'https://twitter.com/EarlyBirdIM'
          }
        ]
      },
      {
        name: 'title',
        title: 'Title',
        type: 'text',
        default: 'I build tiny but cool things.',
        ai: true
      },
      {
        name: 'screenshot',
        title: 'Screenshot',
        type: 'image',
        default: 'https://storage.earlybird.im/examples/hero-02.png'
      }
    ]
  },
  {
    name: 'waitlist',
    title: 'Waitlist',
    fields: [
      {
        name: 'form',
        title: 'Waitlist settings',
        type: 'email_capture',
        fields: [
          {
            name: 'email_placeholder',
            title: 'Placeholder',
            type: 'text',
            default: 'Your email address',
            ai: true
          },
          {
            name: 'button_text',
            title: 'Button text',
            type: 'text',
            default: 'Join the waitlist',
            ai: true
          },
          {
            name: 'tip',
            title: 'Tip',
            type: 'text',
            default: 'Get notificed when we are about to launch',
            ai: true
          }
        ]
      }
    ]
  }
]

export function render({ options: { product_info, waitlist } }) {
  return (
    <React.Fragment>
      <body className="earlybird-KYAm0V bg-white">
        <div className="earlybird-zwfMaa min-h-screen flex flex-col items-center justify-center px-4">
          <header
            id="product_info"
            className="earlybird-TIxzyl w-full max-w-2xl flex justify-between items-center py-8"
          >
            <div className="earlybird-Zb8F0y text-slate-900 text-2xl font-bold">
              {product_info.name}
            </div>
            <ul className="earlybird-KPaYIa flex justify-center space-x-3 md:order-2">
              {product_info.social_links.map((row, index) => (
                <a key={index} href={row.link}>
                  <Icon name={row.icon} className="earlybird-SxCZT8 h-6 w-6" />
                </a>
              ))}
            </ul>
          </header>

          <main className="earlybird-MxPvk2 w-full max-w-2xl py-24">
            <h1
              id="product_info"
              className="earlybird-ItjWtu text-5xl font-medium text-center mb-12"
            >
              {product_info.title}
            </h1>
            <div id="waitlist">
              <Form className="earlybird-8qzKYv max-w-3xl mx-auto space-y-5" {...waitlist.form}>
                <div className="earlybird-8TZCmD flex flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-0 sm:space-x-4 justify-center">
                  <Form.Item name="email" required={true}>
                    <Form.Input
                      type="email"
                      className="earlybird-aPbgdP bg-transparent w-full h-10 rounded-md px-4 py-2 border border-slate-300/80"
                      placeholder={waitlist.form.email_placeholder}
                    />
                  </Form.Item>

                  <Form.Button className="earlybird-w6TCmo relative w-full sm:w-auto h-10 rounded-md px-5 py-1 bg-slate-950 text-white">
                    {waitlist.form.button_text}
                  </Form.Button>
                </div>
              </Form>

              <div className="earlybird-HSzyUQ text-center text-sm text-slate-600 mt-4">
                {waitlist.form.tip}
              </div>
            </div>

            <div id="product_info" className="earlybird-dOoqgQ flex justify-center">
              <Image src={product_info.screenshot} loading="lazy" decoding="async" />
            </div>
          </main>
        </div>
      </body>
    </React.Fragment>
  )
}

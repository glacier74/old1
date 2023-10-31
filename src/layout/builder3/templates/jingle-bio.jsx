import { WidgetList } from '@earlybirdim/components'
import React from 'react'

export const schemas = [
  {
    name: 'personal_info',
    title: 'Personal Information',
    fields: [
      {
        name: 'avatar',
        title: 'Avatar',
        type: 'image',
        default: 'https://storage.earlybird.im/examples/avatar-02.jpeg'
      },
      {
        name: 'name',
        title: 'User Name',
        type: 'text',
        default: '˗ˏˋrogieˎˊ'
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        default: 'Designer &amp; little big detail hunter. ½ of iconists.'
      }
    ]
  },
  {
    name: 'newsletter',
    title: 'Newsletter',
    fields: [
      {
        name: 'form',
        title: 'Subscribe Form',
        type: 'email_capture',
        fields: [
          {
            name: 'label',
            title: 'Form Label',
            type: 'text',
            default: 'Subscribe to my updates'
          },
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
    name: 'main',
    title: 'Social networks',
    fields: [
      {
        name: 'socials',
        title: 'Social networks',
        type: 'widget_list',
        default: [
          {
            type: 'group_title',
            overrides: {
              title: 'Follow Us'
            }
          },
          {
            size: '1x1',
            url: 'https://twitter.com/earlybirdim',
            overrides: {
              title: 'EarlyBird'
            }
          },
          {
            size: '1x',
            url: 'https://discord.com/invite/S6sbYd5h8G'
          },
          {
            size: '1x21',
            url: 'https://www.google.com/maps/@41.894783499999996,12.4963655,13z'
          },
          {
            size: '1x1',
            url: 'https://earlybird.im'
          },
          {
            type: 'group_title',
            overrides: {
              title: 'What we listening'
            }
          },
          {
            size: '2x2',
            url: 'https://open.spotify.com/playlist/3C64V048fGyQfCjmu9TIGA'
          },
          {
            size: '2x1',
            url: 'https://open.spotify.com/artist/6qqNVTkY8uBg9cP3Jd7DAH'
          },
          {
            size: '1x1',
            url: 'https://open.spotify.com/album/0S0KGZnfBGSIssfF54WSJh'
          },
          {
            size: '1x1',
            url: 'https://open.spotify.com/track/4HOryCnbme0zBnF8LWij3f'
          },
          {
            type: 'group_title',
            overrides: {
              title: 'What we watching'
            }
          },
          {
            size: '2x2',
            url: 'https://www.youtube.com/@LarianStudios'
          },
          {
            size: '2x2',
            url: 'https://www.tiktok.com/@larianstudios'
          },
          {
            type: 'group_title',
            overrides: {
              title: 'How we developing'
            }
          },
          {
            size: '1x1',
            url: 'https://github.com/Heyooo-Inc'
          },
          {
            size: '1x1',
            url: 'https://www.figma.com/@tailwindlabs'
          },
          {
            size: '1x1',
            url: 'https://nextjs.org/'
          },
          {
            size: '1x1',
            url: 'https://react.dev/'
          },
          {
            type: 'group_title',
            overrides: {
              title: 'How to get inspiration'
            }
          },
          {
            size: '2x1',
            url: 'https://www.figma.com/@shopify'
          },
          {
            size: '1x1',
            url: 'https://dribbble.com/halolab'
          },
          {
            size: '1x1',
            url: 'https://www.behance.net/yagofarova8709'
          }
        ]
      }
    ]
  }
]

export function render({ options: { personal_info, newsletter, main } }) {
  return (
    <React.Fragment>
      <div className="earlybird-HSqdRg min-h-screen grid lg:grid-cols-2 lg:gap-4 lg:px-24">
        <div className="earlybird-tXXVbP px-8 lg:px-32 py-12 items-center">
          <div className="earlybird-tMuH8h relative xl:sticky xl:top-16">
            <div id="personal_info">
              <div className="earlybird-KDvjAn bioAvator w-48 h-48">
                <img className="earlybird-yFaZEN rounded-full" src={personal_info.avatar} />
              </div>
              <h1 className="earlybird-q9vUAm bioName mt-8 text-5xl font-semibold">
                {personal_info.name}
              </h1>
              <p className="earlybird-LyK1vr bioIntro mt-6 text-xl text-gray-500">
                {personal_info.description}
              </p>
            </div>
            <form id="newsletter" className="earlybird-IKARQN w-full mt-8 sm:mt-32">
              <div className="earlybird-AkCu6S mb-4">
                <label className="earlybird-fw155l block text-slate-700 mb-2" htmlFor="email">
                  {newsletter.form.label}
                </label>
                <div className="earlybird-dIwDiS flex flex-col md:flex-row gap-4">
                  <input
                    className="earlybird-xtkGZT shadow appearance-none border rounded w-full md:w-72 h-10 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    placeholder="hello@example.com"
                  />
                  <button
                    className="earlybird-gE4lVn bg-slate-900 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    {newsletter.form.button_text}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div id="main" className="earlybird-8JNr1h px-8 py-6 lg:py-12 overflow-x-hidden">
          <WidgetList list={main.socials} />
        </div>
      </div>
    </React.Fragment>
  )
}

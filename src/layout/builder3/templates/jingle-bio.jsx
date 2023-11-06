import { WidgetList } from '@earlybirdim/components'
import React from 'react'

export const schemas = [
  {
    name: 'personal_info',
    title: 'Profile',
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
        default: 'David. 👋'
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        default: 'I build tiny but cool things.'
      }
    ]
  },
  {
    name: 'main',
    title: 'Link in bio',
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
            url: 'https://www.youtube.com/@Apple'
          },
          {
            type: 'group_title',
            overrides: {
              title: 'How we developing'
            }
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
            url: 'https://www.figma.com/@apple'
          },
          {
            size: '1x1',
            url: 'https://dribbble.com/shots/popular'
          },
          {
            size: '1x1',
            url: 'https://www.behance.net'
          }
        ]
      }
    ]
  }
]

export function render({ options: { personal_info, main } }) {
  return (
    <React.Fragment>
      <div className="earlybird-HSqdRg bg-white dark:bg-slate-950 min-h-screen grid lg:grid-cols-2 lg:gap-4 lg:px-24">
        <div className="earlybird-tXXVbP px-8 lg:px-32 py-12 items-center">
          <div id="personal_info" className="earlybird-tMuH8h relative xl:sticky xl:top-16">
            <div className="earlybird-KDvjAn bioAvator w-48 h-48">
              <img className="earlybird-yFaZEN rounded-full" src={personal_info.avatar} />
            </div>
            <h1 className="earlybird-q9vUAm bioName text-slate-950 dark:text-slate-50 mt-8 text-5xl font-semibold">
              {personal_info.name}
            </h1>
            <p className="earlybird-LyK1vr bioIntro mt-6 text-xl text-slate-600 dark:text-gray-50">
              {personal_info.description}
            </p>
          </div>
        </div>
        <div id="main" className="earlybird-8JNr1h px-8 py-6 lg:py-12 overflow-x-hidden">
          <WidgetList list={main.socials} />
        </div>
      </div>
    </React.Fragment>
  )
}

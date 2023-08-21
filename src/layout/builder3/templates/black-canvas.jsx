import { Collapse, Form, Icon, Image, Tab, Toggle } from '@earlybirdim/components'
import { Fragment } from 'react'

export const schemas = [
  {
    name: 'header',
    title: 'Header',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'text',
        default: 'David Qi'
      },
      {
        name: 'subtitle',
        title: 'Subtitle',
        type: 'text',
        default: 'Full-stack Creator'
      }
    ]
  },
  {
    name: 'about_me',
    title: 'About Me',
    fields: [
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        ai: true,
        default:
          '👋 Hello, I am a indie hacker and dadpreneur building bootstrapped micro SaaS products. I believe in learning through practice and embracing failure.'
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        default:
          'https://images.unsplash.com/photo-1519764622345-23439dd774f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
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
            icon: 'brand-twitter',
            link: 'https://twitter.com/'
          },
          {
            icon: 'brand-linkedin',
            link: 'https://www.linkedin.com/'
          },
          {
            icon: 'brand-instagram',
            link: 'https://instagram.com/'
          },
          {
            icon: 'brand-youtube',
            link: 'https://youtube.com/'
          }
        ]
      }
    ]
  },
  {
    name: 'made',
    title: 'Made',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'text',
        default: "I've built these so far"
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
            name: 'description',
            title: 'Description',
            type: 'text'
          },
          {
            name: 'link',
            title: 'Link',
            type: 'text'
          },
          {
            name: 'date',
            title: 'Date',
            type: 'text'
          }
        ],
        default: [
          {
            title: 'EarlyBird',
            link: 'https://earlybird.im',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper mauris at ligula fermentum, eget lacinia nunc euismod. Donec id elit non mi porta gravida at eget metus.',
            date: '2022/12'
          },
          {
            title: 'TinySnap',
            link: 'https://tinysnap.app',
            description:
              'Proin eget tortor risus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Pellentesque in ipsum id orci porta dapibus.',
            date: '2022/09'
          },
          {
            title: 'HeyForm',
            link: 'https://heyform.net',
            description:
              'Nulla porttitor accumsan tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.',
            date: '2022/05'
          }
        ]
      }
    ]
  }
]

export function render({ options: { header, about_me, made } }) {
  return (
    <Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: `* {
font-family: 'Karla', sans-serif;
}

`
        }}
      />
      <div>
        <div>
          <div>
            <div className="earlybird-1ETfnx min-h-screen bg-slate-950 text-white flex flex-col items-center">
              <link
                href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
                rel="stylesheet"
              />
              <div className="earlybird-zNZErc lg:max-w-[1280px] max-w-[768px] fixed w-full px-8 py-10 flex flex-col z-50 lg:bg-transparent bg-slate-950">
                <h1 className="earlybird-FqN2Kn text-3xl font-bold md:mb-2 mb-0 mr-1">
                  {header.title}
                </h1>
                <p className="earlybird-VDqt3a text-base text-slate-300">{header.subtitle}</p>
                <div className="earlybird-cL7bSr mt-4">
                  {about_me.social_links.map((item, key) => (
                    <a
                      key={key}
                      href={item.link}
                      className="earlybird-34nGqf group inline-flex mr-3"
                      target="_blank"
                    >
                      <Icon
                        name={item.icon}
                        className="earlybird-oy39Rp h-6 w-6 text-slate-100/80 hover:text-slate-100"
                      />
                    </a>
                  ))}
                </div>
              </div>
              <div className="earlybird-9pUSV4 lg:max-w-[1280px] max-w-[768px] px-8 w-full mx-auto lg:grid block grid-cols-12 gap-8 relative lg:py-6 py-10 mt-32 lg:mt-0">
                <div className="earlybird-z0D2Oq col-span-3">
                  <div className="earlybird-Umkb0p xl:hidden lg:block hidden fixed w-[20%] bottom-6">
                    <Image src={about_me.image} className="earlybird-7M1bho w-full" width={200} />
                  </div>
                </div>
                <div className="earlybird-4N8bMq xl:col-span-5 col-span-9 max-w-[620px]">
                  <div className="earlybird-wihLRD lg:pl-8">
                    <p className="earlybird-TFbcfc py-6 text-slate-300/80 text-lg">
                      {about_me.description}
                    </p>
                    <h1 className="earlybird-MK4kwn text-2xl font-bold text-slate-200 mt-8 mb-4">
                      {made.title}
                    </h1>
                  </div>
                  {made.list.map((item, key) => (
                    <div key={key} className="earlybird-PPMmTO mb-12 flex lg:flex-row flex-col">
                      <div className="earlybird-VHDE2b lg:py-8 lg:-rotate-90 h-fit">
                        <span className="earlybird-CXGYu3 text-xs ml-auto text-slate-400">
                          {item.date}
                        </span>
                      </div>
                      <div>
                        <a href={item.link}>
                          <h1 className="earlybird-Ppye7K text-xl text-slate-200 hover:text-white">
                            {item.title}
                          </h1>
                        </a>
                        <p className="earlybird-s5acAh text-lg text-slate-300/80">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="earlybird-FBkeIO xl:block lg:hidden block col-span-4 lg:mt-0 mt-8">
                  <div className="earlybird-14e2WH sticky top-6">
                    <Image src={about_me.image} className="earlybird-oDwGGJ w-full" width={360} />
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

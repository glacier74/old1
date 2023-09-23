import { Icon, Image, clsx } from '@earlybirdim/components'
import { Fragment } from 'react'

export const schemas = [
  {
    name: 'header',
    title: 'Header',
    fields: [
      {
        name: 'bg',
        title: 'Background',
        type: 'image',
        default:
          'https://images.unsplash.com/photo-1691483059022-e8ad9f2d9d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3M3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'avatar',
        title: 'Avatar',
        type: 'image',
        default: 'https://earlybird.b-cdn.net/template-assets/luo.jpeg'
      },
      {
        name: 'name',
        title: 'Name',
        type: 'text',
        default: 'Luo Baishun'
      },
      {
        name: 'link',
        title: 'Link',
        type: 'text',
        default: 'mailto:gmail.com'
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        default: 'Proud dadpreneur building bootstrapped micro SaaS products in part-time.'
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
            name: 'link',
            title: 'Link',
            type: 'text'
          },
          {
            name: 'icon',
            title: 'Icon',
            type: 'image'
          }
        ],
        default: [
          {
            image: 'https://earlybird.b-cdn.net/template-assets/earlybird.png',
            title: 'EarlyBird',
            link: 'https://earlybird.im',
            icon: 'https://earlybird.b-cdn.net/template-assets/EarlyBird-icon.png'
          },
          {
            image: 'https://earlybird.b-cdn.net/template-assets/heyform.png',
            title: 'HeyForm',
            link: 'https://heyform.net',
            icon: 'https://earlybird.b-cdn.net/template-assets/HeyForm-icon.png'
          },
          {
            image: 'https://earlybird.b-cdn.net/template-assets/tinysnap.png',
            title: 'TinySnap',
            link: 'https://tinysnap.app',
            icon: 'https://earlybird.b-cdn.net/template-assets/TinySnap-icon.png'
          }
        ]
      }
    ]
  },
  {
    name: 'connect',
    title: 'Social links',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'text',
        default: 'Follow me'
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
            name: 'color',
            title: 'Icon Color',
            type: 'text'
          },
          {
            name: 'title',
            title: 'Title',
            type: 'text',
            primary: true
          },
          {
            name: 'username',
            title: 'User Name',
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
            icon: 'brand-twitter',
            color: '#1D9BF0',
            title: 'Twitter',
            username: '@LuoBaishun',
            link: 'https://www.twitter.com/LuoBaishun'
          },
          {
            icon: 'brand-linkedin',
            color: '#0a66c2',
            title: 'Linkedin',
            username: '@luobaishun',
            link: 'https://www.linkedin.com/in/luobaishun/'
          },
          {
            icon: 'brand-discord',
            color: '#5460E6',
            title: 'Discord',
            username: '@luobaishun',
            link: 'https://discord.com/users/@luobaishun'
          },
          {
            icon: 'brand-github',
            color: '#24292e',
            title: 'Github',
            username: '@dearroy',
            link: 'https://github.com/dearroy'
          }
        ]
      }
    ]
  }
]

export function render({ options: { header, products, connect } }) {
  return (
    <Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: `.products-gradient {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
}`
        }}
      />
      <div>
        <div className="earlybird-3KlM0N min-h-screen bg-black md:py-16 py-6 text-white">
          <div className="earlybird-OTpX01 max-w-5xl w-[95%] m-auto">
            <div id="header" className="earlybird-yEsBLY rounded-3xl p-10 relative overflow-hidden">
              <div className="earlybird-s5vUFy absolute left-0 top-0 bottom-0 right-0">
                <div
                  className="earlybird-Qtxhh8 w-full h-[60%] bg-center bg-no-repeat bg-cover"
                  style={{ backgroundImage: `url(${header.bg})` }}
                />
                <div className="earlybird-f1b220 bg-[#1c1c1c] h-full" />
                <div className="earlybird-h8o29D bg-[#1c1c1c] absolute left-[-80px] right-[-80px] blur-[26px] h-[60%] bottom-0" />
              </div>
              <div className="earlybird-LUy8WV flex md:gap-12 sm:gap-8 gap-4 flex-col sm:flex-row relative h-full">
                <Image
                  src={header.avatar}
                  className="earlybird-rBF2mt self-center md:w-[295px] w-[180px] md:h-[295px] h-[180px] rounded-full object-cover"
                  width={180}
                  height={180}
                />
                <div className="earlybird-3viz46 flex items-end">
                  <div className="earlybird-mu3bnM h-[60%] mt-auto sm:text-start text-center">
                    <h1 className="earlybird-cNPn6N md:text-5xl text-3xl font-bold mb-4">
                      {header.name}
                    </h1>
                    <p className="earlybird-3P0crj md:text-xl text-md text-slate-100 mt-1">
                      {header.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div id="products" className="earlybird-OJIwFw md:mt-11 mt-5">
              <h1 className="earlybird-lwkf3S text-3xl font-bold pl-5">{products.title}</h1>
              <div className="earlybird-1Oa21J grid md:grid-cols-2 gap-5 mt-5">
                {products.list.map((item, key) => (
                  <a
                    key={key}
                    href={item.link}
                    className="earlybird-a3BSeD overflow-hidden border rounded-2xl transition-all duration-300 border-black hover:border-slate-400  sm:h-[283px] h-[240px] bg-no-repeat bg-center bg-cover relative"
                    target="_blank"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundColor: '#1c1c1c'
                    }}
                  >
                    <div className="earlybird-tzbtBX absolute top-6 right-6">
                      <Image
                        src={item.icon}
                        className="earlybird-gU0y5w w-12 h-12"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="earlybird-XEX94w text-xl font-bold products-gradient absolute bottom-0 left-0 right-0 pt-10 px-6 pb-6">
                      {item.title}
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div id="connect" className="earlybird-gp5EVJ md:mt-11 mt-5">
              <h1 className="earlybird-Iqf3YH text-3xl font-bold pl-5">{connect.title}</h1>
              <div className="earlybird-7wsQQM grid sm:grid-cols-4 grid-cols-1 gap-5 mt-5">
                {connect.list.map((item, key) => (
                  <a
                    key={key}
                    href={item.link}
                    className="earlybird-GqfZln bg-slate-900 w-full sm:h-[285px] h-[200px] rounded-2xl flex flex-col p-6 justify-between border-transparent border hover:border-slate-400 transition-all duration-300"
                    target="_blank"
                  >
                    <div
                      className={clsx(
                        'earlybird-eoXlKG',
                        `w-16 h-16 mb-auto flex rounded-full items-center justify-center`
                      )}
                      style={{
                        background: item.color
                      }}
                    >
                      <Icon name={item.icon} className="earlybird-rPM5hJ w-8 h-8" />
                    </div>
                    <h2 className="earlybird-CZsfZF text-2xl font-bold">{item.title}</h2>
                    <p className="earlybird-pJp5l1 text-xl text-slate-300 mt-1">{item.username}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

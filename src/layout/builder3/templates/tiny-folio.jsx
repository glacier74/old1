import { Icon, Image } from '@earlybirdim/components'
import { Fragment } from 'react'

export const schemas = [
  {
    name: 'my_info',
    title: 'My Info',
    fields: [
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
        name: 'description',
        title: 'Description',
        type: 'text',
        default:
          'As a super-dad and indie hacker, I passionately solve problems and write code, bringing adventure and innovative solutions to parenting and technology. Join me on this transformative journey.'
      }
    ]
  },
  {
    name: 'my_products',
    title: 'My Products',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'text',
        default: 'My Products'
      },
      {
        name: 'list',
        title: 'Products list',
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
            type: 'text'
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text'
          },
          {
            name: 'link_text',
            title: 'Link Text',
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
            image: 'https://earlybird.b-cdn.net/template-assets/EarlyBird-icon.png',
            title: 'EarlyBird',
            description: 'The best no-code landing page builder that captures early adopters',
            link_text: 'earlybird.im',
            link: 'https://earlybird.im/'
          },
          {
            image: 'https://earlybird.b-cdn.net/template-assets/HeyForm-icon.png',
            title: 'HeyForm',
            description: 'Build user-focused forms that drive impactful results',
            link_text: 'heyform.net',
            link: 'https://heyform.net/'
          },
          {
            image: 'https://earlybird.b-cdn.net/template-assets/TinySnap-icon.png',
            title: 'TinySnap',
            description: 'Make beautiful screenshots without any design skills',
            link_text: 'tinysnap.app',
            link: 'https://tinysnap.app/'
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
        name: 'social_text',
        title: 'Call for action text',
        type: 'text',
        default: 'Follow me on: '
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
            link: 'https://twitter.com/LuoBaishun'
          },
          {
            icon: 'brand-linkedin',
            link: 'https://www.linkedin.com/in/luobaishun/'
          }
        ]
      }
    ]
  }
]

export function render({ options: { my_info, my_products, footer } }) {
  return (
    <Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: `* {
transition: .2s cubic-bezier(.54,-.01,.6,1.01);
box-sizing: border-box;
}

.custom-container {
max-width: 860px;
width: 100%;
margin: auto;
}

.user-info {
margin-top: 100px;
margin-bottom: 136px;
}

.product-card {
clip-path: inset(4px round 40px);
}

.product-card:hover {
clip-path: inset(0px round 44px);
}

@media screen and (max-width: 900px) {
.custom-container {
max-width: 460px;
}
.grid-wrapper {
grid-template-columns: 1fr;
}
}

@media screen and (max-width: 480px) {
.user-info {
margin: 24px 0 40px;
}
.card-text {
font-size: 24px;
}
}

`
        }}
      />
      <div>
        <div>
          <div className="earlybird-lkPiyc antialiased font-[Inter] bg-slate-50">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap"
            />
            <div className="earlybird-XlDwbb bg-white">
              <div className="earlybird-6xjn91 custom-container py-16 px-8">
                <div className="earlybird-xdRVLP flex flex-col gap-8 user-info">
                  <Image
                    src={my_info.avatar}
                    alt={my_info.name}
                    className="earlybird-RlAozW w-32 h-32 rounded-full bg-slate-50"
                    width={128}
                    height={128}
                    loading="lazy"
                  />
                  <div>
                    <h1 className="earlybird-aabW1u font-bold sm:text-4xl text-2xl text-slate-900 mb-4">
                      {my_info.name}
                    </h1>
                    <p className="earlybird-Vogl2A text-slate-500 sm:text-xl text-base">
                      {my_info.description}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="earlybird-rFKUoR font-bold text-2xl tracking-tighter text-slate-700 my-4 px-2">
                    {my_products.title}
                  </h2>
                  <div className="earlybird-DojnRZ grid grid-cols-2 gap-5 grid-wrapper">
                    {my_products.list.map((item, key) => (
                      <a
                        key={key}
                        href={item.link}
                        target="_blank"
                        className="earlybird-3gFXRU bg-slate-100/70 aspect-square -mt-1 relative -mr-1 mb-1 p-8 group product-card"
                      >
                        <Image
                          className="earlybird-CmIAHe sm:w-25 sm:h-25 w-20 h-20 bg-slate-100"
                          src={item.image}
                          alt={item.title}
                          width={80}
                          height={80}
                          loading="lazy"
                        />
                        <div className="earlybird-LdwGe8 bottom-8 left-6 right-6 absolute">
                          <div className="earlybird-N4WIP4 group-hover:mb-8 card-text">
                            <h3 className="earlybird-2GFnsq font-medium sm:text-3xl text-xl text-slate-900 mb-2">
                              {item.title}
                            </h3>
                            <p className="earlybird-EWddCc text-slate-500 sm:text-xl text-base">
                              {item.description}
                            </p>
                          </div>
                          <p className="earlybird-EX52Cl flex items-center gap-0.5 absolute -bottom-2 text-slate-400 font-medium text-sm opacity-0 group-hover:opacity-100">
                            {item.link_text}
                            <Icon
                              className="earlybird-vh971I w-4 h-4 text-slate-400"
                              name="arrow-up-right-line"
                            />
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="earlybird-B21CsN footer bg-slate-50 flex items-center">
                <div className="earlybird-xgEUtf custom-container py-16 px-8 flex space-x-3">
                  <p className="earlybird-NQ5X9x text-slate-700 ">{footer.social_text}</p>
                  {footer.social_links.map((item, key) => (
                    <a key={key} href={item.link} className="earlybird-8V8lAp group inline-flex">
                      <Icon name={item.icon} className="earlybird-QS8Tcj h-6 w-6 text-slate-700" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

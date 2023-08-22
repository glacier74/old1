import { Form, Icon, Image } from '@earlybirdim/components'
import { Fragment } from 'react'

export const schemas = [
  {
    name: 'user_info',
    title: 'User Information',
    fields: [
      {
        name: 'bg',
        title: 'Background',
        type: 'image',
        default:
          'https://images.unsplash.com/photo-1567355896377-0c52fd286b5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      {
        name: 'name',
        title: 'Name',
        type: 'text',
        default: "Hey, I'm David. 👋"
      },
      {
        name: 'title',
        title: 'Title',
        type: 'text',

        default: 'I build tiny but cool things'
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',

        default:
          'As a super-dad and indie hacker, I passionately solve problems and write code, bringing adventure and innovative solutions to parenting and technology. Join me on this transformative journey.'
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
            icon: 'brand-twitter-color',
            link: 'https://twitter.com'
          },
          {
            icon: 'brand-linkedin-color',
            link: 'https://www.linkedin.com'
          },
          {
            icon: 'brand-instagram-color',
            link: 'http://www.instagram.com'
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
            name: 'link',
            title: 'Link',
            type: 'text'
          },
          {
            name: 'image',
            title: 'Image',
            type: 'image'
          }
        ],
        default: [
          {
            status: 'Active',
            title: 'EarlyBird',
            description:
              'The best no-code landing page builder for early-stage startups to validate their ideas.',
            link: 'https://earlybird.im',
            image: 'https://earlybird.b-cdn.net/template-assets/earlybird.png'
          },
          {
            status: 'Active',
            title: 'HeyForm',
            description: 'User-focused no-code online form builder that drive impactful results.',
            link: 'https://heyform.net',
            image: 'https://earlybird.b-cdn.net/template-assets/heyform.png'
          },
          {
            status: 'Active',
            title: 'TinySnap',
            description:
              'Turn boring screenshots into eye-catching visuals within a few clicks. Capture, style, and share to make impressions.',
            link: 'https://tinysnap.app',
            image: 'https://earlybird.b-cdn.net/template-assets/tinysnap.png'
          },
          {
            status: 'Paused',
            title: 'RewriteWise',
            description:
              'Improve your social media presence with the proofreading, rewriting, and optimization tool.',
            link: 'https://rewritewise.com',
            image: 'https://earlybird.b-cdn.net/template-assets/rewritewise.png'
          }
        ]
      }
    ]
  },
  {
    name: 'about',
    title: 'About',
    fields: [
      {
        name: 'role',
        title: 'Role',
        type: 'text_list',

        default: ['Indie Hacker', 'Product Owner', 'Full-stack Marketer', 'No-Code Enthusiast']
      },
      {
        name: 'desc',
        title: 'Description',
        type: 'text_list',

        default: [
          'As an Indie Hacker and Product Owner, I navigate the thrilling landscape of innovation, driven by a passion for creating and a knack for problem-solving. My role as a Full-stack Marketer infuses my work with a unique blend of creativity and strategy, while my enthusiasm for No-Code solutions keeps me at the forefront of technological advancement.'
        ]
      }
    ]
  },
  {
    name: 'skillset',
    title: 'Skillset',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'text',

        default: 'Skillset'
      },
      {
        name: 'list',
        title: 'List',
        type: 'list',

        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'text',
            primary: true
          },
          {
            name: 'list',
            title: 'List',
            type: 'text_list'
          }
        ],
        default: [
          {
            title: 'User Experience',
            list: [
              'Planning & Strategy',
              'Information Architecture',
              'Wireframing',
              'Customer Journey Mapping',
              'High Fidelity Wireframes'
            ]
          },
          {
            title: 'Business Development',
            list: ['Brand Positioning', 'Project Management', 'Product Management']
          },
          {
            title: 'Digital Marketing',
            list: [
              'Growth hacking',
              'Marketing Funnel',
              'Inbound Marketing',
              'SEO, SEM',
              'Content Production',
              'Marketing Automation'
            ]
          },
          {
            title: 'Development',
            list: ['iOS App Development', 'No-Code App development', 'WordPress development']
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
        name: 'placeholder',
        title: 'Placeholder',
        type: 'text',
        default: 'Enter email address'
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
    name: 'footer',
    title: 'Footer',
    fields: [
      {
        name: 'footer_text',
        title: 'Footer Text',
        type: 'text',

        default: 'Made with ❤️ and ☕️ by David'
      }
    ]
  }
]

export function render({ options: { user_info, products, about, skillset, newsletter, footer } }) {
  return (
    <Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: `* {
font-family: 'Source Sans 3', sans-serif;
}

.app-bg::before {
content: "";
position: absolute;
top: 0;
left: 0;
bottom: 0;
right: 0;
background-image: linear-gradient(0deg, #000000 0%, transparent 34%);
background-color: rgba(0, 0, 0, .62);
}
`
        }}
      />
      <div>
        <div>
          <div className="earlybird-wEFVwJ min-h-screen bg-black text-white">
            <link
              href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
              rel="stylesheet"
            />
            <div
              className={`earlybird-EkaQTK lg:pt-[10%] md:pt-[20%] pt-[40%] relative bg-fixed min-h-[660px] bg-center bg-no-repeat bg-cover app-bg`}
              style={{
                backgroundImage: `url(${user_info.bg})`
              }}
            >
              <div className="earlybird-SUSieo max-w-2xl w-[95%] m-auto relative sm:px-0 px-4">
                <h1 className="earlybird-h4R4ob lg:text-5xl text-4xl leading-snug my-10 font-bold">
                  <p>{user_info.name}</p>
                  <p>{user_info.title}</p>
                </h1>
                <p className="earlybird-yA9pL1 text-lg text-slate-100 mb-12">
                  {user_info.description}
                </p>
                <div className="earlybird-yPS8dq flex gap-6">
                  {user_info.socials.map((item, key) => (
                    <a
                      key={key}
                      href={item.link}
                      target="_blank"
                      className="earlybird-WjKk7b rounded-full flex items-center justify-center"
                    >
                      <Icon name={item.icon} className="earlybird-07lgCY w-8 h-8" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="earlybird-IA5Ryv md:py-20 py-10 lg:max-w-5xl max-w-3xl w-[95%] m-auto">
              <h2 className="earlybird-rCqMbz sm:text-5xl text-3xl py-5 text-center font-bold">
                {products.title}
              </h2>
              {products.list.map((item, key) => (
                <a key={key} href={item.link} target="_blank">
                  <div
                    className="earlybird-rLZx3Z mt-10 flex lg:flex-row flex-col-reverse"
                    key={key}
                  >
                    <div
                      className="earlybird-tb6R35 lg:w-[50%] w-full bg-slate-700/50 flex flex-col justify-center p-8"
                      style={{ alignItems: 'start' }}
                    >
                      {(() => {
                        switch (item.status) {
                          case 'Active':
                            return (
                              <div className="earlybird-P25lnF inline-block px-3 py-1 text-xs bg-emerald-500 shadow-md text-white rounded-2xl">
                                {item.status}
                              </div>
                            )

                          case 'Paused':
                            return (
                              <div className="earlybird-YndrIy inline-block px-3 py-1 text-xs bg-orange-500 shadow-md text-white rounded-2xl">
                                {item.status}
                              </div>
                            )

                          case 'Acquired':
                            return (
                              <div className="earlybird-46O7AS inline-block px-3 py-1 text-xs bg-blue-500 shadow-md text-white rounded-2xl">
                                {item.status}
                              </div>
                            )

                          case 'Discontinued':
                            return (
                              <div className="earlybird-DLLFrN inline-block px-3 py-1 text-xs bg-slate-700 shadow-md text-white rounded-2xl">
                                {item.status}
                              </div>
                            )

                          default:
                            return null
                        }
                      })()}
                      <h2 className="earlybird-KVMTcr text-2xl font-bold mt-4">{item.title}</h2>
                      <p className="earlybird-9fhI2q mt-2 text-slate-400 text-base">
                        {item.description}
                      </p>
                    </div>
                    <div className="earlybird-NZMSCf lg:w-[50%] w-full p-5 bg-slate-500/50">
                      <Image
                        src={item.image}
                        className="earlybird-bM2HOa w-full"
                        width={470}
                        height={250}
                      />
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="earlybird-nMrDwB md:py-20 py-10 sm:px-0 px-4 lg:max-w-3xl max-w-2xl w-[95%] m-auto flex md:flex-row flex-col">
              <div className="earlybird-8nUBau md:w-[45%] w-full">
                {about.role.map((item, key) => (
                  <h1
                    key={key}
                    className="earlybird-qKXzXZ md:text-2xl text-xl font-bold leading-normal"
                  >
                    {item}
                  </h1>
                ))}
              </div>
              <div className="earlybird-JytQOj flex-1 flex flex-col justify-center">
                {about.desc.map((item, key) => (
                  <p
                    key={key}
                    className="earlybird-mFMRQc text-lg text-slate-300/80 leading-relaxed"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="earlybird-7fnU2i md:py-20 py-10 lg:max-w-3xl gap-[5px] max-w-[720px] w-[95%] m-auto grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:pl-0 pl-10">
              <div className="earlybird-rfuAQe md:row-span-2 sm:row-span-1 md:col-span-1 sm:col-span-2 col-span-1 row-span-1 text-3xl font-bold md:mb-0 mb-20">
                {skillset.title}
              </div>
              {skillset.list.map((item, key) => (
                <div key={key} className="earlybird-qEhmio mb-8">
                  <h3 className="earlybird-90703e text-lg font-bold">{item.title}</h3>
                  {item.list.map((text, key2) => (
                    <div className="earlybird-owvsAO  text-slate-300/80 leading-normal" key={key2}>
                      {text}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="earlybird-VL9Obq sm:max-w-3xl mx-auto px-8">
              <h3 className="earlybird-pWjLKg text-2xl font-medium mb-3">{newsletter.headline}</h3>
              <Form
                className="earlybird-DRNhU0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 border-slate-300"
                {...newsletter.form}
              >
                <Form.Item name="email" required={true} className="earlybird-eYpfJo flex-grow">
                  <Form.Input
                    type="email"
                    className="earlybird-nPuTPe bg-transparent w-full h-10 rounded-md px-4 py-2 border border-slate-300/80"
                    placeholder={newsletter.placeholder}
                  />
                </Form.Item>
                <Form.Button className="earlybird-rGIr7g relative w-full sm:w-auto h-10 rounded-md px-5 py-1 bg-emerald-500 text-white">
                  {newsletter.form.button_text}
                </Form.Button>
              </Form>
            </div>

            <div className="earlybird-USKeHg md:py-20 py-10 lg:max-w-3xl max-w-2xl w-[95%] m-auto">
              <div className="earlybird-opLHbM text-center py-10 text-slate-300/80 text-sm">
                {footer.footer_text}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

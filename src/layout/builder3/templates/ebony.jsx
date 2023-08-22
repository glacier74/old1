import { Icon, Image, Tab } from '@earlybirdim/components'

export const schemas = [
  {
    name: 'main',
    title: 'Main',
    fields: [
      {
        name: 'profile_cover',
        title: 'Profile Cover',
        type: 'image',
        default:
          'https://images.unsplash.com/photo-1567355896377-0c52fd286b5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      {
        name: 'profile_logo',
        title: 'Profile Logo',
        type: 'image',
        default: 'https://earlybird.b-cdn.net/template-assets/luo.jpeg'
      },
      {
        name: 'profile_name',
        title: 'Profile Name',
        type: 'text',
        default: 'Luo Baishun'
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
            icon: 'brand-twitter-line',
            url: 'https://twitter.com'
          },
          {
            icon: 'brand-facebook-line',
            url: 'https://facebook.com'
          },
          {
            icon: 'brand-instagram-line',
            url: 'https://instagram.com'
          },
          {
            icon: 'brand-github-line',
            url: 'https://github.com'
          }
        ]
      }
    ]
  },
  {
    name: 'bio',
    title: 'Bio',
    fields: [
      {
        name: 'bio_title',
        title: 'Bio Title',
        type: 'text',
        default: 'Bio'
      },
      {
        name: 'bio_content',
        title: 'Bio content',
        type: 'html',
        default:
          '<p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p><br/><p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>'
      }
    ]
  },
  {
    name: 'products',
    title: 'Products',
    fields: [
      {
        name: 'products_title',
        title: 'Products Title',
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
    name: 'contact',
    title: 'Contact',
    fields: [
      {
        name: 'contact_title',
        title: 'Contact Title',
        type: 'text',
        default: 'Contact'
      },
      {
        name: 'contact_content',
        title: 'Contact content',
        type: 'html',
        default:
          '<p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p><br/><p>Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>'
      }
    ]
  }
]

export function render({ options: { main, bio, products, contact } }) {
  return (
    <div>
      <div className="earlybird-GyjwHS mx-auto flex w-full overflow-hidden bg-black">
        <div className="earlybird-CLNykY flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="earlybird-KMJC4Z relative z-0 flex flex-1 overflow-hidden">
            <main className="earlybird-vK9Zv7 relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              <div className="earlybird-US6s8o min-h-screen pb-20">
                <div className="earlybird-YhNHKz relative">
                  <Image
                    className="earlybird-LHLhdW h-48 w-full object-cover lg:h-64"
                    src={main.profile_cover}
                    alt="{main.profile_name}"
                    width={9999}
                    height={256}
                  />

                  <div className="earlybird-T6EaFB mx-auto -mt-12 max-w-3xl px-4 sm:-mt-16 sm:flex sm:items-end sm:space-x-5 sm:px-6 lg:px-8">
                    <div className="earlybird-VjWDzY group relative h-24 w-24 overflow-hidden rounded-full sm:h-32 sm:w-32">
                      <Image
                        src={main.profile_logo}
                        width={300}
                        height={300}
                        alt={main.profile_name}
                      />
                    </div>
                    <div className="earlybird-lamW4s mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                      <div className="earlybird-lug2gL flex min-w-0 flex-1 items-center space-x-2">
                        <h1 className="earlybird-sD7N9n truncate text-2xl font-semibold text-white">
                          {main.profile_name}
                        </h1>
                      </div>
                      <div className="earlybird-5hlTt4 mt-6 flex flex-row justify-stretch space-x-2 sm:mt-0 sm:space-x-4">
                        {main.socials.map((row, index) => (
                          <a
                            key={index}
                            className="earlybird-Jf1xHV cursor-pointer text-white"
                            target="_blank"
                            rel="noreferrer"
                            href={row.url}
                          >
                            <Icon name={row.icon} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="earlybird-pp9Vjc mt-6 sm:mt-2 2xl:mt-5 ">
                  <Tab defaultActiveKey="bio">
                    <div className="earlybird-9LKvpq border-b border-gray-800">
                      <div className="earlybird-iSxdWL mx-auto mt-10 max-w-3xl px-4 sm:px-6 lg:px-8">
                        <Tab.NavList
                          className="earlybird-M2qUAk -mb-px flex space-x-8"
                          aria-label="Tabs"
                        >
                          {(() => {
                            const navigations = [
                              {
                                name: 'bio',
                                title: bio.bio_title
                              },
                              {
                                name: 'products',
                                title: products.products_title
                              },
                              {
                                name: 'contact',
                                title: contact.contact_title
                              }
                            ]

                            return navigations.map(row => (
                              <Tab.Nav key={row.name}>
                                {(isSelected, select) => (
                                  <button
                                    className={`earlybird-5Bxtaa whitespace-nowrap border-white px-1 py-3 font-mono text-sm font-medium text-white ${
                                      isSelected ? 'border-b-2' : 'border-none'
                                    }`}
                                    tabIndex={0}
                                    type="button"
                                    role="tab"
                                    aria-selected={isSelected}
                                    onClick={select}
                                  >
                                    {row.title}
                                  </button>
                                )}
                              </Tab.Nav>
                            ))
                          })()}
                        </Tab.NavList>
                      </div>
                    </div>
                    <Tab.Panel>
                      {activeKey => {
                        switch (activeKey) {
                          case 'bio':
                            return (
                              <div className="earlybird-kZwzcB mx-auto mt-16 max-w-3xl px-4 sm:px-6 lg:px-8">
                                <h2 className="earlybird-JVnhG6 font-mono text-2xl font-semibold text-white">
                                  {bio.bio_title}
                                </h2>
                                <article className="earlybird-OuzwrH prose prose-headings:text-white prose-a:text-white mt-3 max-w-2xl font-mono text-sm leading-6 tracking-wider text-white">
                                  <div dangerouslySetInnerHTML={{ __html: bio.bio_content }} />
                                </article>
                              </div>
                            )

                          case 'products':
                            return (
                              <div className="earlybird-8wgrf3 mx-auto mt-16 max-w-3xl px-4 sm:px-6 lg:px-8">
                                <h2 className="earlybird-qJhRcg font-mono text-2xl font-semibold text-white">
                                  {products.products_title}
                                </h2>
                                <article className="earlybird-hwMdJG prose prose-headings:text-white prose-a:text-white mt-3 max-w-2xl font-mono text-sm leading-6 tracking-wider text-white">
                                  <div className="earlybird-G5JfX6 flex flex-col gap-3">
                                    {products.list.map((item, key) => (
                                      <a
                                        href={item.link}
                                        key={key}
                                        target="_blank"
                                        className="earlybird-8Un1Nz project-card-shadow group flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4"
                                      >
                                        <div className="earlybird-9BhgDN flex items-center">
                                          <div className="earlybird-pkMkZc mr-1 flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 sm:mr-4">
                                            <Image
                                              src={item.image}
                                              className="earlybird-1j0ZkF h-8 w-8 rounded-full"
                                              alt={item.title}
                                              width={32}
                                              height={32}
                                            />
                                          </div>
                                          <div className="earlybird-3LvxMj flex flex-col">
                                            <h3 className="earlybird-NHjwz9 text-lg text-slate-900 sm:text-xl">
                                              {item.title}
                                            </h3>
                                            <p className="earlybird-ok71m0 mr-8 mt-2 hidden text-xs text-slate-500 sm:block">
                                              {item.description}
                                            </p>
                                          </div>
                                        </div>

                                        <div className="earlybird-PleHhm flex items-center justify-center">
                                          {(() => {
                                            const commonClasses =
                                              'group inline-flex items-center justify-center gap-1 sm:px-4 px-2 py-1 shadow-md sm:text-sm text-xs text-white rounded-md mr-2'

                                            switch (item.status) {
                                              case 'Active':
                                                return (
                                                  <div
                                                    className={`earlybird-S1VlYi ${commonClasses} bg-emerald-500`}
                                                  >
                                                    {item.status}
                                                  </div>
                                                )

                                              case 'Paused':
                                                return (
                                                  <div
                                                    className={`earlybird-uXwEr6 ${commonClasses} bg-orange-500`}
                                                  >
                                                    {item.status}
                                                  </div>
                                                )

                                              case 'Acquired':
                                                return (
                                                  <div
                                                    className={`earlybird-mevB2p ${commonClasses} bg-blue-500`}
                                                  >
                                                    {item.status}
                                                  </div>
                                                )

                                              case 'Discontinued':
                                                return (
                                                  <div
                                                    className={`earlybird-YeMGeT ${commonClasses} bg-slate-700`}
                                                  >
                                                    {item.status}
                                                  </div>
                                                )

                                              default:
                                                return null
                                            }
                                          })()}

                                          <Icon
                                            name="arrow-up-right-line"
                                            className="earlybird-QHz5EO h-5 w-5 text-slate-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-slate-500"
                                          />
                                        </div>
                                      </a>
                                    ))}
                                  </div>
                                </article>
                              </div>
                            )

                          case 'contact':
                            return (
                              <div className="earlybird-8Jkk2p mx-auto mt-16 max-w-3xl px-4 sm:px-6 lg:px-8">
                                <h2 className="earlybird-0zHKmt font-mono text-2xl font-semibold text-white">
                                  {contact.contact_title}
                                </h2>
                                <article className="earlybird-iotKGc prose prose-headings:text-white prose-a:text-white mt-3 max-w-2xl font-mono text-sm leading-6 tracking-wider text-white">
                                  <div
                                    dangerouslySetInnerHTML={{ __html: contact.contact_content }}
                                  />
                                </article>
                              </div>
                            )

                          default:
                            return null
                        }
                      }}
                    </Tab.Panel>
                  </Tab>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Icon, Image } from '@earlybirdim/components'

export const schemas = [
  {
    name: 'product',
    title: 'Product',
    fields: [
      {
        name: 'announcement',
        title: 'Announcement',
        type: 'html',
        default: 'Take a look at our latest <a href="#" style="color:#2563eb">blog post</a>'
      },
      {
        name: 'logo',
        title: 'Product logo',
        type: 'image',
        default: 'https://storage.earlybird.im/examples/logo.png'
      },
      {
        name: 'name',
        title: 'Product name',
        type: 'html',
        default: 'Go Explore'
      },
      {
        name: 'description',
        title: 'Description',
        type: 'html',
        default:
          'Go Explore helps you discover and explore hidden gems, popular attractions, and local experiences in your destination.'
      },
      {
        name: 'download_links',
        title: 'Download Links',
        type: 'list',
        fields: [
          {
            name: 'icon',
            title: 'Icon',
            type: 'icon'
          },
          {
            name: 'title',
            title: 'Text',
            type: 'text',
            primary: true
          },
          {
            name: 'link',
            title: 'Link',
            type: 'text'
          }
        ],
        default: [
          {
            icon: 'brand-apple',
            link: '',
            title: 'App Store'
          },
          {
            icon: 'brand-google-play',
            link: '',
            title: 'Google Play'
          }
        ]
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        default: 'https://storage.earlybird.im/examples/hero-02.png'
      }
    ]
  },
  {
    name: 'footer',
    title: 'Footer',
    fields: [
      {
        name: 'copyright',
        title: 'Copyright',
        type: 'html',
        default: '© 2023 Your Company, Inc. All rights reserved.'
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
            link: 'https://twitter.com/LuoBaishun'
          },
          {
            icon: 'brand-linkedin-line',
            link: 'https://www.linkedin.com/in/luobaishun/'
          }
        ]
      }
    ]
  }
]

export function render({ options: { product, footer } }) {
  return (
    <div>
      <div className="earlybird-U2Oeht antialiased font-[Inter] bg-white">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap"
        />

        <div className="earlybird-0jcSom lg:h-screen lg:overflow-hidden">
          <div
            id="product"
            className="earlybird-tZz0Bm mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8"
          >
            <div className="earlybird-qswwD0 px-6 pt-10 pb-24 sm:pb-32 xl:col-span-7 lg:px-0 lg:pt-12 lg:pb-12 xl:pt-48 xl:pb-56 lg:col-span-6">
              <div className="earlybird-EteRkN mx-auto max-w-2xl lg:mx-0 lg:mr-8 xl:mr-16">
                <div className="earlybird-stgZun mb-12 sm:flex md:mb-14 lg:mb-16">
                  <Image
                    className="earlybird-srE1NC h-11 w-auto"
                    src={product.logo}
                    height={44}
                    alt={product.name}
                  />
                </div>

                <div className="earlybird-kTjhdr mb-10">
                  <div
                    className="earlybird-Vl1ZBh empty:hidden sm:inline-block rounded-full py-1.5 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-800/10 hover:ring-gray-800/20"
                    dangerouslySetInnerHTML={{
                      __html: product.announcement
                    }}
                  />
                </div>

                <h1
                  className="earlybird-a9PDkW text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
                  dangerouslySetInnerHTML={{
                    __html: product.name
                  }}
                />

                <div
                  className="earlybird-nHSobm mt-6 text-lg leading-8 text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: product.description
                  }}
                />

                <div className="earlybird-EdG6jL mt-10">
                  <div className="earlybird-qnQMut flex flex-col sm:flex-row sm:items-center gap-6">
                    {product.download_links?.map((row, index) => (
                      <a
                        key={index}
                        className="earlybird-Or1x2O flex items-center justify-center sm:justify-start gap-2 py-2 px-4 text-white bg-slate-900 rounded-md font-medium"
                        href={row.link}
                        title={row.title}
                      >
                        <Icon className="earlybird-whA8ZD w-6 h-6" name={row.icon} />
                        {row.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="earlybird-sbglri lg:col-span-5 lg:absolute lg:inset-0 lg:left-1/2 lg:mr-0 bg-blue-50">
              <div className="earlybird-99Qu5A w-full h-full flex items-center justify-center">
                <Image
                  className="earlybird-GJZoxP max-w-[90%] max-h-[90%] object-contain"
                  height={800}
                  src={product.image}
                  alt={product.name}
                />
              </div>
            </div>
          </div>

          <div
            id="footer"
            className="earlybird-QBHZlq lg:-mt-[140px] lg:absolute lg:bottom-0 lg:left-0 lg:right-0"
          >
            <div className="earlybird-2Px2bG mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
              <div className="earlybird-5zshsV pl-0 py-10 lg:pr-8 xl:pr-16 lg:col-span-6">
                <div className="earlybird-CEbM5V mx-auto max-w-2xl lg:mx-0">
                  <div className="earlybird-m317WG space-y-6 md:space-y-0 md:flex md:items-center md:justify-between">
                    <ul className="earlybird-1z8C9t flex justify-center space-x-3 md:order-2">
                      {footer.social_links.map((row, index) => (
                        <a key={index} href={row.link}>
                          <Icon name={row.icon} className="earlybird-20TCEk h-6 w-6" />
                        </a>
                      ))}
                    </ul>
                    <div className="earlybird-PDPBT2 block sm:flex sm:items-center sm:justify-center md:justify-start md:order-1 text-sm leading-5 text-center sm:text-left">
                      <div
                        className="earlybird-8MHJcl text-sm"
                        dangerouslySetInnerHTML={{ __html: footer.copyright }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

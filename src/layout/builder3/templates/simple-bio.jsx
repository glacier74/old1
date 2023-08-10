import { Form, Icon, Image } from '@earlybirdim/components'

export const schemas = [
  {
    name: 'header',
    title: 'Header',
    fields: [
      {
        name: 'cover_img',
        title: 'Cover Image',
        type: 'image',
        default:
          'https://images.unsplash.com/photo-1530569673472-307dc017a82d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    name: 'user_info',
    title: 'Profile Information',
    fields: [
      {
        name: 'avatar',
        title: 'Avatar',
        type: 'image',
        default: 'https://earlybird.b-cdn.net/template-assets/luo.jpeg'
      },
      {
        name: 'username',
        title: 'User Name',
        type: 'text',
        default: 'Luo Baishun'
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
            icon: 'brand-twitter-line',
            link: 'https://twitter.com/LuoBaishun'
          },
          {
            icon: 'brand-linkedin-line',
            link: 'https://www.linkedin.com/in/luobaishun/'
          }
        ]
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        default: 'Bootstrapped Indie Hakcer'
      },
      {
        name: 'about_me',
        title: 'About me',
        type: 'html',
        default:
          "<p>Hi I'm Luo 👋</p><p>As a super-dad to two amazing kids and an indie hacker sailing the vast seas of innovation, I strive to inspire and instill a sense of adventure, infusing every code I write and every problem I solve with passion and a personal touch. Join me on this transformative journey as we bring fresh perspectives and disruptive solutions to the world of technology and parenting.</p><br><p>What I'm currently up to:</p><ul><li>🏠 Living in China</li><li>💻 Building bootstrapped micro SaaS products</li><li>🎤 An enthusiastic Karaoke singer</li><li>🏀 A basketball enthusiast</li><li>🎸 Learning to play the guitar</li><li>🌐 A domain name collector</li></ul>"
      }
    ]
  },
  {
    name: 'newsletter',
    title: 'Newsletter',
    fields: [
      {
        name: 'form',
        title: 'Subscribe',
        type: 'email_capture',
        fields: [
          {
            name: 'description',
            title: 'Description',
            type: 'text',
            default: 'Be the first to know my new updates'
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
  }
]

export function render({ options: { header, user_info, newsletter } }) {
  return (
    <div>
      <div className="earlybird-vLhll9 antialiased font-[Inter]">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap"
        />
        <div className="earlybird-FdmYsw min-h-screen bg-white">
          <div>
            <Image
              className="earlybird-EynhuJ object-cover w-full bg-white h-36 lg:h-64"
              width={9999}
              height={256}
              src={header.cover_img}
              alt={user_info.username}
            />
          </div>
          <div className="earlybird-SJgudv max-w-3xl mx-auto px-4 pb-16">
            <div className="earlybird-gp502l px-4 flex items-center justify-between">
              <div className="earlybird-nY5nGB -mt-16">
                <a href="#" className="earlybird-yDTU4a flex">
                  <Image
                    className="earlybird-9yxlyx h-32 w-32 rounded-full ring-4 ring-white sm:h-36 sm:w-36 bg-white"
                    width={144}
                    height={144}
                    src={user_info.avatar}
                    alt={user_info.username}
                  />
                </a>
              </div>
            </div>
            <div className="earlybird-wjR1gW mt-6 px-4 mb-6">
              <div className="earlybird-oye27E flex justify-between items-center">
                <div>
                  <h1 className="earlybird-nojERG text-2xl font-bold lg:text-4xl text-slate-950">
                    {user_info.username}
                  </h1>
                  <p className="earlybird-9XLJ35 text-sm text-slate-700">{user_info.description}</p>
                </div>
                <div className="earlybird-GQ26jD flex space-x-3">
                  {user_info.social_links.map((item, key) => (
                    <a
                      key={key}
                      href={item.link}
                      className="earlybird-yypbGG group inline-flex items-center justify-center"
                    >
                      <Icon name={item.icon} className="earlybird-hdrNCi h-6 w-6 text-slate-700" />
                    </a>
                  ))}
                </div>
              </div>
              <hr className="earlybird-J8UfA3 h-px my-4 bg-slate-100 border-0" />
            </div>
            <div className="earlybird-UgrJpA pt-2 px-4 text-slate-700 leading-relaxed">
              <div
                dangerouslySetInnerHTML={{
                  __html: user_info.about_me
                }}
              />
            </div>
          </div>
          <div className="earlybird-ry8Fph bg-slate-50 py-12">
            <div className="earlybird-U5ET6h w-full max-w-3xl mx-auto px-8 mb-4">
              <Form {...newsletter.form}>
                <label className="earlybird-wsLumu block text-slate-700 mb-2" htmlFor="email">
                  {newsletter.form.description}
                </label>
                <div className="earlybird-g4fUhc flex items-center w-full">
                  <Form.Item
                    id="email"
                    name="email"
                    required={true}
                    className="earlybird-IfjC73 w-full mr-4"
                  >
                    <Form.Input
                      type="text"
                      placeholder="hello@example.com"
                      className="earlybird-cKCKvg shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                    />
                  </Form.Item>
                  <Form.Button className="earlybird-Z7IySJ bg-slate-900 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    {newsletter.form.button_text}
                  </Form.Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

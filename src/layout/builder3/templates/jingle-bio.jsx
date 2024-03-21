import { Image, Section, WidgetList } from '@earlybirdim/components'
import {
  behance,
  dribbble,
  figma,
  github,
  instagram,
  payment,
  steam,
  tiktok,
  youtube
} from '@earlybirdim/components/WidgetList/constants'

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
        defaultRows: 3,
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
        default: []
      }
    ]
  }
]

const LOCALES = {
  en: {
    createOwn: 'Create your own',
    reportAbuse: 'Report abuse'
  },
  'zh-hans': { createOwn: '创建你自己的', reportAbuse: '举报滥用行为' },
  'zh-hant': { createOwn: '創建你自己的', reportAbuse: '舉報濫用行為' },
  ja: { createOwn: '自分のものを作るために', reportAbuse: '不正行為を報告する' }
}

const SOCIAL_WIDGET_NAMES = [
  'behance',
  'dribbble',
  'figma',
  'instagram',
  'github',
  'steam',
  'twitter',
  'tiktok',
  'youtube',
  ['spotify_album', 'spotify'],
  ['spotify_artist', 'spotify'],
  ['spotify_playlist', 'spotify'],
  ['spotify_track', 'spotify'],
  'map',
  'payment',
  'email_capture'
]

const SOCIAL_WIDGET_VARIABLES = {
  background: 'widgetBg',
  'background-hover': 'widgetBgHover',
  'background-active': 'widgetBgActive',
  border: 'widgetBorder',
  title: 'widgetTitle',
  meta: 'widgetMeta',
  'follow-background': 'widgetFollowBg',
  'follow-background-hover': 'widgetFollowBgHover',
  'follow-background-active': 'widgetFollowBgActive',
  'follow-text': 'widgetFollowText'
}

function getWidgetStyles(theme) {
  return Object.keys(SOCIAL_WIDGET_VARIABLES)
    .map(key => {
      const value = theme[SOCIAL_WIDGET_VARIABLES[key]]

      if (value) {
        return `--jingle-widget-${key}: ${value};`
      }
    })
    .filter(Boolean)
    .join('')
}

function getSocialWidgetStyles(theme) {
  return SOCIAL_WIDGET_NAMES.map(rowName => {
    let name = rowName
    let key = rowName

    if (Array.isArray(rowName)) {
      name = rowName[0]
      key = rowName[1]
    }

    const value = theme[key]

    if (value) {
      return `
        .widget-${name} .widget-content {
          ${getWidgetStyles(value)}
        }
      `
    }
  })
    .filter(Boolean)
    .join('')
}

function getBackgroundImage(theme) {
  if (theme.bgImage) {
    return theme.bgImage.includes('://') ? `url(${theme.bgImage})` : theme.bgImage
  }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

export function render({ product, options: { personal_info, main }, theme = {}, locale = 'en' }) {
  const lowerLocale = locale.toLowerCase()
  const bgImage = getBackgroundImage(theme)
  const bgOpacity = isNumeric(theme.bgOpacity) ? Number(theme.bgOpacity) : 0

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --jingle-background-color: ${theme.bgColor};
              --jingle-background-mask: ${bgOpacity < 0 ? '#000' : '#fff'};
              --jingle-background-opacity: ${Math.abs(bgOpacity)};
              --jingle-headline: ${theme.headline};
              --jingle-subheadline: ${theme.subheadline};
            }

            body {
              background-color: var(--jingle-background-color);
            }

            .widget-content {
              ${getWidgetStyles(theme)}
            }

            ${getSocialWidgetStyles(theme)}
          `
        }}
      />

      <div className="earlybird-KLq0HRg">
        <div className="earlybird-8HgKLqR8 min-h-screen">
          {bgImage && (
            <div
              className="earlybird-I8g8q5eH fixed inset-0 z-10 bg-cover bg-center bg-no-repeat pointer-events-none before:absolute before:inset-0 before:bg-[var(--jingle-background-mask)] before:z-10 before:opacity-[var(--jingle-background-opacity)]"
              style={{
                backgroundImage: bgImage
              }}
            />
          )}
          <div className="earlybird-HgKOR88q relative z-20">
            <div className="earlybird-HSqdRg xl:max-w-[1600px] xl:mx-auto xl:flex xl:justify-between xl:gap-12 xl:px-16">
              <div className="earlybird-tXXVbP w-auto xl:w-[calc(100%-868px)] xl:max-w-[500px] max-[360px]:px-5 max-[400px]:px-7 px-8 xl:px-0 py-12 items-center">
                <Section id="personal_info" className="xl:sticky xl:top-16" name="personal_info">
                  <div className="earlybird-tMuH8h">
                    <div className="earlybird-KDvjAn">
                      <Image
                        className="earlybird-yFaZEN xl:mx-0 rounded-full w-32 h-32 xl:w-48 xl:h-48 object-cover"
                        src={personal_info.avatar}
                        width={160}
                        height={160}
                        alt={personal_info.name}
                      />
                    </div>
                    <h1 className="earlybird-q9vUAm text-[var(--jingle-headline)] mt-8 text-3xl xl:text-5xl font-semibold break-words">
                      {personal_info.name}
                    </h1>
                    <p className="earlybird-LyK1vr max-[360px]:mt-4 max-[400px]:mt-5 mt-6 text-xl text-[var(--jingle-subheadline)] whitespace-pre-line">
                      {personal_info.description}
                    </p>
                  </div>
                </Section>
              </div>
              <div
                id="main"
                className="earlybird-8JNr1h xl:w-[820px] max-[360px]:px-5 max-[400px]:px-7 py-6 px-8 xl:px-0 xl:py-12"
              >
                <WidgetList list={main.socials} />
              </div>
            </div>

            <div className="xl:max-w-[1600px] xl:mx-auto xl:flex xl:justify-between">
              <div className="max-[360px]:px-5 max-[400px]:px-7 px-8 py-12 xl:py-0 xl:px-16">
                <div className="xl:fixed xl:bottom-12 flex items-center justify-center xl:justify-start">
                  {/* Branding */}
                  {!product.isBrandingRemoved && (
                    <div className="text-sm text-[var(--jingle-subheadline)]">
                      {LOCALES[lowerLocale].createOwn}{' '}
                      <a className="underline" href="https://jingle.bio/?ref=BioBadge">
                        Jingle Bio
                      </a>
                    </div>
                  )}

                  {/* Report abuse */}
                  <div className="h-4 w-px mx-2 bg-[var(--jingle-subheadline)] opacity-40"></div>
                  <a
                    className="underline text-sm text-[var(--jingle-subheadline)]"
                    href="mailto:support@jingle.bio?subject=Report%20abuse"
                  >
                    {LOCALES[lowerLocale].reportAbuse}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

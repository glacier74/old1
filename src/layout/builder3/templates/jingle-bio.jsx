import { Icon, WidgetList } from '@earlybirdim/components'
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

export function render({ product, options: { personal_info, main } }) {
  const cacheKeyName = 'jinglebio_theme'
  const [isDarkMode, setDarkMode] = React.useState(false)

  function handleMediaChange(event) {
    setDarkMode(event.matches)
  }

  function handleSwitch() {
    const theme = isDarkMode ? 'light' : 'dark'

    setDarkMode(!isDarkMode)
    window.localStorage.setItem(cacheKeyName, theme)
  }

  React.useEffect(() => {
    isDarkMode ? document.body.classList.add('dark') : document.body.classList.remove('dark')
  }, [isDarkMode])

  React.useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme:dark)')
    let theme = window.localStorage.getItem(cacheKeyName)

    if (theme) {
      setDarkMode(theme === 'dark')
    } else {
      handleMediaChange(media)
      media.addEventListener('change', handleMediaChange)
    }

    return () => {
      media.removeEventListener('change', handleMediaChange)
    }
  }, [])

  return (
    <React.Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body.dark,
            @media (prefers-color-scheme: dark) {
              body {
                background-color: #020617;
              }
            }
            .earlybird-branding{
              display:none;
            }
          `
        }}
      />

      <div className={isDarkMode ? 'dark' : undefined}>
        <div className="earlybird-HSqdRg bg-white dark:bg-slate-950 min-h-screen grid lg:grid-cols-2 lg:gap-4 lg:px-24">
          <div className="earlybird-tXXVbP max-[360px]:px-5 max-[400px]:px-7 px-8 lg:px-32 py-12 items-center">
            <div id="personal_info" className="earlybird-tMuH8h relative xl:sticky xl:top-16">
              <div className="earlybird-KDvjAn bioAvator  max-[360px]:w-28 max-[360px]:h-28 max-[400px]:w-32 max-[400px]:h-32 w-48 h-48">
                <img className="earlybird-yFaZEN rounded-full" src={personal_info.avatar} />
              </div>
              <h1 className="earlybird-q9vUAm bioName text-slate-950 dark:text-slate-50 mt-8 text-3xl lg:text-5xl font-semibold">
                {personal_info.name}
              </h1>
              <p className="earlybird-LyK1vr bioIntro max-[360px]:mt-4 max-[400px]:mt-5 mt-6 text-xl text-slate-600 dark:text-gray-50">
                {personal_info.description}
              </p>
            </div>
          </div>
          <div
            id="main"
            className="earlybird-8JNr1h max-[360px]:px-5 max-[400px]:px-7 py-6 px-8 lg:py-12 overflow-x-hidden"
          >
            <WidgetList list={main.socials} />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 lg:gap-4 lg:px-24">
          <div className="max-[360px]:px-5 max-[400px]:px-7 px-8 py-12 lg:py-0 lg:px-32 bg-white dark:bg-slate-950">
            <div className="lg:fixed lg:bottom-12 flex items-center gap-3">
              <button
                type="button"
                className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300"
                onClick={handleSwitch}
              >
                <Icon className="w-5 h-5" name={isDarkMode ? 'moon-line' : 'sun-line'} />
              </button>
              {!product.isBrandingRemoved && (
                <>
                  <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Create your own{' '}
                    <a
                      className="underline hover:text-slate-800 dark:hover:text-slate-300"
                      href="https://jingle.bio/?ref=BioBadge"
                    >
                      Jingle Bio
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

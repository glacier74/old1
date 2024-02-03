import { Loader, notification } from '@heyforms/ui'
import { FC, useMemo } from 'react'

import { JINGLEBIO_THEMES } from '~/constants'
import { adaptTheme } from '~/layout/builder3/theme/Customize'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'
import { useRequest } from '~/utils'

type ThemeType = (typeof JINGLEBIO_THEMES)[0]

interface ThemeItemProps {
  theme: ThemeType
}

const ThemeItem: FC<ThemeItemProps> = ({ theme }) => {
  const { siteSettings, updateSiteSettings } = useStore()
  const backgroundImage = useMemo(() => {
    if (theme.bgImage) {
      return theme.bgImage.includes('://') ? `url(${theme.bgImage})` : theme.bgImage
    }
  }, [theme.bgImage])

  const { loading, request } = useRequest(
    async () => {
      const _theme = adaptTheme(theme)

      updateSiteSettings({
        theme: _theme
      })
      await SiteSettingsService.updateSettings(siteSettings.productId, {
        theme: _theme
      })

      notification.success({
        title: 'Page style have been updated successfully'
      })
    },
    [],
    {
      errorNotify: true
    }
  )

  return (
    <div
      className="relative p-4 flex justify-between rounded-3xl bg-cover bg-no-repeat bg-center cursor-pointer after:absolute after:inset-0 after:border after:rounded-3xl after:border-black/10 after:shadow-sm after:pointer-events-none"
      style={{
        backgroundColor: theme.bgColor,
        backgroundImage
      }}
      onClick={request}
    >
      <div className="w-[80px]">
        <div
          className="w-[32px] h-[32px] rounded-full"
          style={{
            backgroundColor: theme.headline
          }}
        />
        <div
          className="mt-3 rounded-sm w-[60px] h-[8px]"
          style={{
            backgroundColor: theme.headline
          }}
        />
        <div className="mt-2 space-y-1">
          <div
            className="rounded-sm h-[6px]"
            style={{
              backgroundColor: theme.subheadline
            }}
          />
          <div
            className="rounded-sm w-[50px] h-[6px]"
            style={{
              backgroundColor: theme.subheadline
            }}
          />
        </div>
      </div>
      <div className="w-[170px]">
        <div className="grid grid-cols-[repeat(auto-fill,35px)] grid-rows-[repeat(auto-fill,35px,min-content)] justify-center gap-[10px]">
          <div
            className="flex flex-col col-span-2 row-span-1 w-[80px] h-[35px] rounded-lg border border-black/10"
            style={{
              backgroundColor: theme.widgetBg,
              borderColor: theme.widgetBorder
            }}
          />
          <div
            className="col-span-2 row-span-2 w-[80px] h-[80px] px-3 py-5 rounded-lg border border-black/10"
            style={{
              backgroundColor: theme.widgetBg,
              borderColor: theme.widgetBorder
            }}
          >
            <div className="space-y-2">
              <div
                className="rounded-sm w-[30px] h-[6px]"
                style={{
                  backgroundColor: theme.widgetTitle
                }}
              />
              <div className="space-y-1">
                <div
                  className="rounded-sm w-[40px] h-[4px]"
                  style={{
                    backgroundColor: theme.widgetMeta
                  }}
                />
                <div
                  className="rounded-sm w-[20px] h-[4px]"
                  style={{
                    backgroundColor: theme.widgetMeta
                  }}
                />
              </div>
              <div
                className="rounded-md w-[20px] h-[8px] flex flex-col justify-center px-1"
                style={{
                  backgroundColor: theme.widgetFollowBg,
                  borderColor: theme.widgetBorder
                }}
              >
                <div
                  className="w-[10px] h-[2px]"
                  style={{
                    backgroundColor: theme.widgetFollowText
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className="col-span-1 row-span-1 w-[35px] h-[35px] rounded-lg border border-black/10"
            style={{
              backgroundColor: theme.widgetBg,
              borderColor: theme.widgetBorder
            }}
          />
          <div
            className="col-span-1 row-span-1 w-[35px] h-[35px] rounded-lg border border-black/10"
            style={{
              backgroundColor: theme.widgetBg,
              borderColor: theme.widgetBorder
            }}
          />
        </div>
      </div>
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-md rounded-3xl flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  )
}

export const Themes = () => {
  return (
    <div className="p-5 space-y-5">
      {JINGLEBIO_THEMES.map((theme, index) => (
        <ThemeItem key={index} theme={theme} />
      ))}
    </div>
  )
}

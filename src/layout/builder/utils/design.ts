import { isEmpty } from '@nily/utils'

const THEME_STYLE_ID = 'theme-style'

interface ThemeToStyleOptions {
  bodyBackground?: boolean
}

export function themeToStyle(theme: Theme, options?: ThemeToStyleOptions) {
  let style = `
    :root {
      --earlybird-font-family: ${theme.fontFamily};
      --earlybird-font-size: ${theme.fontSize};
      --earlybird-line-height: ${theme.lineHeight};
      --earlybird-primary: ${theme.primary};
      --earlybird-text: ${theme.text};
      --earlybird-text-light: ${theme.textLight};
      --earlybird-button-background: ${theme.buttonBackground};
      --earlybird-button-text: ${theme.buttonText};
      --earlybird-border: ${theme.border};
      --earlybird-background: ${theme.background};
    }
  `

  if (options?.bodyBackground) {
    style += `
      body {
        font-family: var(--earlybird-font-family);
        background: var(--earlybird-background);
      }
    `
  }

  return style
}

export function insertThemeStyle(theme: Theme) {
  let style = document.getElementById(THEME_STYLE_ID)

  if (!style) {
    style = document.createElement('style')
    style.id = THEME_STYLE_ID

    document.head.appendChild(style)
  }

  style.innerHTML = themeToStyle(theme)
}

export function fontLink(font: string) {
  const family = font.replace(/\s+/g, '+')
  return `https://fonts.googleapis.com/css2?family=${family}:wght@400;500;600;700;800;900&display=swap`
}

export function loadFont(font: string) {
  if (isEmpty(font)) {
    return
  }

  const family = font.replace(/\s+/g, '+')
  const id = `font-${family.toLowerCase()}`

  if (document.getElementById(id)) {
    return
  }

  const link = document.createElement('link')

  link.setAttribute('id', id)
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', fontLink(font))

  document.head.appendChild(link)
}

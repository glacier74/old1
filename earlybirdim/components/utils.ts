import {
  parseBehance,
  parseDribbble,
  parseFigma,
  parseGithub,
  parseGoogleMap,
  parseInstagram,
  parseSpotify,
  parseSteam,
  parseTiktok,
  parseTwitter,
  parseYoutube
} from '@tinaryan/dp'

export function getRecaptchaToken(): Promise<string> {
  const { grecaptcha } = window as any

  return new Promise((resolve, reject) => {
    grecaptcha.ready(() => {
      grecaptcha
        .execute((window as any).captcha.recaptcha, {
          action: 'submit'
        })
        .then(resolve)
        .catch(reject)
    })
  })
}

const parsers = {
  behance: parseBehance,
  dribbble: parseDribbble,
  figma: parseFigma,
  github: parseGithub,
  google_map: parseGoogleMap,
  instagram: parseInstagram,
  spotify: parseSpotify,
  steam: parseSteam,
  tiktok: parseTiktok,
  twitter: parseTwitter,
  youtube: parseYoutube
}

export function parseURL(url: string, type?: string) {
  if (url) {
    const providers = Object.keys(parsers) as (keyof typeof parsers)[]

    for (let provider of providers) {
      const value = parsers[provider](url)

      if (value) {
        if ((value as AnyMap<string>).type) {
          provider += `_${(value as AnyMap<string>).type}`
        }

        return {
          provider,
          ...value
        }
      }
    }
  }

  return {
    provider: type || 'website',
    url
  }
}

export function durationToTime(duration: number) {
  const date = new Date(duration)

  const hours = date.getUTCHours()
  const result: number[] = [date.getUTCMinutes(), date.getSeconds()]

  if (hours > 0) {
    result.unshift(hours)
  }

  return result.map(n => String(n).padStart(2, '0')).join(':')
}

const formatter = Intl.NumberFormat('en', {
  notation: 'compact'
})

export function formatNumber(num: number) {
  return formatter.format(num)
}

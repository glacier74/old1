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

const HTTP_REGEX = /^https?:\/\//i

export function parseURL(url: string, type?: string) {
  if (url) {
    if (!HTTP_REGEX.test(url)) {
      url = 'https://' + url.replace(/^\/+/, '')
    }

    const providers = Object.keys(parsers) as (keyof typeof parsers)[]

    for (let provider of providers) {
      const value = parsers[provider](url)

      if (value) {
        if ((value as AnyMap).type) {
          provider += `_${(value as AnyMap).type}`
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

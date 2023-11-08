import { parseFigma, parseTiktok, parseTwitter } from '@tinaryan/dp'

import { SteamData, WidgetConfig, WidgetExtra } from './WidgetProps'

export const behance: WidgetExtra = {
  styles: {
    bgColor: '#e4ebfc',
    bgHoverColor: '#dce6fe',
    bgActiveColor: '#cedcff',
    followBorderColor: '#0057FF',
    followBgColor: '#0057FF',
    followBgHoverColor: '#0354f1',
    followBgActiveColor: '#034fe2',
    followTextColor: '#fff',
    followersColor: 'rgba(255,255,255,0.9)'
  }
}

export const dribbble: WidgetExtra = {
  styles: {
    bgColor: '#fdf0fb',
    bgHoverColor: '#fcecfa',
    bgActiveColor: '#ecddea',
    followBorderColor: '#EA64D9',
    followBgColor: '#EA64D9',
    followBgHoverColor: '#e85cd6',
    followBgActiveColor: '#db56ca',
    followTextColor: '#fff',
    followersColor: 'rgba(255,255,255,0.9)'
  }
}

export const figma: WidgetExtra = {
  styles: {
    followBorderColor: '#0d99ff',
    followBgColor: '#0d99ff',
    followBgHoverColor: '#0d99ff',
    followBgActiveColor: '#007be5',
    followTextColor: '#fff',
    followersColor: 'rgba(255,255,255,0.9)'
  },
  getComputedData(config: WidgetConfig) {
    return {
      description: `@${parseFigma(config.url)!.handle}`
    }
  }
}

export const instagram: WidgetExtra = {
  styles: {
    followBorderColor: '#0095f6',
    followBgColor: '#0095f6',
    followBgHoverColor: '#1877f2',
    followBgActiveColor: '#1877f2',
    followTextColor: '#fff',
    followersColor: 'rgba(255,255,255,0.9)'
  }
}

export const steam: WidgetExtra = {
  styles: {
    followBorderColor: '#171d25',
    followBgColor: '#171d25',
    followBgHoverColor: '#171d25',
    followBgActiveColor: '#171d25',
    followTextColor: '#fff',
    followersColor: 'rgba(255,255,255,0.9)'
  },
  postsKeyName: 'games',
  render2x1: {
    postMaxCounts: 4,
    postListClassName: 'aspect-[1.78] grid-cols-2 grid-rows-2',
    postItemClassNames: 'aspect-[1.78]'
  },
  render2x2: {
    postMaxCounts: 4,
    postListClassName: 'aspect-[1.78] grid-cols-2 grid-rows-2',
    postItemClassNames: 'aspect-[1.78]'
  },
  getComputedData(config: WidgetConfig) {
    const data = config.data as unknown as SteamData

    return {
      description: data?.numGames ? `${data?.numGames} games` : ''
    }
  }
}

export const twitter: WidgetExtra = {
  styles: {
    bgColor: '#F5FAFE',
    bgHoverColor: '#F0F7FD',
    bgActiveColor: '#E9F4FC',
    followBorderColor: '#1d9bf0',
    followBgColor: '#1d9bf0',
    followBgHoverColor: '#1a8cd8',
    followBgActiveColor: '#1a8cd8',
    followTextColor: '#fff',
    followersColor: 'rgba(255,255,255,0.9)'
  },
  getComputedData(config: WidgetConfig) {
    return {
      handle: `@${parseTwitter(config.url)!.handle}`
    }
  }
}

export const tiktok: WidgetExtra = {
  styles: {
    followBorderColor: '#fe2c55',
    followBgColor: '#fe2c55',
    followBgHoverColor: '#fe2c55',
    followBgActiveColor: '#df274b',
    followTextColor: '#fff',
    followersColor: 'rgba(255,255,255,0.9)'
  },
  getComputedData(config: WidgetConfig) {
    return {
      description: `@${parseTiktok(config.url)!.handle}`
    }
  },
  postsKeyName: 'videos',
  render2x1: {
    postMaxCounts: 3,
    postListClassName: 'relative !flex h-full w-[180px] justify-between',
    postItemClassNames: [
      'relative aspect-[33/50] h-auto w-[42%] -translate-x-[10%] scale-[0.8]',
      'relative aspect-[33/50] h-auto w-[42%] translate-x-[10%] scale-[0.8]',
      '!absolute left-1/2 top-1/2 aspect-[33/50] z-10 h-auto w-[42%] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_0_4px_#fff]'
    ]
  },
  render2x2: {
    postMaxCounts: 3,
    postListClassName: 'relative !flex w-full justify-between',
    postItemClassNames: [
      'relative aspect-[33/50] h-auto w-[42%] -translate-x-[10%] scale-[0.8]',
      'relative aspect-[33/50] h-auto w-[42%] translate-x-[10%] scale-[0.8]',
      '!absolute left-1/2 top-1/2 aspect-[33/50] z-10 h-auto w-[42%] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_0_4px_#fff]'
    ]
  }
}

export const youtube: WidgetExtra = {
  styles: {
    bgColor: '#FFF0F0',
    bgHoverColor: '#FFE8E8',
    bgActiveColor: '#fbd4d4',
    followBorderColor: '#FF0000',
    followBgColor: '#FF0000',
    followBgHoverColor: '#FF0000',
    followBgActiveColor: '#FF0000',
    followTextColor: '#fff',
    followersColor: 'rgba(255,255,255,0.9)'
  },
  postsKeyName: 'videos',
  followText: 'Subscribe',
  render2x1: {
    postMaxCounts: 4,
    postListClassName: '!ml-4 aspect-[1.4] grid-cols-2 grid-rows-2',
    postItemClassNames: 'aspect-[1.5] overflow-hidden',
    imageClassName: 'scale-[1.2]'
  },
  render2x2: {
    postMaxCounts: 4,
    postListClassName: 'aspect-[1.5] grid-cols-2 grid-rows-2',
    postItemClassNames: 'aspect-[1.5] overflow-hidden',
    imageClassName: 'scale-[1.2]'
  }
}

export const spotify: WidgetExtra = {
  styles: {
    bgColor: '#EDFCF3',
    bgHoverColor: '#E7F9EE',
    bgActiveColor: '#DBF3E5',
    followBorderColor: '#1ED760',
    followBgColor: '#1ED760',
    followBgHoverColor: '#1fdf64',
    followBgActiveColor: '#169c46',
    followTextColor: '#fff',
    followersColor: 'rgba(255,255,255,0.9)'
  }
}

export const map: WidgetExtra = {
  styles: {
    padding: '0px'
  }
}

export const payment: WidgetExtra = {
  styles: {
    bgColor: '#fff',
    bgHoverColor: '#fbfbfb',
    bgActiveColor: '#fbfbfb',
    followBorderColor: '#635BFF',
    followBgColor: '#635BFF',
    followBgHoverColor: '#635BFF',
    followBgActiveColor: '#635BFF',
    followTextColor: '#fff',
    scale: 0
  }
}

export const emailCapture: WidgetExtra = {
  styles: {
    bgColor: '#fff',
    darkBgColor: '#0f172a',
    bgHoverColor: '#fbfbfb',
    bgActiveColor: '#fbfbfb',
    followBorderColor: '#10b981',
    followBgColor: '#10b981',
    followBgHoverColor: '#10b981',
    followBgActiveColor: '#10b981',
    followTextColor: '#fff',
    scale: 0
  }
}

export const sizeClassNames: AnyMap = {
  '1x1': 'col-span-2 row-span-2 w-[var(--widget-medium-size)] h-[var(--widget-medium-size)]',
  '2x0.5': 'col-span-4 row-span-1 w-[var(--widget-large-size)] h-[var(--widget-small-size)]',
  '2x1': 'col-span-4 row-span-2 w-[var(--widget-large-size)] h-[var(--widget-medium-size)]',
  '2x2': 'col-span-4 row-span-4 w-[var(--widget-large-size)] h-[var(--widget-large-size)]'
}

export const typeNames: AnyMap = {
  behance: 'Behance',
  dribbble: 'Dribbble',
  figma: 'Figma',
  github: 'GitHub',
  instagram: 'Instagram',
  spotify_album: 'Spotify',
  spotify_artist: 'Spotify',
  spotify_playlist: 'Spotify',
  spotify_track: 'Spotify',
  steam_profiles: 'steam',
  steam_id: 'steam',
  tiktok: 'TikTok',
  twitter: 'Twitter',
  youtube: 'YouTube'
}

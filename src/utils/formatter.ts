import dayjs from 'dayjs'

const thousand = 1000
const hundredThousand = 100000
const million = 1000000
const HundredMillion = 100000000
const billion = 1000000000
const HundredBillion = 100000000000
const trillion = 1000000000000

export function numberFormatter(num: number) {
  if (num >= thousand && num < million) {
    const thousands = num / thousand

    if (thousands === Math.floor(thousands) || num >= hundredThousand) {
      return Math.floor(thousands) + 'k'
    } else {
      return Math.floor(thousands * 10) / 10 + 'k'
    }
  } else if (num >= million && num < billion) {
    const millions = num / million

    if (millions === Math.floor(millions) || num >= HundredMillion) {
      return Math.floor(millions) + 'M'
    } else {
      return Math.floor(millions * 10) / 10 + 'M'
    }
  } else if (num >= billion && num < trillion) {
    const billions = num / billion

    if (billions === Math.floor(billions) || num >= HundredBillion) {
      return Math.floor(billions) + 'B'
    } else {
      return Math.floor(billions * 10) / 10 + 'B'
    }
  } else {
    return num
  }
}

export const dateFormatter = (interval: string) => {
  return function (isoDate: number | string) {
    switch (interval) {
      case 'minute':
        return dayjs(isoDate).format('mm')

      case 'hour':
        return dayjs(isoDate).format('ha')

      case 'month':
        return dayjs(isoDate).format('MMMM')

      default:
        return dayjs(isoDate).format('ddd, DD MM')
    }
  }
}

function pad(num: number, size: number) {
  return ('000' + num).slice(size * -1)
}

export function durationFormatter(duration: number) {
  const hours = Math.floor(duration / 60 / 60)
  const minutes = Math.floor(duration / 60) % 60
  const seconds = Math.floor(duration - minutes * 60 - hours * 60 * 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`
  } else if (minutes > 0) {
    return `${minutes}m ${pad(seconds, 2)}s`
  } else {
    return `${seconds}s`
  }
}

export function capitalize(text: string) {
  return text.replace(/^\S/, s => s.toUpperCase())
}

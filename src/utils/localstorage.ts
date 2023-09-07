import { date, isNumber } from '@nily/utils'

export const expireLocalStorage = {
  setItem<T>(name: string, value: T, expires = date.milliseconds('1d')!) {
    if (!value) {
      return window.localStorage.removeItem(name)
    }

    window.localStorage.setItem(
      name,
      JSON.stringify({
        value,
        expires: Date.now() + expires
      })
    )
  },

  getItem<T>(name: string, defaultValue?: T) {
    const cache = window.localStorage.getItem(name)

    if (cache) {
      try {
        const value = JSON.parse(cache)

        if (isNumber(value.expires) && value.expires >= Date.now()) {
          return (value.value as T) || defaultValue
        }
      } catch {}
    }
  }
}

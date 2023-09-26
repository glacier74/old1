import { isEmpty } from '@nily/utils'

interface LoadScriptOptions {
  retry: number
  onError?: (err: any) => void
  onLoad?: () => void
}

export function loadScript(root: HTMLElement, data: AnyMap<string>, options: LoadScriptOptions) {
  if (isEmpty(data.content) && isEmpty(data.src)) {
    return options.onLoad?.()
  }

  const script = document.createElement('script')

  Object.keys(data).forEach(key => {
    if (key !== 'content') {
      script.setAttribute(key, data[key])
    }
  })

  root.appendChild(script)

  if (data.content) {
    script.innerHTML = data.content

    return options.onLoad?.()
  }

  script.onload = () => {
    script.onload = null
    script.onerror = null

    options.onLoad?.()
  }

  script.onerror = (err: any) => {
    root.removeChild(script)

    script.onload = null
    script.onerror = null

    if (options.retry && options.retry > 0) {
      loadScript(root, data, {
        ...options,
        retry: options.retry - 1
      })
    } else {
      options.onError?.(err)
    }
  }
}

export function loadScriptAsync(root: HTMLElement, data: AnyMap<string>, retry = 3) {
  return new Promise((resolve, reject) => {
    loadScript(root, data, {
      retry,
      onLoad: resolve as any,
      onError: reject
    })
  })
}

export async function loadScriptsAsync(root: HTMLElement, scripts: any[]) {
  for (const script of scripts) {
    await loadScriptAsync(root, script)
  }
}

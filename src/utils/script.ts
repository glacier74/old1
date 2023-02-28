export function loadScript(element: HTMLElement, src: string, retry = 2, onLoad?: () => void) {
  const script = document.createElement('script')

  script.src = src
  script.onload = () => {
    script.onload = null
    script.onerror = null
    onLoad?.()
  }
  script.onerror = () => {
    element.removeChild(script)
    script.onload = null
    script.onerror = null

    if (retry > 0) {
      loadScript(element, src, retry - 1, onLoad)
    }
  }

  element.appendChild(script)
}

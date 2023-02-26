export function insertClipboardText(event: any) {
  const clipboardData = event.clipboardData.getData('text/plain').trim().replace(/\r|\n/g, ' ')
  document.execCommand('insertText', false, clipboardData)
}

export function placeCaretAtEnd(el: HTMLElement) {
  const sel = window.getSelection()

  if (sel) {
    const range = document.createRange()

    range.selectNodeContents(el)
    range.collapse(false)

    sel.removeAllRanges()
    sel.addRange(range)
  }

  el.focus()
}

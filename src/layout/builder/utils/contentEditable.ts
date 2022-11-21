import { CSSProperties } from 'react'

export interface RichTextSelection {
  anchorNode: Node
  startOffset?: number
  endOffset?: number
  rect?: CSSProperties
}

export interface RichTextPreceding {
  isTriggering: boolean
  text?: string
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

export function getCharInText(text: string, offset = 1) {
  const arr = text.split('')
  const pos = offset > 0 ? offset : arr.length + offset

  return arr[pos]
}

export function getSelectionText() {
  const position = getRichTextSelection()

  if (position) {
    const { anchorNode, startOffset } = position

    if (anchorNode) {
      const content = anchorNode.textContent

      if (content && startOffset! > 0) {
        return content.substring(0, startOffset!)
      }
    }
  }
}

export function getTextPrecedingAtTrigger(
  trigger: string,
  startOffset?: number
): RichTextPreceding {
  const result: RichTextPreceding = {
    isTriggering: false
  }

  if (!startOffset || startOffset < 1) {
    return result
  }

  const text = getSelectionText()

  if (
    !text ||
    // check is the trigger character has been deleted
    text[startOffset! - 1] !== trigger ||
    // check if there is a space behind the trigger character
    text[startOffset!]?.trim() === ''
  ) {
    return result
  }

  result.isTriggering = true
  result.text = text!.substring(startOffset!)

  return result
}

export function getRangeRect(range: Range) {
  // Hack https://stackoverflow.com/a/62474614
  let rect = range.getBoundingClientRect()

  if (range.collapsed && rect.top === 0 && rect.left === 0) {
    const tmpNode = document.createTextNode('\ufeff')
    range.insertNode(tmpNode)

    rect = range.getBoundingClientRect()
    tmpNode.remove()
  }

  return rect
}

export function getRichTextSelection(): RichTextSelection | undefined {
  const sel = window.getSelection()

  if (sel) {
    const anchorNode = sel.anchorNode

    if (anchorNode != null) {
      const range = sel.getRangeAt(0)
      // getRangeAt may not exist, need alternative
      const startOffset = range.cloneRange().startOffset

      // Hack https://stackoverflow.com/a/62474614
      let rect = range.getBoundingClientRect()

      if (range.collapsed && rect.top === 0 && rect.left === 0) {
        const tmpNode = document.createTextNode('\ufeff')
        range.insertNode(tmpNode)

        rect = range.getBoundingClientRect()
        tmpNode.remove()
      }

      return {
        anchorNode,
        startOffset,
        rect: {
          top: rect?.top,
          left: rect?.left
        }
      }
    }
  }
}

export function getCaretRect(selectedNodePosition: number) {
  const sel = window.getSelection()

  if (sel && sel.anchorNode) {
    const range = sel.getRangeAt(selectedNodePosition)
    return range.getBoundingClientRect()
  }
}

export function insertClipboardText(event: any) {
  const clipboardData = event.clipboardData.getData('text/plain').trim().replace(/\r|\n/g, ' ')
  document.execCommand('insertText', false, clipboardData)
}

export function replaceTriggerText(
  el: HTMLElement,
  selection: RichTextSelection,
  template: string
) {
  const sel = window.getSelection()

  if (sel) {
    let range = document.createRange()

    range.setStart(selection.anchorNode, selection.startOffset!)
    range.setEnd(selection.anchorNode, selection.endOffset!)
    range.deleteContents()

    const el = document.createElement('div')
    el.innerHTML = template

    const nodes = Array.from(el.childNodes)
    const lastNode = nodes[nodes.length - 1]
    const frag = document.createDocumentFragment()

    nodes.forEach(node => {
      frag.appendChild(node)
    })

    range.insertNode(frag)

    // Preserve the selection
    range = range.cloneRange()
    range.setStartAfter(lastNode)
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)

    el.focus()
  }
}

export function pasteHtml(
  ref: HTMLElement,
  anchorNode: Node,
  startOffset: number,
  endOffset: number,
  html: string
) {
  const sel = window.getSelection()

  if (sel) {
    let range = document.createRange()

    range.setStart(anchorNode, startOffset)
    range.setEnd(anchorNode, endOffset)
    range.deleteContents()

    const el = document.createElement('div')
    el.innerHTML = html

    const nodes = Array.from(el.childNodes)
    const lastNode = nodes[nodes.length - 1]
    const frag = document.createDocumentFragment()

    nodes.forEach(node => {
      frag.appendChild(node)
    })

    range.insertNode(frag)

    // Preserve the selection
    range = range.cloneRange()
    range.setStartAfter(lastNode)
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)

    ref.focus()
  }
}

export function getStyleFromRect(rect: DOMRect): CSSProperties {
  const style: CSSProperties = {
    position: 'fixed',
    left: rect.left,
    top: rect.top + rect.height
  }
  const menuStyle: Record<string, number> = {
    width: 320,
    height: 0.95 * (window.innerHeight - 100)
  }

  const availableSpaceOnTop = rect.top
  const availableSpaceOnBottom = window.innerHeight - (rect.top + rect.height)

  // check to see where's the right place to put the menu vertically
  if (availableSpaceOnBottom < menuStyle.height) {
    if (availableSpaceOnTop >= menuStyle.height || availableSpaceOnTop > availableSpaceOnBottom) {
      style.top = 'auto'
      style.bottom = window.innerHeight - rect.top

      if (availableSpaceOnBottom < menuStyle.height) {
        style.maxHeight = availableSpaceOnTop
      }
    } else {
      if (availableSpaceOnTop < menuStyle.height) {
        style.maxHeight = availableSpaceOnBottom
      }
    }
  }

  const availableSpaceOnLeft = rect.left
  const availableSpaceOnRight = window.innerWidth - rect.left

  //check to see where's the right place to put the menu horizontally
  if (availableSpaceOnRight < menuStyle.width) {
    if (availableSpaceOnLeft >= menuStyle.width || availableSpaceOnLeft > availableSpaceOnRight) {
      style.left = 'auto'
      style.right = window.innerWidth - rect.left

      if (availableSpaceOnRight < menuStyle.width) {
        style.maxWidth = availableSpaceOnLeft
      }
    } else {
      if (availableSpaceOnLeft < menuStyle.width) {
        style.maxWidth = availableSpaceOnRight
      }
    }
  }

  return style
}

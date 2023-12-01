import { FC, useEffect, useTransition } from 'react'
import { useFrame } from 'react-frame-component'

import { useProduct } from '~/layout'
import { useBuilderContext } from '~/layout/builder3/context'

interface ScrollIntoViewProps {
  selectedOptionName?: string
  selectedCompletionName?: string
  selectedListId?: string
}

function isElementViewport(element: Element, win: Window, doc: Document) {
  const rect = element.getBoundingClientRect()
  const winHeight = win.innerHeight || doc.documentElement.clientHeight

  return (rect.top > 0 && rect.top <= winHeight) || (rect.bottom > 0 && rect.bottom <= winHeight)
}

export const ScrollIntoView: FC<ScrollIntoViewProps> = ({
  selectedOptionName,
  selectedCompletionName,
  selectedListId
}) => {
  const { document: doc, window: win } = useFrame()
  const { state, dispatch } = useBuilderContext()
  const [isPending, startTransition] = useTransition()
  const product = useProduct()

  function handleVisibleWidgets() {
    if (isPending || !doc || !win) {
      return
    }

    startTransition(() => {
      const widgetIds = Array.from(doc.querySelectorAll('.widget'))
        .filter(el => isElementViewport(el, win, doc))
        .map(el => el.getAttribute('data-id')!)

      dispatch({
        type: 'updateState',
        payload: {
          widgetIds
        }
      })
    })
  }

  useEffect(() => {
    const optionName = selectedOptionName || selectedCompletionName

    if (!optionName || !doc) {
      return
    }

    const el = doc.getElementById(optionName)

    if (el) {
      el.scrollIntoView({
        block: 'start'
      })
    }
  }, [doc, selectedCompletionName, selectedOptionName])

  useEffect(() => {
    if (!selectedListId || !doc) {
      return
    }

    const el = doc.querySelector(`[data-id="${selectedListId}"]`)

    if (el) {
      el.scrollIntoView({
        block: 'start'
      })
    }
  }, [doc, selectedListId])

  useEffect(() => {
    if (product.isJingleBio) {
      handleVisibleWidgets()
    }
  }, [product.isJingleBio, state.options])

  useEffect(() => {
    if (product.isJingleBio) {
      setTimeout(handleVisibleWidgets, 1_000)

      win?.addEventListener('resize', handleVisibleWidgets)
      doc?.body?.addEventListener('scroll', handleVisibleWidgets)

      return () => {
        win?.removeEventListener('resize', handleVisibleWidgets)
        doc?.body?.removeEventListener('scroll', handleVisibleWidgets)
      }
    }
  }, [])

  return null
}

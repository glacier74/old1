import { isEmpty, isValid, isValidArray } from '@nily/utils'
import HTMLReactParser from 'html-react-parser'
import Head from 'next/head'
import { parse } from 'node-html-parser'
import { FC, useEffect } from 'react'
import { useFrame } from 'react-frame-component'

import { loadScriptsAsync } from '~/utils'

function parseHTML(html: string) {
  const root = parse(html)

  const linkNodes = root.querySelectorAll('link')
  const scriptNodes = root.querySelectorAll('script')

  const links: string[] = []
  const scripts: any[] = []

  if (isValidArray(linkNodes)) {
    linkNodes.forEach(node => {
      links.push(node.toString())
      node.remove()
    })
  }

  if (isValidArray(scriptNodes)) {
    scriptNodes.forEach(node => {
      scripts.push({
        ...node.attrs,
        content: node.textContent
      })
      node.remove()
    })
  }

  return {
    links: links.join('\n'),
    scripts,
    html: root.toString()
  }
}

export const PublicSiteDangerouslyHTML: FC<{ html?: string }> = ({ html }) => {
  const { document: frameDocument } = useFrame()

  useEffect(() => {
    if (isValid(html)) {
      loadScriptsAsync((frameDocument || document).body, result.scripts)
    }
  }, [])

  if (isEmpty(html)) {
    return null
  }

  const result = parseHTML(html!)

  return (
    <>
      {isValid(result.links) && <Head>{HTMLReactParser(result.links)}</Head>}
      {HTMLReactParser(result.html)}
    </>
  )
}
